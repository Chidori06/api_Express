import type { Request, Response } from "express";
import reservationsService from "../services/reservations.service.ts";

const getReservations = async (req: Request, res: Response) => {
    try {
        const reservations = await reservationsService.getAllReservations();
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

const createReservation = async (req: Request, res: Response,) => {
    try {
        const { roomId, userId, dateDebut, dateFin, } = req.body;
        const resa = await reservationsService.createAReservation(
            Number(userId),
            Number(roomId),
            new Date(dateDebut),
            new Date(dateFin));

        return res.status(201).json(resa);
    }
    catch (error) {
        return res.status(500).json(error);
    }
};

const updateReservation = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const data = {
            userId: Number(req.body.userId),
            roomId: Number(req.body.roomId),
            dateDebut: new Date(req.body.dateDebut),
            dateFin: new Date(req.body.dateFin),
        };
        const resa = await reservationsService.updateAReservation(id, data);
        res.status(200).json(resa);
    }
    catch (error) {
        return res.status(500).json(error);
    }

};

const deleteReservation = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        await reservationsService.deleteAReservation(id);
        res.status(204).send();
    }
    catch (error) {
        return res.status(500).json(error);
    }
};

export default {
    getReservations,
    getReservationById,
    createReservation,
    updateReservation,
    deleteReservation
}