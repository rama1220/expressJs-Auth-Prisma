import prisma from './prisma.js';
import bcrypt from 'bcrypt';
import randomstring from 'randomstring';

async function createToken(req, res) {
    const user = await prisma.user.findUnique({
        where: {
            email: req.body.email,
        },
    });

    if (!user) {
        return res.status(401).json({
            message: 'Invalid email',
        });
    }

    if (user.is_blocked) {
        return res.status(401).json({
            message: 'User is blocked',
        })
    }

    const validPassword = bcrypt.compareSync(req.body.password, user.password);

    if (!validPassword) {
        return res.status(401).json({
            message: 'Invalid password',
        });
    }

    const token = randomstring.generate();
    await prisma.token.create({
        data: {
            token,
            userId: user.id,
            exprire_at: new Date(Date.now() + 31536000000),
        },
    });

    res.json({
        token,
    });
}

export default createToken;