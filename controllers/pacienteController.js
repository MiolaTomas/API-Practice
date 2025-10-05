// controllers/pacienteController.js
import db from "../db/database.js";

// --- Obtener todos los pacientes ---
export const getAllPacientes = (req, res) => {
  try {
    const pacientes = db.prepare("SELECT * FROM pacientes").all();
    res.json(pacientes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener pacientes" });
  }
};

// --- Obtener paciente por ID ---
export const getPacienteById = (req, res) => {
  try {
    const paciente = db
      .prepare("SELECT * FROM pacientes WHERE id = ?")
      .get(req.params.id);

    if (!paciente)
      return res.status(404).json({ error: "Paciente no encontrado" });

    res.json(paciente);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener paciente" });
  }
};

// --- Crear un paciente ---
export const createPaciente = (req, res) => {
  try {
    const { nombre, apellido, dni, email, telefono } = req.body;
    const stmt = db.prepare(
      "INSERT INTO pacientes (nombre, apellido, dni, email, telefono) VALUES (?, ?, ?, ?, ?)"
    );
    const info = stmt.run(nombre, apellido, dni, email, telefono);

    const newPaciente = db
      .prepare("SELECT * FROM pacientes WHERE id = ?")
      .get(info.lastInsertRowid);

    res.status(201).json(newPaciente);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al crear paciente" });
  }
};

// --- Actualizar paciente ---
export const updatePaciente = (req, res) => {
  try {
    const { nombre, apellido, dni, email, telefono } = req.body;
    const stmt = db.prepare(
      "UPDATE pacientes SET nombre = ?, apellido = ?, dni = ?, email = ?, telefono = ? WHERE id = ?"
    );
    const info = stmt.run(
      nombre,
      apellido,
      dni,
      email,
      telefono,
      req.params.id
    );

    if (info.changes === 0)
      return res.status(404).json({ error: "Paciente no encontrado" });

    const updatedPaciente = db
      .prepare("SELECT * FROM pacientes WHERE id = ?")
      .get(req.params.id);

    res.json(updatedPaciente);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar paciente" });
  }
};

// --- Eliminar paciente ---
export const deletePaciente = (req, res) => {
  try {
    const stmt = db.prepare("DELETE FROM pacientes WHERE id = ?");
    const info = stmt.run(req.params.id);

    if (info.changes === 0)
      return res.status(404).json({ error: "Paciente no encontrado" });

    res.json({ message: "Paciente eliminado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al eliminar paciente" });
  }
};
