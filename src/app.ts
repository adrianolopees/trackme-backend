import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import profilesRoutes from "./routes/profilesRoutes";
import followRoutes from "./routes/followRoutes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

// Middleware de CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // URL do frontend
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Cabeçalhos permitidos
    credentials: true,
  })
);

// Middleware para parsing JSON
app.use(express.json());

app.use("/api/auth", authRoutes); // Rotas de autenticação
app.use("/api/profiles", profilesRoutes); // Rotas de perfil
app.use("/api/profiles", followRoutes); // Rotas de seguir/seguir

app.use(errorHandler);

export default app;
