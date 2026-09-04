import Express from "express";
import roomsController from "../controllers/rooms.controller.ts";


const roomRouter = Express.Router();

roomRouter.get("/rooms", roomsController.getRooms);
roomRouter.get("/rooms/:id", roomsController.getRoomById);
roomRouter.post("/rooms", roomsController.createRoom);
roomRouter.patch("/rooms/:id", roomsController.updateRoom);
roomRouter.delete("/rooms/:id", roomsController.deleteRoom);

export default roomRouter;