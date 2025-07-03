import express from "express";
import { profileController } from "../controllers/profileController";
import { ProfileHandler } from "../handlers/profileHandler";
import { authMiddleware } from "../middleware/authMiddleware"; // Assumindo que você tem esse middleware
import { upload } from "../middleware/multerConfig";

const router = express.Router();

// Instância do ProfileHandler com o ProfileController
const profileHandler = new ProfileHandler(profileController);

// Todas as rotas de perfil precisam de autenticação
router.use(authMiddleware);

// Rotas de perfil
router.get("/me", profileHandler.getMyProfile); // GET /profile/me
router.put("/me", upload.single("avatar"), profileHandler.updateMyProfile); // PATCH/profile/me

export default router;
