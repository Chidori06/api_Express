import { prisma } from "../../lib/prisma.ts"


const findAllRooms = async () => {
    return await prisma.room.findMany();
};

const findOneRoom = async (id: number) => {
    return await prisma.room.findUnique({
        where: {
            id: Number(id),
        },
    });
};

const createRoom = async (name: string, capacity: number) => {
    return await prisma.room.create({ data: { name, capacity } });
};

const updateRoom = async (id: number, data: { name: string, capacity: number }) => {
    return await prisma.room.update({
        where: {
            id: Number(id),
        },
        data,
    });
};

const deleteRoom = async (id: number) => {
    return await prisma.room.delete({
        where: {
            id: Number(id),
        },
    });
};

export default {
    findAllRooms,
    findOneRoom,
    createRoom,
    updateRoom,
    deleteRoom
}
