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

    // --- Validaciones ---
    if (!nombre || !apellido || !dni || !email || !telefono) {
      return res
        .status(400)
        .json({
          error:
            "Todos los campos (nombre, apellido, dni, email, telefono) son requeridos",
        });
    }

    // DNI: solo números y 7–8 dígitos
    if (!/^\d{7,8}$/.test(dni)) {
      return res
        .status(400)
        .json({
          error:
            "El DNI debe contener solo números y tener entre 7 y 8 dígitos",
        });
    }

    // Email: formato válido
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Formato de email no válido" });
    }

    // Teléfono: solo números, 8–15 dígitos
    if (!/^\d{8,15}$/.test(telefono)) {
      return res
        .status(400)
        .json({
          error:
            "El teléfono debe contener solo números y tener entre 8 y 15 dígitos",
        });
    }

    // Evitar duplicados de email o DNI
    const existing = db
      .prepare("SELECT * FROM pacientes WHERE dni = ? OR email = ?")
      .get(dni, email);

    if (existing) {
      return res
        .status(409)
        .json({ error: "Ya existe un paciente con el mismo DNI o email" });
    }

    // --- Inserción en DB ---
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

    // Validaciones similares a create
    if (!nombre || !apellido || !dni || !email || !telefono) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    if (!/^\d{7,8}$/.test(dni)) {
      return res
        .status(400)
        .json({
          error:
            "El DNI debe contener solo números y tener entre 7 y 8 dígitos",
        });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Formato de email no válido" });
    }

    if (!/^\d{8,15}$/.test(telefono)) {
      return res
        .status(400)
        .json({
          error:
            "El teléfono debe contener solo números y tener entre 8 y 15 dígitos",
        });
    }

    // Comprobar si existe
    const exists = db
      .prepare("SELECT * FROM pacientes WHERE id = ?")
      .get(req.params.id);
    if (!exists)
      return res.status(404).json({ error: "Paciente no encontrado" });

    // Evitar duplicados en otro registro
    const duplicate = db
      .prepare(
        "SELECT * FROM pacientes WHERE (dni = ? OR email = ?) AND id != ?"
      )
      .get(dni, email, req.params.id);

    if (duplicate) {
      return res
        .status(409)
        .json({ error: "Otro paciente ya tiene este DNI o email" });
    }

    // Actualizar
    const stmt = db.prepare(
      "UPDATE pacientes SET nombre = ?, apellido = ?, dni = ?, email = ?, telefono = ? WHERE id = ?"
    );
    stmt.run(nombre, apellido, dni, email, telefono, req.params.id);

    const updated = db
      .prepare("SELECT * FROM pacientes WHERE id = ?")
      .get(req.params.id);

    res.json(updated);
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
