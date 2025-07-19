import { Request, Response } from "express";
import prisma from "../db/prisma";

// Helper to get all data
async function getAllData() {
    const patients = await prisma.patient.findMany();
    const appointments = await prisma.appointment.findMany();
    const bills = await prisma.bill.findMany();
    const reminders = await prisma.reminder.findMany();
    const users = await prisma.user.findMany();
    const doctors = await prisma.doctor.findMany();
    return { patients, appointments, bills, reminders, users, doctors };
}

export async function exportJSON(req: Request, res: Response) {
    const data = await getAllData();
    res.setHeader('Content-Disposition', 'attachment; filename="export.json"');
    res.json(data);
}

export async function exportCSV(req: Request, res: Response) {
    const data = await getAllData();
    // Simple CSV: just patients for demo, can expand as needed
    const { patients } = data;
    if (!patients.length) return res.status(404).send('No patient data');
    const header = Object.keys(patients[0]).join(',');
    const rows = patients.map(p => Object.values(p).join(','));
    const csv = [header, ...rows].join('\n');
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="patients.csv"');
    res.send(csv);
} 