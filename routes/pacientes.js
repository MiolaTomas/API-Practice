import express from "express";
import {
  getAllPacientes,
  getPacienteById,
  createPaciente,
  updatePaciente,
  deletePaciente,
} from "../controllers/pacienteController.js";

const router = express.Router();

// CRUD Pacientes
router.get("/", getAllPacientes); // Listar todos
router.get("/:id", getPacienteById); // Obtener por ID
router.post("/", createPaciente); // Crear paciente
router.put("/:id", updatePaciente); // Actualizar paciente
router.delete("/:id", deletePaciente); // Eliminar paciente

export default router;
