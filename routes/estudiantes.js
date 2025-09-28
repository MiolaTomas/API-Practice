import { Router } from "express";
import { getAllStudents } from "../controllers/estudiantesController.js";

const router = Router();

// GET /students
router.get("/all", getAllStudents);

export default router;
