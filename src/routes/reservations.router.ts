import Express from "express";
import reservationsController from "../controllers/reservations.controller.ts";
import validate from "../middlewares/validate.middleware.ts";
import { createReservationSchema, reservationIdSchema, updateReservationSchema } from "../validators/reservations.validators.ts";
import checkExists from "../middlewares/checkExists.middleware.ts";

const resaRouter = Express.Router();

/**
 * @swagger
 * /api/reservations:
 *   get:
 *     summary: Récupérer toutes les réservations
 *     tags:
 *       - Reservations
 *     responses:
 *       200:
 *         description: Liste des réservations
 */
resaRouter.get("/reservations", reservationsController.getReservations);

/**
 * @swagger
 * /api/reservations/{id}:
 *   get:
 *     summary: Récupérer une réservation
 *     tags:
 *       - Reservations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant de la réservation
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Réservation trouvée
 *       400:
 *         description: Identifiant invalide
 *       404:
 *         description: Réservation introuvable
 */
resaRouter.get("/reservations/:id", validate(reservationIdSchema, "params"), checkExists.checkReservationExists, reservationsController.getReservationById);

/**
 * @swagger
 * /api/reservations:
 *   post:
 *     summary: Créer une réservation
 *     tags:
 *       - Reservations
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - roomId
 *               - dateDebut
 *               - dateFin
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               roomId:
 *                 type: integer
 *                 example: 2
 *               dateDebut:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-09-25T09:00:00.000Z"
 *               dateFin:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-09-25T11:00:00.000Z"
 *     responses:
 *       201:
 *         description: Réservation créée
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Utilisateur ou salle introuvable
 *       500:
 *         description: Erreur lors de la création de la réservation
 */
resaRouter.post("/reservations", validate(createReservationSchema, "body"), reservationsController.createReservation);

/**
 * @swagger
 * /api/reservations/{id}:
 *   patch:
 *     summary: Modifier une réservation
 *     tags:
 *       - Reservations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant de la réservation
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
 *               userId:
 *                 type: integer
 *                 example: 1
 *               roomId:
 *                 type: integer
 *                 example: 2
 *               dateDebut:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-09-25T14:00:00.000Z"
 *               dateFin:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-09-25T16:00:00.000Z"
 *     responses:
 *       200:
 *         description: Réservation modifiée
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Réservation introuvable
 */
resaRouter.patch("/reservations/:id", validate(reservationIdSchema, "params"), checkExists.checkReservationExists,
    validate(updateReservationSchema, "body"), reservationsController.updateReservation);

/**
 * @swagger
 * /api/reservations/{id}:
 *   delete:
 *     summary: Supprimer une réservation
 *     tags:
 *       - Reservations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant de la réservation
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       204:
 *         description: Réservation supprimée
 *       400:
 *         description: Identifiant invalide
 *       404:
 *         description: Réservation introuvable
 */
resaRouter.delete("/reservations/:id", validate(reservationIdSchema, "params"), checkExists.checkReservationExists, reservationsController.deleteReservation);

export default resaRouter;