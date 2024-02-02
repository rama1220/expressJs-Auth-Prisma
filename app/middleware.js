import prisma from "./prisma.js";

export const authToken = async (res, req, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            message: 'token is required'
        })
    }

    const validToken = await prisma.token.findUnique({
        where: {
            token
        },
        include: {
            userId: true,
            token: true,
            exprire_at: true,
            createdAt: true,
            updatedAt: true

        }
    })

    if (!validToken) {
        return res.status(401).json({
            message: 'invalid token'
        })
    }

    if (validToken.exprire_at < new Date()) {
        return res.status(401).json({
            message: 'expired token'
        })
    }

    if (validToken.userId.is_blocked) {
        return res.status(401).json({
            message: 'Block User'
        })
    }

    req.user = validToken.userId
    console.log(req.user)
    next()
}