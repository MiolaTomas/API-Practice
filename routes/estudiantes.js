import { Router } from "express";

import {
  getEstudiantes,
  crearEstudiante,
} from "../controllers/estudiantesController.js";

const router = Router();

router.get("/", getEstudiantes);
router.post("/", crearEstudiante);

export default router;
