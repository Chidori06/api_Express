import Express from "express";
import validate from "../middlewares/validate.middleware.ts";
import usersController from "../controllers/users.controller.ts";
import checkExists from "../middlewares/checkExists.middleware.ts";
import { createUserSchema, userIdSchema } from "../validators/users.validators.ts";

const userRouter = Express.Router();


userRouter.get("/users", usersController.getUsers);
userRouter.get("/users/:id", validate(userIdSchema, "params"), checkExists.checkUserExists, usersController.getUserById);
userRouter.post("/users", validate(createUserSchema, "body"), usersController.createUser);
userRouter.patch("/users/:id", validate(userIdSchema, "params"), checkExists.checkUserExists,
    validate(createUserSchema, "body"), usersController.updateUser);
userRouter.delete("/users/:id", validate(userIdSchema, "params"), checkExists.checkUserExists, usersController.deleteUser);

export default userRouter;
