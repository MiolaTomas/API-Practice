import db from "../db/database.js";

// GET /students
export function getAllStudents(req, res) {
  try {
    const stmt = db.prepare("SELECT * FROM estudiantes");
    const estudiantes = stmt.all();
    res.json(estudiantes);
  } catch (error) {
    console.error("❌ Error fetching students:", error);
    res.status(500).json({ error: "Error fetching students" });
  }
}
