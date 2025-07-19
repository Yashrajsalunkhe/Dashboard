import { Request, Response } from "express";
import prisma from "../db/prisma";

// Create patient
export async function createPatient(req: Request, res: Response) {
    const { name, age, gender, contact, address, medicalHistory, createdById } = req.body;
    try {
        const patient = await prisma.patient.create({
            data: { name, age, gender, contact, address, medicalHistory, createdById },
        });
        res.status(201).json({ status: true, patient });
    } catch (error) {
        res.status(500).json({ status: false, desc: "Internal server error." });
    }
}

// Get patient by ID or all patients
export async function getPatient(req: Request, res: Response) {
    const { id } = req.query;
    try {
        if (id) {
            const patient = await prisma.patient.findUnique({ where: { id: String(id) } });
            if (!patient) return res.status(404).json({ status: false, desc: "Patient not found." });
            return res.json({ status: true, patient });
        } else {
            const patients = await prisma.patient.findMany();
            return res.json({ status: true, patients });
        }
    } catch (error) {
        res.status(500).json({ status: false, desc: "Internal server error." });
    }
}

// Update patient by ID
export async function updatePatient(req: Request, res: Response) {
    const { id } = req.params;
    const { name, age, gender, contact, address, medicalHistory } = req.body;
    try {
        const patient = await prisma.patient.update({
            where: { id },
            data: { name, age, gender, contact, address, medicalHistory },
        });
        res.json({ status: true, patient });
    } catch (error) {
        res.status(500).json({ status: false, desc: "Internal server error." });
    }
}

// Delete patient by ID
export async function deletePatient(req: Request, res: Response) {
    const { id } = req.params;
    try {
        await prisma.patient.delete({ where: { id } });
        res.json({ status: true, desc: "Patient deleted." });
    } catch (error) {
        res.status(500).json({ status: false, desc: "Internal server error." });
    }
} 