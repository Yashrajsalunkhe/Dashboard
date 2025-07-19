import { Request, Response } from "express";
import prisma from "../db/prisma";

// Create reminder
export async function createReminder(req: Request, res: Response) {
    const { type, status, sentAt, appointmentId } = req.body;
    try {
        const reminder = await prisma.reminder.create({
            data: { type, status, sentAt, appointmentId },
        });
        res.status(201).json({ status: true, reminder });
    } catch (error) {
        res.status(500).json({ status: false, desc: "Internal server error." });
    }
}

// Get reminder by ID or all reminders
export async function getReminder(req: Request, res: Response) {
    const { id } = req.query;
    try {
        if (id) {
            const reminder = await prisma.reminder.findUnique({ where: { id: String(id) } });
            if (!reminder) return res.status(404).json({ status: false, desc: "Reminder not found." });
            return res.json({ status: true, reminder });
        } else {
            const reminders = await prisma.reminder.findMany();
            return res.json({ status: true, reminders });
        }
    } catch (error) {
        res.status(500).json({ status: false, desc: "Internal server error." });
    }
}

// Update reminder by ID
export async function updateReminder(req: Request, res: Response) {
    const { id } = req.params;
    const { type, status, sentAt } = req.body;
    try {
        const reminder = await prisma.reminder.update({
            where: { id },
            data: { type, status, sentAt },
        });
        res.json({ status: true, reminder });
    } catch (error) {
        res.status(500).json({ status: false, desc: "Internal server error." });
    }
}

// Delete reminder by ID
export async function deleteReminder(req: Request, res: Response) {
    const { id } = req.params;
    try {
        await prisma.reminder.delete({ where: { id } });
        res.json({ status: true, desc: "Reminder deleted." });
    } catch (error) {
        res.status(500).json({ status: false, desc: "Internal server error." });
    }
} 