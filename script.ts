import { prisma } from "./lib/prisma.ts";

async function main() {
    const room = await prisma.room.create({
        data: {
            name: "Salle de réunion",
            capacity: 52,
        },
    },);
    console.log("Created room:", room);

    const allRooms = await prisma.room.findMany();
    console.log("All rooms:", JSON.stringify(allRooms, null, 2));
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });