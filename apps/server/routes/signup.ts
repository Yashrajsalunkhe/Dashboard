import { Request, Response } from "express";
import supabase from '../db/supabase';
import prisma from "../db/prisma"; // Keep prisma for creating the profile

export default async function signup(req: Request, res: Response) {
    const { username, email, password, image, role } = req.body;

    // 1. Create the user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email,
        password: password,
    });

    // Handle Supabase sign-up errors (e.g., user already exists)
    if (authError) {
        console.error("Supabase sign-up error:", authError.message);
        return res.status(400).json({
            status: false,
            desc: authError.message
        });
    }

    // Check if user was actually created
    if (!authData.user) {
        return res.status(500).json({
            status: false,
            desc: "User could not be created."
        });
    }

    // 2. Now, create the user's profile in your own public "user" table
    // This links your profile table to the Supabase auth table via the ID.
    try {
        const allowedRoles = ['DENTIST', 'STAFF', 'PATIENT'];
        const userRole = role && allowedRoles.includes(role) ? role : 'STAFF';

        const profile = await prisma.user.create({
            data: {
                id: authData.user.id, // Use the ID from Supabase Auth
                name: username,
                email: email,
                image: image || null,
                role: userRole,
            }
        });

        res.status(201).json({
            status: true,
            desc: "Successfully signed up. Please check your email to confirm.",
            user: profile
        });

    } catch (profileError) {
        console.error("Error creating user profile:", profileError);
        // This part is tricky. The user exists in Auth but not in your public table.
        // You might want to add logic here to delete the auth user to keep things clean.
        return res.status(500).json({
            status: false,
            desc: "User was created in auth, but profile creation failed."
        });
    }
}