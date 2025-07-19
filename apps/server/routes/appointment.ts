import { Request, Response } from "express";
import prisma from "../db/prisma";

// Create appointment
export async function createAppointment(req: Request, res: Response) {
    const { date, time, status, appointmentType, patientId, doctorId, createdById } = req.body;
    try {
        const appointment = await prisma.appointment.create({
            data: { date, time, status, appointmentType, patientId, doctorId, createdById },
        });
        res.status(201).json({ status: true, appointment });
    } catch (error) {
        res.status(500).json({ status: false, desc: "Internal server error." });
    }
}

// Get appointment by ID or all appointments
export async function getAppointment(req: Request, res: Response) {
    const { id } = req.query;
    try {
        if (id) {
            const appointment = await prisma.appointment.findUnique({ where: { id: String(id) } });
            if (!appointment) return res.status(404).json({ status: false, desc: "Appointment not found." });
            return res.json({ status: true, appointment });
        } else {
            const appointments = await prisma.appointment.findMany();
            return res.json({ status: true, appointments });
        }
    } catch (error) {
        res.status(500).json({ status: false, desc: "Internal server error." });
    }
}

// Update appointment by ID
export async function updateAppointment(req: Request, res: Response) {
    const { id } = req.params;
    const { date, time, status, appointmentType } = req.body;
    try {
        const appointment = await prisma.appointment.update({
            where: { id },
            data: { date, time, status, appointmentType },
        });
        res.json({ status: true, appointment });
    } catch (error) {
        res.status(500).json({ status: false, desc: "Internal server error." });
    }
}

// Delete appointment by ID
export async function deleteAppointment(req: Request, res: Response) {
    const { id } = req.params;
    try {
        await prisma.appointment.delete({ where: { id } });
        res.json({ status: true, desc: "Appointment deleted." });
    } catch (error) {
        res.status(500).json({ status: false, desc: "Internal server error." });
    }
} 