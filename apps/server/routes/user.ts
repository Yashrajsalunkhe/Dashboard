import { Request, Response } from "express";
import prisma from "../db/prisma";

// Get user by ID or email
export async function getUser(req: Request, res: Response) {
    const { id, email } = req.query;
    try {
        let user;
        if (id) {
            user = await prisma.user.findUnique({ where: { id: String(id) } });
        } else if (email) {
            user = await prisma.user.findUnique({ where: { email: String(email) } });
        } else {
            return res.status(400).json({ status: false, desc: "Provide id or email." });
        }
        if (!user) {
            return res.status(404).json({ status: false, desc: "User not found." });
        }
        res.json({ status: true, user });
    } catch (error) {
        res.status(500).json({ status: false, desc: "Internal server error." });
    }
}

// Update user by ID
export async function updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { name, image, role } = req.body;
    try {
        const user = await prisma.user.update({
            where: { id },
            data: { name, image, role },
        });
        res.json({ status: true, user });
    } catch (error) {
        res.status(500).json({ status: false, desc: "Internal server error." });
    }
}

// Delete user by ID
export async function deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
        await prisma.user.delete({ where: { id } });
        res.json({ status: true, desc: "User deleted." });
    } catch (error) {
        res.status(500).json({ status: false, desc: "Internal server error." });
    }
} 