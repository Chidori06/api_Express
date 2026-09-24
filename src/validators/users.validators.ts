import { z } from "zod";

export const userIdSchema = z.object({
    id: z.coerce.number().int().positive(),
});

export const createUserSchema = z.object({
    lastname: z
        .string()
        .trim()
        .min(1, "Le nom est obligatoire")
        .max(100, "Le nom ne peut pas dépasser 100 caractères"),

    firstname: z
        .string()
        .trim()
        .min(1, "Le prénom est obligatoire")
        .max(100, "Le prénom ne peut pas dépasser 100 caractères"),

    email: z
        .string()
        .trim()
        .email("L'adresse email est invalide"),

    password: z
        .string()
        .min(6, "Le mot de passe doit contenir au moins 6 caractères"),

    roleId: z
        .coerce
        .number()
        .int()
        .positive(),
});

export const updateUserSchema = z.object({
    lastname: z
        .string()
        .trim()
        .min(1)
        .max(100)
        .optional(),

    firstname: z
        .string()
        .trim()
        .min(1)
        .max(100)
        .optional(),

    email: z
        .string()
        .trim()
        .email("L'adresse email est invalide")
        .optional(),

    password: z
        .string()
        .min(6, "Le mot de passe doit contenir au moins 6 caractères")
        .optional(),

    roleId: z
        .coerce
        .number()
        .int()
        .positive()
        .optional(),
}).refine(
    (data) => Object.keys(data).length > 0,
    {
        message: "Vous devez modifier au moins un champ",
    }
);
