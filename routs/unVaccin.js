import express from "express";
import { howManyVaccinated } from "../controllers/unVaccin.js";



const router = express.Router();
router.get("/", howManyVaccinated);

export default router;