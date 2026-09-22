import Express from "express";

import reservationsController from "../controllers/reservations.controller.ts";
import validate from "../middlewares/validate.middleware.ts";
import { createReservationSchema, reservationIdSchema, updateReservationSchema } from "../validators/reservations.validators.ts";

const resaRouter = Express.Router();

resaRouter.get("/reservations", validate(createReservationSchema, "body"), reservationsController.getReservations);
resaRouter.get("/reservations/:id", validate(reservationIdSchema, "params"), reservationsController.getReservationById);
resaRouter.post("/reservations", validate(createReservationSchema, "body"), reservationsController.createReservation);
resaRouter.patch("/reservations/:id", validate(reservationIdSchema, "params"),
    validate(updateReservationSchema, "body"), reservationsController.updateReservation);
resaRouter.delete("/reservations/:id", validate(reservationIdSchema, "params"), reservationsController.deleteReservation);

export default resaRouter;