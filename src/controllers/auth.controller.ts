import type { Request, Response } from "express";
import authService from "../services/auth.service.ts";
import type { AuthUserDTO } from "../dto/authUser.dto.ts";
import usersService from "../services/users.service.ts";

const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const result = await authService.login(email, password);

        res.cookie("token", result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "developpement",
            //vaut mieux même en strict pour l'avoir que sur notre navigateur
            sameSite: "strict",
            maxAge: 60 * 60 * 1000,
        });

        return res.status(200).json({
            user: result.user,
        });

    } catch (error) {
        if (error instanceof Error && error.message === "INVALID_CREDENTIALS") {
            return res.status(401).json({
                message: "Email ou mot de passe incorrect",
            });
        }

        console.error(error);

        return res.status(500).json({
            message: "Erreur serveur",
        });
    }
};

const logout = (req: Request, res: Response) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "developpement",
        sameSite: "strict",
    });

    return res.status(204).send();
};


const getMe = async (
    req: Request & { user?: AuthUserDTO },
    res: Response
) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                message: "Authentification requise",
            });
        }

        const user = await usersService.getOneUser(req.user.userId);

        if (!user) {
            return res.status(404).json({
                message: "Utilisateur introuvable",
            });
        }

        return res.status(200).json({
            user,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Erreur serveur",
        });
    }
};


export default {
    login,
    logout,
    getMe
};
