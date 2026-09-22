import { prisma } from "../../lib/prisma.ts"

const findAllRoles = async () => {
    return await prisma.role.findMany();
};

const findOneRole = async (id: number) => {
    return await prisma.role.findUnique({
        where: {
            id: Number(id),
        },
    });
};

const createRole = async (label: string) => {
    return await prisma.role.create({ data: { label } });
};

const updateRole = async (id: number, data: { label: string }) => {
    return await prisma.role.update({
        where: {
            id: Number(id),
        },
        data,
    });
};

const deleteRole = async (id: number) => {
    return await prisma.role.delete({
        where: {
            id: Number(id),
        },
    });
};

export default {
    findAllRoles,
    findOneRole,
    createRole,
    updateRole,
    deleteRole
}