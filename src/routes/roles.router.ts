import Express from "express";

import rolesController from "../controllers/roles.controller.ts";
import validate from "../middlewares/validate.middleware.ts";
import checkExists from "../middlewares/checkExists.middleware.ts";
import { createRoleSchema, roleIdSchema } from "../validators/roles.validators.ts";

const roleRouter = Express.Router();


roleRouter.get("/roles", rolesController.getRoles);
roleRouter.get("/roles/:id", validate(roleIdSchema, "params"), checkExists.checkRoleExists,
    rolesController.getRoleById);
roleRouter.post("/roles", validate(createRoleSchema, "body"), rolesController.createRole);
roleRouter.patch("/roles/:id", validate(roleIdSchema, "params"), checkExists.checkRoleExists,
    validate(createRoleSchema, "body"), rolesController.updateRole);
roleRouter.delete("/roles/:id", validate(roleIdSchema, "params"), checkExists.checkRoleExists, rolesController.deleteRole);

export default roleRouter;
