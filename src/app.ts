import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import profileRoutes from "./routes/profileRoutes";

const app = express();

// Middleware de CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3333",
    credentials: true,
  })
);

// Middleware para parsing JSON
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

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
