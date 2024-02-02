import {
    Router
} from "express";
import prisma from "../prisma.js";

const router = Router();

router.get('/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                email: true,
                password: true
            }
        });
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
});

router.get('/users/:id', async (req, res) => {
    const userId = parseInt(req.params.id);
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                email: true,
                password: true
            }
        });
        if (!user) {
            res.status(404).json({
                error: 'User not found'
            });
            return;
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
});

export default router;