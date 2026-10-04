import Express from "express";
import authController from "../controllers/auth.controller.ts";
import authMiddleware from "../middlewares/auth.middleware.ts";

const authRouter = Express.Router();


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Connecter un utilisateur
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: nom.prenom@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: motdepasse123
 *     responses:
 *       200:
 *         description: Connexion réussie
 *       401:
 *         description: Identifiants invalides
 *       500:
 *         description: Erreur serveur
 */
authRouter.post("/login", authController.login);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Récupérer l'utilisateur actuellement connecté
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Utilisateur actuellement connecté
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     lastname:
 *                       type: string
 *                       example: nom
 *                     firstname:
 *                       type: string
 *                       example: prénom
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: nom.prenom@example.com
 *                     role:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 2
 *                         label:
 *                           type: string
 *                           example: Formateur
 *       401:
 *         description: Authentification requise ou token invalide/expiré
 *       404:
 *         description: Utilisateur introuvable
 *       500:
 *         description: Erreur serveur
 */
authRouter.get("/me", authMiddleware.authenticate, authController.getMe);
// /me restaure l'autilisateur en cas de rechargement de la page.

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Déconnecter l'utilisateur
 *     description: Supprime le cookie d'authentification contenant le JWT.
 *     tags:
 *       - Auth
 *     responses:
 *       204:
 *         description: Déconnexion réussie
 *       500:
 *         description: Erreur serveur
 */
authRouter.post("/logout", authController.logout);



export default authRouter;
