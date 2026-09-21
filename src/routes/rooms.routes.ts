import Express from "express";
import roomsController from "../controllers/rooms.controller.ts";
import { createRoomSchema, roomIdSchema, updateRoomSchema } from "../validators/rooms.validators.ts";
import validateRoom from "../middlewares/validateRoom.middleware.ts";
import checkExists from "../middlewares/checkExists.middleware.ts";


const roomRouter = Express.Router();

roomRouter.get("/rooms", roomsController.getRooms);
roomRouter.get("/rooms/:id", validateRoom(roomIdSchema, "params"), checkExists, roomsController.getRoomById);
roomRouter.post("/rooms", validateRoom(createRoomSchema, "body"), roomsController.createRoom);
roomRouter.patch("/rooms/:id", validateRoom(roomIdSchema, "params"), validateRoom(updateRoomSchema, "body"),
    checkExists, roomsController.updateRoom);
roomRouter.delete("/rooms/:id", checkExists, roomsController.deleteRoom);

export default roomRouter;