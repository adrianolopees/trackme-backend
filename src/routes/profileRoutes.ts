// routes/profileRoutes.ts
import { Router } from "express";
import { ProfileHandler } from "../handlers/profileHandler";
import { profileController } from "../controllers/profileController";
import { authMiddleware } from "../middleware/authMiddleware";

// Instância do handler
const profileHandler = new ProfileHandler(profileController);

const router = Router();

// GET /profile/me - Buscar meu perfil
router.get("/me", authMiddleware, profileHandler.getMyProfile);

// PATCH /profile/me - Atualizar meu perfil
router.patch("/me", authMiddleware, profileHandler.updateMyProfile);

export default router;
