import express from "express";
import * as patientControllers from "../controllers/patient.js";

const router = express.Router();

router.get("/", patientControllers.getAllPatients);
router.get("/:id", patientControllers.getPatientById)
router.post("/", patientControllers.addPatient);
router.put("/:id", patientControllers.updatePatient);
router.delete("/:id", patientControllers.deletePatient);


export default router;