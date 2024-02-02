import {
    faker
} from '@faker-js/faker';
import {
    PrismaClient
} from '@prisma/client';
import bcrypt from 'bcrypt';
import {
    config
} from 'dotenv';


config();

const prisma = new PrismaClient();
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