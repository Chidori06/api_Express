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
    return await reservationsRepository.createReservation(userId, roomId, dateDebut, dateFin);
}

const updateAReservation = async (id: number, data: { userId: number, roomId: number, dateDebut: Date, dateFin: Date }) => {
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