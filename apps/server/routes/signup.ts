import prisma from "../db/prisma";
import { Request, Response } from "express";

export default async function signup(req: Request, res: Response) {
    const { username, email, password, image, role } = req.body;
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
        where: { email }
    });
    if (existingUser) {
        return res.json({
            status: false,
            desc: "User already exists in db"
        });
    }
    // Only allow role to be 'DENTIST', 'STAFF', or 'PATIENT'
    const allowedRoles = ['DENTIST', 'STAFF', 'PATIENT'];
    let userRole = role && allowedRoles.includes(role) ? role : 'STAFF';
    try {
        const user = await prisma.user.create({
            data: {
                name: username,
                email: email,
                password: password,
                image: image || null,
                role: userRole, // Only allowed roles
                emailVerified: null // New users are not verified by default
            }
        });
        res.json({
            status: true,
            desc: "Successfully signed up",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                emailVerified: user.emailVerified,
                image: user.image,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        });
    } catch (err) {
        res.json({
            status: false,
            desc: "Failed during database insertion"
        });
        console.log("error in signup:", err);
    }
}