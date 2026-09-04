import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";

const validateRoom = (
    schema: ZodType,
    target: "body" | "params" | "query"
) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req[target]);

        if (!result.success) {
            return res.status(400).json({
                message: "Données invalides",
                errors: result.error.issues.map((issue) => ({
                    field: issue.path.join("."),
                    message: issue.message,
                })),
            });
        }

        req[target] = result.data;

        next();
    };
};

export default validateRoom;