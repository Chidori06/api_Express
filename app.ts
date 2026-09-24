import Express from "express";
import roomRouter from "./src/routes/rooms.routes.ts";
import cors from "cors";
import roleRouter from "./src/routes/roles.router.ts";
import userRouter from "./src/routes/users.router.ts";
import resaRouter from "./src/routes/reservations.router.ts";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.ts";


const express = Express;
const app = express();
const port = 3000;

// app.get("/", (req, res) => {
//     res.send("Hello World!");
// });
app.use(cors());
app.use(express.json());

app.use("/api", roomRouter);
app.use("/api", roleRouter);
app.use("/api", userRouter);
app.use("/api", resaRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});




