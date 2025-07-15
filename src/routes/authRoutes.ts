import express from "express";
import { authController } from "../controllers/authController";

const router = express.Router();

// Rotas de autenticação
router.post("/register", authController.register);
router.get("/login", authController.login);

export default router;
