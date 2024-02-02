import {faker} from '@faker-js/faker';
import prisma from '../prisma.js';
import bcrypt from 'bcrypt';
import {
    config
} from 'dotenv';


config();
const bcryptRound = Number(process.env.BCRYPT_ROUND);
async function main() {
    await prisma.user.deleteMany({});
    for (let i = 0; i < 5; i++) {
        await prisma.user.create({
            data: {
                name: faker.person.fullName(),
                email: faker.internet.email().toLowerCase(),
                password: bcrypt.hashSync(`password${i}`, bcryptRound),
            },
        });
    }
}
main()
    .catch((e) => {

        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    })