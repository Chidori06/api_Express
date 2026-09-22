import Express from "express";

import usersController from "../controllers/users.controller.ts";
import checkExists from "../middlewares/checkExists.middleware.ts";

const userRouter = Express.Router();


userRouter.get("/users", checkExists.checkUserExists, usersController.getUsers);
userRouter.get("/users/:id", checkExists.checkUserExists, usersController.getUserById);
userRouter.post("/users", checkExists.checkUserExists, usersController.createUser);
userRouter.patch("/users/:id", checkExists.checkUserExists, usersController.updateUser);
userRouter.delete("/users/:id", checkExists.checkUserExists, usersController.deleteUser);

export default userRouter;
