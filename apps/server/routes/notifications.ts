import { Request, Response } from "express";

export async function sendReminder(req: Request, res: Response) {
    const { type, to, message } = req.body;
    // Mock sending logic
    if (!type || !to || !message) {
        return res.status(400).json({ status: false, desc: "Missing type, to, or message." });
    }
    // Simulate sending delay
    await new Promise(r => setTimeout(r, 500));
    res.json({ status: true, desc: `Mock ${type} reminder sent to ${to}.`, message });
} 