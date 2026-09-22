import reservationsRepository from "../repositories/reservations.repository.ts";

const getAllReservations = async () => {
    const reservations = await reservationsRepository.findAllReservations();
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

const updateAReservation = async (id: number, data: { userId: number, roomId: number, dateDebut: Date, dateFin: Date }) => {

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
    return await reservationsRepository.updateReservation(id, data);
}

const deleteAReservation = async (id: number) => {
    return reservationsRepository.deleteReservation(id);
};

export default {
    getAllReservations,
    getOneReservation,
    createAReservation,
    updateAReservation,
    deleteAReservation
}