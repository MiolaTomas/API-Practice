// db.js
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

// Configurar la ruta de la base de datos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Aquí se crea (o abre) la base de datos SQLite
const db = new Database(path.join(__dirname, "turnos.db"), {
  verbose: console.log,
});

// --- Crear tablas si no existen ---
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS pacientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL,
    dni TEXT UNIQUE,
    email TEXT,
    telefono TEXT
  )
`
).run();

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS doctores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL,
    especialidad TEXT,
    email TEXT,
    telefono TEXT
  )
`
).run();

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS turnos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    paciente_id INTEGER NOT NULL,
    doctor_id INTEGER NOT NULL,
    fecha_hora TEXT NOT NULL,
    estado TEXT DEFAULT 'pendiente',
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id),
    FOREIGN KEY (doctor_id) REFERENCES doctores(id)
  )
`
).run();

// Exportamos la instancia de la DB para usarla en otros archivos
export default db;
