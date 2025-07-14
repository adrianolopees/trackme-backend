import express from "express";
import { authController } from "../controllers/authController";
import { AuthHandler } from "../handlers/authHandler";

const router = express.Router();

// Instância do AuthHandler com o AuthController
const authHandler = new AuthHandler(authController);

// Rotas de autenticação
router.post("/register", authHandler.register);
router.get("/login", authHandler.login);

export default router;
