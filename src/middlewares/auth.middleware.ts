import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { AuthUserDTO } from "../dto/authUser.dto.ts";

const authenticate = (req: Request & { user?: AuthUserDTO }, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Authentification requise",
            });
        }
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as AuthUserDTO;
        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Token invalide ou expiré",
        });
    }
};

export default {
    authenticate,
};
