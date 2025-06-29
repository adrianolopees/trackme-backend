import { Router } from "express";
import {
  getMyProfile,
  updateMyProfile,
} from "../controllers/profileController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// GET /profile/me
router.get("/me", authMiddleware, getMyProfile);
// PUT /profile/me
router.patch("/me", authMiddleware, updateMyProfile);

export default router;
