import Express from "express";

import usersController from "../controllers/users.controller.ts";

const userRouter = Express.Router();


userRouter.get("/users", usersController.getUsers);
userRouter.get("/users/:id", usersController.getUserById);
userRouter.post("/users", usersController.createUser);
userRouter.patch("/users/:id", usersController.updateUser);
userRouter.delete("/users/:id", usersController.deleteUser);

export default userRouter;
