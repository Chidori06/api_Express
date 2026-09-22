import usersRepository from "../repositories/users.repository.ts";

const getAllUsers = async () => {
    const users = await usersRepository.findAllUsers();
    return users;
};

const getOneUser = async (id: number) => {
    const user = await usersRepository.findOneUser(id);
    return user;
};

const createAUser = async (lastname: string, firstname: string, email: string, password: string, roleId: number
) => {
    return usersRepository.createUser(lastname, firstname, email, password, roleId);
};

const updateAUser = async (id: number, data: {
    lastname: string; firstname: string; email: string;
    password: string; roleId: number;
}
) => {
    const user = await usersRepository.findOneUser(id);

    return usersRepository.updateUser(id, data);
};

const deleteAUser = async (id: number) => {
    const user = await usersRepository.findOneUser(id);
    return usersRepository.deleteUser(id);
};

export default {
    getAllUsers,
    getOneUser,
    createAUser,
    updateAUser,
    deleteAUser,
};
