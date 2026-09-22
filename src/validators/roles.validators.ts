import { z } from "zod";

export const roleIdSchema = z.object({
    id: z.coerce.number().int().positive(),
});

export const createRoleSchema = z.object({
    label: z
        .string()
        .trim()
        .min(1, "Le nom du rôle est obligatoire")
        .max(100, "Le nom du rôle ne peut pas dépasser 100 caractères"),
});

export const updateRoleSchema = z.object({
    label: z
        .string()
        .trim()
        .min(1, "Le nom du rôle est obligatoire")
        .max(100, "Le nom du rôle ne peut pas dépasser 100 caractères")
        .optional(),
}).refine(
    (data) => Object.keys(data).length > 0,
    {
        message: "Vous devez modifier au moins un champ",
    }
);
