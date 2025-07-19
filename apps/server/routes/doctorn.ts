import { Request, Response } from "express";
import prisma from "../db/prisma"; // Assuming you have your prisma client configured

export default async function createDoctorProfile(req: Request, res: Response) {
    const {
        userId,
        phone,
        availableDays,
        availableTime,
        experienceYears,
        education
    } = req.body;

    // 1. --- Validation ---
    // Ensure the user ID is provided
    if (!userId) {
        return res.status(400).json({
            status: false,
            desc: "User ID is required to create a doctor profile."
        });
    }

    try {
        // 2. --- Check if the user exists and has the correct role ---
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { role: true } // Only select the role for efficiency
        });

        if (!user) {
            return res.status(404).json({
                status: false,
                desc: "User not found. Cannot create a doctor profile."
            });
        }

        if (user.role !== 'DENTIST') {
            return res.status(403).json({
                status: false,
                desc: "Forbidden. Only users with the 'DENTIST' role can have a doctor profile."
            });
        }

        // 3. --- Check if a doctor profile already exists for this user ---
        const existingDoctorProfile = await prisma.doctor.findUnique({
            where: { userId: userId }
        });

        if (existingDoctorProfile) {
            return res.status(409).json({
                status: false,
                desc: "Conflict. A doctor profile already exists for this user."
            });
        }

        // 4. --- Create the new Doctor profile in the database ---
        const newDoctor = await prisma.doctor.create({
            data: {
                userId: userId, // Link to the User table
                phone: phone,
                availableDays: availableDays,
                availableTime: availableTime,
                experienceYears: experienceYears,
                education: education,
            }
        });

        // 5. --- Send a success response ---
        res.status(201).json({
            status: true,
            desc: "Doctor profile created successfully.",
            doctor: newDoctor
        });

    } catch (error) {
        console.error("Error creating doctor profile:", error);
        res.status(500).json({
            status: false,
            desc: "An internal server error occurred."
        });
    }
}

// Get doctor by ID or userId
export async function getDoctor(req: Request, res: Response) {
    const { id, userId } = req.query;
    try {
        let doctor;
        if (id) {
            doctor = await prisma.doctor.findUnique({ where: { id: String(id) } });
        } else if (userId) {
            doctor = await prisma.doctor.findUnique({ where: { userId: String(userId) } });
        } else {
            return res.status(400).json({ status: false, desc: "Provide id or userId." });
        }
        if (!doctor) {
            return res.status(404).json({ status: false, desc: "Doctor not found." });
        }
        res.json({ status: true, doctor });
    } catch (error) {
        res.status(500).json({ status: false, desc: "Internal server error." });
    }
}

// Update doctor by ID
export async function updateDoctor(req: Request, res: Response) {
    const { id } = req.params;
    const { phone, availableDays, availableTime, experienceYears, education } = req.body;
    try {
        const doctor = await prisma.doctor.update({
            where: { id },
            data: { phone, availableDays, availableTime, experienceYears, education },
        });
        res.json({ status: true, doctor });
    } catch (error) {
        res.status(500).json({ status: false, desc: "Internal server error." });
    }
}

// Delete doctor by ID
export async function deleteDoctor(req: Request, res: Response) {
    const { id } = req.params;
    try {
        await prisma.doctor.delete({ where: { id } });
        res.json({ status: true, desc: "Doctor deleted." });
    } catch (error) {
        res.status(500).json({ status: false, desc: "Internal server error." });
    }
}
