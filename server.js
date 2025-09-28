import express from "express";
import db from "./db/database.js";
//Aca no entendia como se ejecutaba el codigo de database.js, resulta que una vez que importas algo usando js modules node ejecuta todo el archivo, de arriba a abajo una sola vez y despues devuelve lo que exporta el archivo
import studentsRoutes from "./routes/estudiantes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => res.send("API running"));

//Rutas
app.use("/estudiantes", studentsRoutes);

const students = db.prepare("SELECT * FROM estudiantes").all();
console.log("All students in DB:", students);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
