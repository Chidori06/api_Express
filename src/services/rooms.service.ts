import roomsRepository from "../repositories/rooms.repository.ts"


const getAllRooms = async () => {
    const rooms = await roomsRepository.findAllRooms();
};

const getOneRoom = async (id: number) => {
    const oneRoom = await roomsRepository.findOneRoom(id);
    return oneRoom;
};

const createARoom = async (data: { name: string, capacity: number }) => {
    await roomsRepository.createRoom(data);
}

const updateARoom = async (id: number, data: { name: string, capacity: number }) => {
    const room = await roomsRepository.findOneRoom(id);
    return await roomsRepository.updateRoom(id, data);
}

const deleteARoom = async (id: number) => {
    const room = await roomsRepository.findOneRoom(id);
    return await roomsRepository.deleteRoom(id);

}

export default {
    getAllRooms,
    getOneRoom,
    createARoom,
    updateARoom,
    deleteARoom
}