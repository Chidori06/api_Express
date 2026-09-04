import Express from "express";
import roomsController from "../controllers/rooms.controller.ts";
import { createRoomSchema, roomIdSchema, updateRoomSchema } from "../validators/rooms.validators.ts";
import validateRoom from "../middlewares/validateRoom.middleware.ts";


const roomRouter = Express.Router();

roomRouter.get("/rooms", roomsController.getRooms);
roomRouter.get("/rooms/:id", validateRoom(roomIdSchema, "params"), roomsController.getRoomById);
roomRouter.post("/rooms", validateRoom(createRoomSchema, "body"), roomsController.createRoom);
roomRouter.patch("/rooms/:id", validateRoom(roomIdSchema, "params"),
    validateRoom(updateRoomSchema, "body"), roomsController.updateRoom);
roomRouter.delete("/rooms/:id", roomsController.deleteRoom);

export default roomRouter;