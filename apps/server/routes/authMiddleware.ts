import { Request, Response, NextFunction } from "express";
import { getUserRole } from "../db/prisma";

export function requireRole(roles: string[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.headers["x-user-id"] as string;
        if (!userId) {
            return res.status(401).json({ status: false, desc: "Missing user ID in headers." });
        }
        const role = await getUserRole(userId);
        if (!role || !roles.includes(role)) {
            return res.status(403).json({ status: false, desc: "Forbidden: insufficient role." });
        }
        next();
    };
} 