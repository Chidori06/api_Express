import Express from "express";
import roomsController from "../controllers/rooms.controller.ts";
import { createRoomSchema, roomIdSchema, updateRoomSchema } from "../validators/rooms.validators.ts";
import validate from "../middlewares/validate.middleware.ts";
import checkExists from "../middlewares/checkExists.middleware.ts";


const roomRouter = Express.Router();

roomRouter.get("/rooms", roomsController.getRooms);
roomRouter.get("/rooms/:id", validate(roomIdSchema, "params"), checkExists.checkRoomExists,
    roomsController.getRoomById);
roomRouter.post("/rooms", validate(createRoomSchema, "body"), roomsController.createRoom);
roomRouter.patch("/rooms/:id", validate(roomIdSchema, "params"), checkExists.checkRoomExists,
    validate(updateRoomSchema, "body"), roomsController.updateRoom);
roomRouter.delete("/rooms/:id", validate(roomIdSchema, "params"), checkExists.checkRoomExists,
    roomsController.deleteRoom);

export default roomRouter;

