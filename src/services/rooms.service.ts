import roomsRepository from "../repositories/rooms.repository.ts"


const getAllRooms = async () => {
    const rooms = await roomsRepository.findAllRooms();
    return rooms;
};

const getOneRoom = async (id: number) => {
    const oneRoom = await roomsRepository.findOneRoom(id);
    if (!oneRoom) {
        throw new Error("Room not found");
    }
    return oneRoom;
};

const createARoom = (name: string, capacity: number) => {
    return roomsRepository.createRoom(name, capacity);
};


const updateARoom = async (id: number, data: { name: string, capacity: number }) => {
    const room = await roomsRepository.findOneRoom(id);
    return await roomsRepository.updateRoom(id, data);
}

const deleteARoom = async (id: number) => {
    const room = await roomsRepository.findOneRoom(id);
    return roomsRepository.deleteRoom(id);
};


export default {
    getAllRooms,
    getOneRoom,
    createARoom,
    updateARoom,
    deleteARoom
}