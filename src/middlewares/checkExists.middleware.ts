import type { NextFunction, Request, Response } from "express";
import roomsService from "../services/rooms.service.ts";
import type { RoomDTO } from "../dto/room.dto.ts";

const checkExists = async (req: Request & { room?: RoomDTO }, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);

    const room = await roomsService.getOneRoom(id);

    if (!room) {
        return res.status(404).json({
            message: "Chambre non trouvée",
        });
    }
    req.room = room;
    next();
};
export default checkExists;