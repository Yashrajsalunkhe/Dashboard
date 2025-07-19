import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default prisma;

export async function getUserRole(userId: string): Promise<string | null> {
    const user = await prisma.user.findUnique({ where: { id: userId }, select: { role: true } });
    return user?.role || null;
}