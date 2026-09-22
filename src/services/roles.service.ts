import rolesRepository from "../repositories/roles.repository.ts"

const getAllRoles = async () => {
    const roles = rolesRepository.findAllRoles();
    return roles;
}

const getOneRole = async (id: number) => {
    const oneRole = await rolesRepository.findOneRole(id);
    return oneRole;
};

const createARole = (label: string) => {
    return rolesRepository.createRole(label);
};

const updateARole = async (id: number, data: { label: string }) => {
    const role = await rolesRepository.findOneRole(id);
    return await rolesRepository.updateRole(id, data);
}

const deleteARole = async (id: number) => {
    const role = await rolesRepository.findOneRole(id);
    return rolesRepository.deleteRole(id);
};

export default {
    getAllRoles,
    getOneRole,
    createARole,
    updateARole,
    deleteARole
}