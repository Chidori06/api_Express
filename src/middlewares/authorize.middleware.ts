import type { Request, Response, NextFunction } from "express";
import type { AuthUserDTO } from "../dto/authUser.dto.ts";

const authorize = (...allowedRoles: number[]) => {
    return (
        req: Request & { user?: AuthUserDTO },
        res: Response,
        next: NextFunction
    ) => {
        if (!req.user) {
            return res.status(401).json({
                message: "Authentification requise",
            });
        }

        if (!allowedRoles.includes(req.user.roleId)) {
            return res.status(403).json({
                message: "Accès interdit",
            });
        }

        next();
    };
};

export default authorize;
