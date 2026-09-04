import Express from "express";
//import controller
//import middleware

const roomRouter = Express.Router();

roomRouter.get("/rooms");
roomRouter.get("/rooms/:id");
roomRouter.post("/rooms");
roomRouter.patch("/rooms/:id");
roomRouter.delete("/rooms/:id");

export default roomRouter;