import express from "express";
import { ProfileHandler } from "../handlers/profileHandler";
import { profileController } from "../controllers/profileController";
import { authMiddleware } from "../middleware/authMiddleware";
import { upload } from "../middleware/multerConfig";

const router = express.Router();

// Instância do ProfileHandler com o ProfileController
const profileHandler = new ProfileHandler(profileController);

// Rotas de perfil
router.get("/me", authMiddleware, profileHandler.getMyProfile);
router.put(
  "/me",
  authMiddleware,
  upload.single("avatar"),
  profileHandler.updateMyProfile
);

export default router;
