import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    console.log(event);
    const order = await prisma.pastry.create({
        data: {
            id: Math.floor(Math.random() * 100),
            title: body.title,
            type: body.type,
            description: body.description,
            price: body.price,
            imagePath: body.imagePath,
            reduction: 0,
            sells: 0,
        }
    })
    return order;
})
