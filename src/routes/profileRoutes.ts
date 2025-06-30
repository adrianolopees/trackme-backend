import express from "express";
import { profileController } from "../controllers/profileController";
import { ProfileHandler } from "../handlers/profileHandler";
import { authMiddleware } from "../middleware/authMiddleware"; // Assumindo que você tem esse middleware

const router = express.Router();

// Instância do ProfileHandler com o ProfileController
const profileHandler = new ProfileHandler(profileController);

// Todas as rotas de perfil precisam de autenticação
router.use(authMiddleware);

// Rotas de perfil
router.get("/me", profileHandler.getMyProfile); // GET /profile/me
router.patch("/me", profileHandler.updateMyProfile); // PATCH/profile/me

export default router;
