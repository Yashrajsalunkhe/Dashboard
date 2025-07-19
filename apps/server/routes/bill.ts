import { Request, Response } from "express";
import prisma from "../db/prisma";

// Create bill
export async function createBill(req: Request, res: Response) {
    const { amount, method, status, razorpayPaymentId, patientId, doctorId, appointmentId, createdById } = req.body;
    try {
        const bill = await prisma.bill.create({
            data: { amount, method, status, razorpayPaymentId, patientId, doctorId, appointmentId, createdById },
        });
        res.status(201).json({ status: true, bill });
    } catch (error) {
        res.status(500).json({ status: false, desc: "Internal server error." });
    }
}

// Get bill by ID or all bills
export async function getBill(req: Request, res: Response) {
    const { id } = req.query;
    try {
        if (id) {
            const bill = await prisma.bill.findUnique({ where: { id: String(id) } });
            if (!bill) return res.status(404).json({ status: false, desc: "Bill not found." });
            return res.json({ status: true, bill });
        } else {
            const bills = await prisma.bill.findMany();
            return res.json({ status: true, bills });
        }
    } catch (error) {
        res.status(500).json({ status: false, desc: "Internal server error." });
    }
}

// Update bill by ID
export async function updateBill(req: Request, res: Response) {
    const { id } = req.params;
    const { amount, method, status, razorpayPaymentId } = req.body;
    try {
        const bill = await prisma.bill.update({
            where: { id },
            data: { amount, method, status, razorpayPaymentId },
        });
        res.json({ status: true, bill });
    } catch (error) {
        res.status(500).json({ status: false, desc: "Internal server error." });
    }
}

// Delete bill by ID
export async function deleteBill(req: Request, res: Response) {
    const { id } = req.params;
    try {
        await prisma.bill.delete({ where: { id } });
        res.json({ status: true, desc: "Bill deleted." });
    } catch (error) {
        res.status(500).json({ status: false, desc: "Internal server error." });
    }
} 