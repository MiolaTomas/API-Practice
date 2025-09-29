import express from "express";
import db from "./db/database.js";
import studentsRoutes from "./routes/estudiantes.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON request bodies
app.use(express.json());

// Load Swagger YAML
const swaggerDocument = YAML.load("./swagger.yaml");

// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Test route
app.get("/", (req, res) => res.send("API running"));

// Register student routes
app.use("/estudiantes", studentsRoutes);

// Debug: print all students on startup
const students = db.prepare("SELECT * FROM estudiantes").all();
console.log("All students in DB:", students);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
