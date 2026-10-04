import type { AuthUserDTO } from "../dto/authUser.dto.ts";
import reservationsRepository from "../repositories/reservations.repository.ts";
import { ROLES } from "../selects/role.select.ts";

const getAllReservations = async (userId: number, roleId: number) => {
    const reservations = await reservationsRepository.findAllReservations(
        userId,
        roleId
    );

    return reservations;
};


const getOneReservation = async (id: number) => {
    const reservation = await reservationsRepository.findOneReservation(id);
    return reservation;
};

const createAReservation = async (userId: number, roomId: number, dateDebut: Date, dateFin: Date) => {
    if (dateDebut >= dateFin) {
        throw new Error("La date de début doit être avant la date de fin");
    }

    const conflict = await reservationsRepository.findConflict(
        roomId,
        dateDebut,
        dateFin,
    );

    if (conflict) {
        throw new Error("La chambre est déjà réservée sur cette période");
    }
    return await reservationsRepository.createReservation(userId, roomId, dateDebut, dateFin);
}

const updateAReservation = async (id: number, data: {
    userId: number; roomId: number;
    dateDebut: Date; dateFin: Date;
},
    currentUser: AuthUserDTO
) => {
    const reservation = await reservationsRepository.findOneReservation(id);

    if (!reservation) {
        throw new Error("Pas de réservation trouvée");
    }

    // Un formateur ne peut modifier que ses propres réservations
    if (
        currentUser.roleId !== ROLES.ADMIN &&
        reservation.userId !== currentUser.userId
    ) {
        throw new Error("Interdit");
    }

    if (data.dateDebut >= data.dateFin) {
        throw new Error("La date de début doit être avant la date de fin");
    }

    const conflict = await reservationsRepository.findConflict(
        data.roomId,
        data.dateDebut,
        data.dateFin,
        id
    );

    if (conflict) {
        throw new Error("La chambre est déjà réservée sur cette période");
    }

    return reservationsRepository.updateReservation(id, data);
};


const deleteAReservation = async (id: number, currentUser: AuthUserDTO) => {
    const reservation = await reservationsRepository.findOneReservation(id);

    if (!reservation) {
        throw new Error("Pas de réservation trouvée");
    }

    if (
        currentUser.roleId !== ROLES.ADMIN &&
        reservation.userId !== currentUser.userId
    ) {
        throw new Error("Interdit");
    }

    return reservationsRepository.deleteReservation(id);
};


export default {
    getAllReservations,
    getOneReservation,
    createAReservation,
    updateAReservation,
    deleteAReservation
}