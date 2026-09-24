import usersRepository from "../repositories/users.repository.ts";
import bcrypt from "bcrypt";

const login = async (email: string, password: string) => {
    const user = await usersRepository.findUserLogin(email);

    if (!user) {
        throw new Error("Identifiants invalides");
    }

    const validPassword = await bcrypt.compare(
        password,
        user.password
    );

    if (!validPassword) {
        throw new Error("Identifiants");
    }

    return usersRepository.findOneUser(user.id);
};

export default {
    login
}