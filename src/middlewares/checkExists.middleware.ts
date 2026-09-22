import type { NextFunction, Request, Response } from "express";
import roomsService from "../services/rooms.service.ts";
import usersService from "../services/users.service.ts";
import reservationsService from "../services/reservations.service.ts";
import type { RoomDTO } from "../dto/room.dto.ts";
import type { ReservationDTO } from "../dto/reservation.dto.ts";
import type { RoleDTO } from "../dto/role.dto.ts";
import rolesService from "../services/roles.service.ts";

const checkRoomExists = async (req: Request & { room?: RoomDTO }, res: Response, next: NextFunction) => {
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


const checkUserExists = async (req: Request, res: Response, next: NextFunction) => {
    const userId = Number(req.body.userId);

    const user = await usersService.getOneUser(userId);

    if (!user) {
        return res.status(404).json({
            message: "Utilisateur non trouvé",
        });
    }

    next();
};

const checkReservationExists = async (req: Request & { reservation?: ReservationDTO }, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);

    const reservation = await reservationsService.getOneReservation(id);

    if (!reservation) {
        return res.status(404).json({
            message: "Réservation non trouvée",
        });
    }

    req.reservation = reservation;

    next();
};

const checkRoleExists = async (
    req: Request & { role?: RoleDTO },
    res: Response,
    next: NextFunction
) => {
    const id = Number(req.params.id);

    const role = await rolesService.getOneRole(id);

    if (!role) {
        return res.status(404).json({
            message: "Rôle non trouvé",
        });
    }

    req.role = role;

    next();
};

export default {
    checkRoomExists,
    checkReservationExists,
    checkUserExists,
    checkRoleExists
}