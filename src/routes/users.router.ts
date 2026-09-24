import Express from "express";
import validate from "../middlewares/validate.middleware.ts";
import usersController from "../controllers/users.controller.ts";
import checkExists from "../middlewares/checkExists.middleware.ts";
import { createUserSchema, updateUserSchema, userIdSchema } from "../validators/users.validators.ts";

const userRouter = Express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Récupérer tous les utilisateurs
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 */
userRouter.get("/users", usersController.getUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Récupérer un utilisateur
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant de l'utilisateur
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Utilisateur trouvé
 *       400:
 *         description: Identifiant invalide
 *       404:
 *         description: Utilisateur introuvable
 */
userRouter.get("/users/:id", validate(userIdSchema, "params"), checkExists.checkUserExists, usersController.getUserById);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Créer un utilisateur
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - lastname
 *               - firstname
 *               - email
 *               - password
 *               - roleId
 *             properties:
 *               lastname:
 *                 type: string
 *                 example: Nom
 *               firstname:
 *                 type: string
 *                 example: prenom
 *               email:
 *                 type: string
 *                 format: email
 *                 example: nom.prenom@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password
 *               roleId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Utilisateur créé
 *       400:
 *         description: Données invalides
 */
userRouter.post("/users", validate(createUserSchema, "body"), usersController.createUser);

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     summary: Modifier un utilisateur
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant de l'utilisateur
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
 *               lastname:
 *                 type: string
 *                 example: Nom
 *               firstname:
 *                 type: string
 *                 example: prenom
 *               email:
 *                 type: string
 *                 format: email
 *                 example: nom.prenom@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: nouveaupassword
 *               roleId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Utilisateur modifié
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Utilisateur introuvable
 */
userRouter.patch(
    "/users/:id",
    validate(userIdSchema, "params"),
    validate(updateUserSchema, "body"),
    usersController.updateUser
);


/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant de l'utilisateur
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       204:
 *         description: Utilisateur supprimé
 *       400:
 *         description: Identifiant invalide
 *       404:
 *         description: Utilisateur introuvable
 */
userRouter.delete("/users/:id", validate(userIdSchema, "params"), checkExists.checkUserExists, usersController.deleteUser);

export default userRouter;
