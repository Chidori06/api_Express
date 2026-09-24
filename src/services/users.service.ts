import usersRepository from "../repositories/users.repository.ts";
import bcrypt from "bcrypt";

const getAllUsers = async (email?: string) => {
    const users = await usersRepository.findAllUsers(email);
    return users;
};

const getOneUser = async (id: number) => {
    const user = await usersRepository.findOneUser(id);
    return user;
};

const createAUser = async (lastname: string, firstname: string, email: string, password: string, roleId: number
) => {
    const passwordHash = await bcrypt.hash(password, 12);
    return usersRepository.createUser(lastname, firstname, email, passwordHash, roleId);
};

const updateAUser = async (id: number, data: {
    lastname?: string; firstname?: string; email?: string;
    password?: string; roleId?: number;
}
) => {
    const dataToUpdate = {
        ...data,
    };

    if (data.password) {
        dataToUpdate.password = await bcrypt.hash(data.password, 12);
    }

    return usersRepository.updateUser(id, dataToUpdate);
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
