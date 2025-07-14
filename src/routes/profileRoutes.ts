import express from "express";
import { profileController } from "../controllers/profileController";
import { authMiddleware } from "../middleware/authMiddleware";
import { upload } from "../middleware/multerConfig";

const router = express.Router();

// Rotas de perfil
router.get("/me", authMiddleware, profileController.getMyProfile);
router.put(
  "/me",
  authMiddleware,
  upload.single("avatar"),
  profileController.updateMyProfile
);

export default router;
