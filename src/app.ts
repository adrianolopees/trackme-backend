import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import profileRoutes from "./routes/profileRoutes";
import followRoutes from "./routes/followRoutes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
// MIDDLEWARE DE DEBUG GLOBAL - adicione esta parte
app.use((req, res, next) => {
  console.log(`🔥 ${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

/* // Middleware de CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // URL do frontend
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Cabeçalhos permitidos
    credentials: true,
  })
); */
app.use(cors()); // Habilita CORS para todas as rotas

// Middleware para parsing JSON
app.use(express.json());

app.use("/api/auth", authRoutes); // Rotas de autenticação
app.use("/api/profile", profileRoutes); // Rotas de perfil
app.use("/api/follow", followRoutes); // Rotas de seguir/seguir

app.use(errorHandler);

export default app;
