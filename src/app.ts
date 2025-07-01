import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import profileRoutes from "./routes/profileRoutes";

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
app.use("/api/profile", profileRoutes); // Rotas de perfil

// Error handler
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("❌ Error:", err);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
);

export default app;
