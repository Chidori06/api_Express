import { z } from "zod";

export const roomIdSchema = z.object({
    id: z.coerce.number().int().positive(),
});

export const createRoomSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Le nom de la salle est obligatoire")
        .max(100, "Le nom de la salle ne peut pas dépasser 100 caractères"),

    capacity: z
        .number()
        .int("La capacité de la salle doit être un nombre entier")
        .positive("La capacité de la salle doit être supérieure à 0")
        .max(10000, "La capacité de la salle ne peut pas dépasser 1000"),
});

export const updateRoomSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1)
        .max(100)
        .optional(),

    capacity: z
        .number()
        .int()
        .positive()
        .max(10000)
        .optional(),
}).refine(
    (data) => Object.keys(data).length > 0,
    {
        message: "Vous devez modifiez au moins un champ",
    }
);