import exppress from "express";
import { getCountPatients } from "../controllers/functions.js";

const router = exppress.Router();

router.get("/", getCountPatients);
export default router;