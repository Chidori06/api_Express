import Express from "express";
import roomRouter from "./src/routes/rooms.routes.ts";

const express = Express;
const app = express();
const port = 3000;

// app.get("/", (req, res) => {
//     res.send("Hello World!");
// });
app.use(express.json());

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

app.use("/api", roomRouter);

