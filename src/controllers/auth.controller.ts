import type { Request, Response } from "express";
import authService from "../services/auth.service.ts";

const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const result = await authService.login(email, password);

        res.cookie("token", result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            //vaut mieux même en strict pour l'avoir que sur notre navigateur
            sameSite: "lax",
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

export default {
    login,
};
