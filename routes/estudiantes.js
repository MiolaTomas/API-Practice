import { Router } from "express";
import {
  getEstudiantes,
  crearEstudiante,
} from "../controllers/estudiantesController.js";

const router = Router();

// GET /students
router.get("/all", getEstudiantes);
router.post("/crearEstudiante", crearEstudiante);

export default router;
