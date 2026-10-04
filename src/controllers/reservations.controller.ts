import type { Request, Response } from "express";
import reservationsService from "../services/reservations.service.ts";
import type { AuthUserDTO } from "../dto/authUser.dto.ts";
import { ROLES } from "../selects/role.select.ts";

const getReservations = async (req: Request, res: Response) => {
    try {
        const user = (req as Request & { user?: AuthUserDTO }).user;

        if (!user) {
            return res.status(401).json({
                message: "Authentification requise",
            });
        }

        const reservations = await reservationsService.getAllReservations(
            user.userId,
            user.roleId
        );

        return res.status(200).json(reservations);
    }
    catch (error) {
        return res.status(500).json(error);
    }
};


const getReservationById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const reservation = await reservationsService.getOneReservation(id);
        return res.status(200).json(reservation);
    }
    catch (error) {
        return res.status(500).json(error);
    }
};

const createReservation = async (req: Request, res: Response) => {
    try {
        const user = (req as Request & { user?: AuthUserDTO }).user;

        if (!user) {
            return res.status(401).json({
                message: "Authentification requise",
            });
        }

        const {
            roomId,
            userId,
            dateDebut,
            dateFin,
        } = req.body;

        const reservationUserId =
            user.roleId === ROLES.ADMIN
                ? Number(userId)
                : user.userId;

        const resa = await reservationsService.createAReservation(
            reservationUserId,
            Number(roomId),
            new Date(dateDebut),
            new Date(dateFin)
        );

        return res.status(201).json(resa);
    }
    catch (error) {
        return res.status(500).json(error);
    }
};


const updateReservation = async (req: Request, res: Response) => {
    try {
        const user = (req as Request & { user?: AuthUserDTO }).user;

        if (!user) {
            return res.status(401).json({
                message: "Authentification requise",
            });
        }

        const id = Number(req.params.id);

        const data = {
            userId: Number(req.body.userId),
            roomId: Number(req.body.roomId),
            dateDebut: new Date(req.body.dateDebut),
            dateFin: new Date(req.body.dateFin),
        };

        const resa = await reservationsService.updateAReservation(
            id,
            data,
            user
        );

        return res.status(200).json(resa);

    } catch (error) {
        if (error instanceof Error) {
            if (error.message === "Pas de réservation trouvée") {
                return res.status(404).json({
                    message: "Réservation introuvable",
                });
            }

            if (error.message === "Interdit") {
                return res.status(403).json({
                    message: "Vous ne pouvez pas modifier cette réservation",
                });
            }
        }

        console.error(error);

        return res.status(500).json({
            message: "Erreur lors de la modification de la réservation",
        });
    }
};

const deleteReservation = async (req: Request, res: Response) => {
    try {
        const user = (req as Request & { user?: AuthUserDTO }).user;

        if (!user) {
            return res.status(401).json({
                message: "Authentification requise",
            });
        }

        const id = Number(req.params.id);

        await reservationsService.deleteAReservation(id, user);

        return res.status(204).send();

    } catch (error) {
        if (error instanceof Error) {
            if (error.message === "Pas de réservation trouvée") {
                return res.status(404).json({
                    message: "Réservation introuvable",
                });
            }

            if (error.message === "Interdit") {
                return res.status(403).json({
                    message: "Vous ne pouvez pas supprimer cette réservation",
                });
            }
        }

        console.error(error);

        return res.status(500).json({
            message: "Erreur lors de la suppression de la réservation",
        });
    }
};


export default {
    getReservations,
    getReservationById,
    createReservation,
    updateReservation,
    deleteReservation
}