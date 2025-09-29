import db from "../db/database.js";

// GET /students
export function getEstudiantes(req, res) {
  try {
    const stmt = db.prepare("SELECT * FROM estudiantes");
    const estudiantes = stmt.all();
    res.json(estudiantes);
  } catch (error) {
    console.error("❌ Error fetching estudiantes:", error);
    res.status(500).json({ error: "Error fetching students" });
  }
}

export function crearEstudiante(req, res) {
  try {
    const { name, age } = req.body;
    if (!name || !age) {
      return res.status(400).json({ error: "Name and age are required" });
    }
    const stmt = db.prepare(
      "INSERT INTO estudiantes (name, age) VALUES (?, ?)"
    );
    const info = stmt.run(name, age);
    res.status(201).json({ id: info.lastInsertRowid, name, age });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
}
