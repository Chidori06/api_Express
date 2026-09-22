import Express from "express";

import rolesController from "../controllers/roles.controller.ts";

const roleRouter = Express.Router();


roleRouter.get("/roles", rolesController.getRoles);
roleRouter.get("/roles/:id", rolesController.getRoleById);
roleRouter.post("/roles", rolesController.createRole);
roleRouter.patch("/roles/:id", rolesController.updateRole);
roleRouter.delete("/roles/:id", rolesController.deleteRole);

export default roleRouter;
