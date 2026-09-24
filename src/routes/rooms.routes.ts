import Express from "express";
import roomsController from "../controllers/rooms.controller.ts";
import { createRoomSchema, roomIdSchema, updateRoomSchema } from "../validators/rooms.validators.ts";
import validate from "../middlewares/validate.middleware.ts";
import checkExists from "../middlewares/checkExists.middleware.ts";


const roomRouter = Express.Router();


/**
 * @swagger
 * /api/rooms:
 *   get:
 *     summary: Récupérer toutes les salles
 *     tags:
 *       - Rooms
 *     responses:
 *       200:
 *         description: Liste des salles
 */
roomRouter.get("/rooms", roomsController.getRooms);

/**
 * @swagger
 * /api/rooms/{id}:
 *   get:
 *     summary: Récupérer une salle
 *     tags:
 *       - Rooms
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant de la salle
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Salle trouvée
 *       404:
 *         description: Salle introuvable
 */
roomRouter.get("/rooms/:id", validate(roomIdSchema, "params"), checkExists.checkRoomExists,
    roomsController.getRoomById);

/**
 * @swagger
 * /api/rooms:
 *   post:
 *     summary: Créer une salle
 *     tags:
 *       - Rooms
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - capacity
 *             properties:
 *               name:
 *                 type: string
 *                 example: Salle 101
 *               capacity:
 *                 type: integer
 *                 example: 20
 *     responses:
 *       201:
 *         description: Salle créée
 *       400:
 *         description: Données invalides
 */
roomRouter.post("/rooms", validate(createRoomSchema, "body"), roomsController.createRoom);

/**
 * @swagger
 * /api/rooms/{id}:
 *   patch:
 *     summary: Modifier une salle
 *     tags:
 *       - Rooms
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant de la salle
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - capacity
 *             properties:
 *               name:
 *                 type: string
 *                 example: Salle 102
 *               capacity:
 *                 type: integer
 *                 example: 25
 *     responses:
 *       200:
 *         description: Salle modifiée
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Salle introuvable
 */
roomRouter.patch("/rooms/:id", validate(roomIdSchema, "params"), checkExists.checkRoomExists,
    validate(updateRoomSchema, "body"), roomsController.updateRoom);

/**
 * @swagger
 * /api/rooms/{id}:
 *   delete:
 *     summary: Supprimer une salle
 *     tags:
 *       - Rooms
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant de la salle
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       204:
 *         description: Salle supprimée
 *       404:
 *         description: Salle introuvable
 *       500:
 *         description: Impossible de supprimer la salle
 */
roomRouter.delete("/rooms/:id", validate(roomIdSchema, "params"), checkExists.checkRoomExists,
    roomsController.deleteRoom);

export default roomRouter;

