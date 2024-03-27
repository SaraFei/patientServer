import express from "express";
import { config } from "dotenv";
import cors from "cors";

import { connectToDB } from "./config/DBConfig.js";
import patientRouter from "./routs/patient.js";
import CntUnVaccin from "./routs/unVaccin.js"

config();
connectToDB();
const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }))
app.use("/api/patient", patientRouter);
app.use("/api/cnt", CntUnVaccin)

let port = process.env.PORT || 3500;
app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
})