import { prisma } from "../../lib/prisma.ts";
import userInfo from "../selects/user.select.ts";

const findAllReservations = () => {
    return prisma.reservation.findMany({
        include: {
            user: {
                select: userInfo,
            },
            room: true,
        },
    });
};

const findOneReservation = (id: number) => {
    return prisma.reservation.findUnique({
        where: { id },
        include: {
            user: {
                select: userInfo,
            },
            room: true,
        },
    });
};

const createReservation = (userId: number, roomId: number, dateDebut: Date, dateFin: Date) => {
    return prisma.reservation.create({
        data: {
            userId,
            roomId,
            dateDebut,
            dateFin,
        },
        include: {
            user: {
                select: userInfo,
            },
            room: true,
        },
    });
};

const updateReservation = (id: number, data: { userId: number; roomId: number; dateDebut: Date; dateFin: Date; }
) => {
    return prisma.reservation.update({
        where: { id },
        data,
        include: {
            user: {
                select: userInfo,
            },
            room: true,
        },
    });
};

const deleteReservation = (id: number) => {
    return prisma.reservation.delete({
        where: { id },
    });
};

const findConflict = (roomId: number, dateDebut: Date, dateFin: Date, excludeId?: number
) => {
    return prisma.reservation.findFirst({
        where: {
            roomId,

            ...(excludeId !== undefined && {
                id: {
                    not: excludeId,
                },
            }),

            dateDebut: {
                lt: dateFin,
            },
            dateFin: {
                gt: dateDebut,
            },
        },
    });
};


export default {
    findAllReservations,
    findOneReservation,
    findConflict,
    createReservation,
    updateReservation,
    deleteReservation,
};
