import express from "express";
import db from "./db/database.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import pacientesRoutes from "./routes/pacientes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON request bodies
app.use(express.json());
app.use("/pacientes", pacientesRoutes);

// Load Swagger YAML
const swaggerDocument = YAML.load("./swagger.yaml");

// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Test route
app.get("/", (req, res) => res.send("API running"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
