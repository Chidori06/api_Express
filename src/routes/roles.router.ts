import Express from "express";

import rolesController from "../controllers/roles.controller.ts";
import validate from "../middlewares/validate.middleware.ts";
import checkExists from "../middlewares/checkExists.middleware.ts";
import { createRoleSchema, roleIdSchema, updateRoleSchema } from "../validators/roles.validators.ts";

const roleRouter = Express.Router();

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Récupérer tous les rôles
 *     tags:
 *       - Roles
 *     responses:
 *       200:
 *         description: Liste des rôles
 */
roleRouter.get("/roles", rolesController.getRoles);

/**
 * @swagger
 * /api/roles/{id}:
 *   get:
 *     summary: Récupérer un rôle
 *     tags:
 *       - Roles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant du rôle
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Rôle trouvé
 *       400:
 *         description: Identifiant invalide
 *       404:
 *         description: Rôle introuvable
 */
roleRouter.get("/roles/:id", validate(roleIdSchema, "params"), checkExists.checkRoleExists,
    rolesController.getRoleById);

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Créer un rôle
 *     tags:
 *       - Roles
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - label
 *             properties:
 *               label:
 *                 type: string
 *                 example: Formateur
 *     responses:
 *       201:
 *         description: Rôle créé
 *       400:
 *         description: Données invalides
 */
roleRouter.post("/roles", validate(createRoleSchema, "body"), rolesController.createRole);

/**
 * @swagger
 * /api/roles/{id}:
 *   patch:
 *     summary: Modifier un rôle
 *     tags:
 *       - Roles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant du rôle
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               label:
 *                 type: string
 *                 example: Administrateur
 *     responses:
 *       200:
 *         description: Rôle modifié
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Rôle introuvable
 */
roleRouter.patch("/roles/:id", validate(roleIdSchema, "params"), checkExists.checkRoleExists,
    validate(updateRoleSchema, "body"), rolesController.updateRole);

/**
 * @swagger
 * /api/roles/{id}:
 *   delete:
 *     summary: Supprimer un rôle
 *     tags:
 *       - Roles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant du rôle
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       204:
 *         description: Rôle supprimé
 *       400:
 *         description: Identifiant invalide
 *       404:
 *         description: Rôle introuvable
 */
roleRouter.delete("/roles/:id", validate(roleIdSchema, "params"), checkExists.checkRoleExists, rolesController.deleteRole);

export default roleRouter;
