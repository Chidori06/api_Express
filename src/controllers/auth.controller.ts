import type { Request, Response } from "express";
import authService from "../services/auth.service.ts";

const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await authService.login(email, password);

        return res.status(200).json(user);
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
