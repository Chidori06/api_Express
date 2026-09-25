import usersRepository from "../repositories/users.repository.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


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
        throw new Error("Identifiants invalides");
    }

    const token = jwt.sign(
        {
            userId: user.id,
            roleId: user.role.id,
        },
        process.env.JWT_SECRET!,
        {
            expiresIn: "1h",
        }
    );

    return {
        user: await usersRepository.findOneUser(user.id),
        token,
    };
};

export default {
    login
}