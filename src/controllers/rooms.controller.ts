import type { Request, Response } from "express";
import roomsService from "../services/rooms.service.ts";

const getRooms = async (req: Request, res: Response) => {
    try {
        const rooms = await roomsService.getAllRooms();
        return res.status(200).json(rooms);

    }
    catch (error) {
        return res.status(500).json(error);
    }

};

const getRoomById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        const room = await roomsService.getOneRoom(id);

        return res.status(200).json(room);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const createRoom = async (req: Request, res: Response,) => {
    try {
        const { name, capacity } = req.body;

        const room = await roomsService.createARoom(
            name,
            capacity
        );

        return res.status(201).json(room);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const updateRoom = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        const room = await roomsService.updateARoom(
            id,
            req.body
        );

        return res.status(200).json(room);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const deleteRoom = async (req: Request, res: Response,) => {
    try {
        const id = Number(req.params.id);

        await roomsService.deleteARoom(id);

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json(error);
    }
};

export default {
    getRooms,
    getRoomById,
    createRoom,
    updateRoom,
    deleteRoom,
}
