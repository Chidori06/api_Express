import { z } from "zod";

export const reservationIdSchema = z.object({
    id: z.coerce.number().int().positive(),
});

export const createReservationSchema = z.object({
    userId: z
        .number()
        .int()
        .positive(),

    roomId: z
        .number()
        .int()
        .positive(),

    dateDebut: z.coerce.date(),

    dateFin: z.coerce.date(),
}).refine(
    (data) => data.dateFin > data.dateDebut,
    {
        message: "La date de fin doit être après la date de début",
        path: ["dateFin"],
    }
);

export const updateReservationSchema = z.object({
    userId: z
        .number()
        .int()
        .positive()
        .optional(),

    roomId: z
        .number()
        .int()
        .positive()
        .optional(),

    dateDebut: z.coerce.date().optional(),

    dateFin: z.coerce.date().optional(),
}).refine(
    (data) => Object.keys(data).length > 0,
    {
        message: "Vous devez modifier au moins un champ",
    }
);
