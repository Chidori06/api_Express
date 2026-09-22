import { prisma } from "../../lib/prisma.ts";

const userInfo = {
    id: true,
    lastname: true,
    firstname: true,
    email: true,
    role: {
        select: {
            id: true,
            label: true,
        },
    },
};

export const findAllUsers = async () => {
    return prisma.user.findMany({
        select: userInfo,
    });
};

export const findOneUser = async (id: number) => {
    return prisma.user.findUnique({
        where: { id },
        select: userInfo,
    });
};

export const createUser = async (lastname: string, firstname: string, email: string, password: string,
    roleId: number) => {
    return prisma.user.create({
        data: {
            lastname,
            firstname,
            email,
            password,
            roleId,
        },
        select: userInfo,
    });
};

export const updateUser = async (id: number, data: {
    lastname: string; firstname: string; email: string;
    roleId: number
}) => {
    return prisma.user.update({
        where: { id },
        data,
        select: userInfo,
    });
};

export const deleteUser = async (id: number) => {
    return prisma.user.delete({
        where: { id },
    });
};
export default {
    userInfo,
    findAllUsers,
    findOneUser,
    createUser,
    updateUser,
    deleteUser

}