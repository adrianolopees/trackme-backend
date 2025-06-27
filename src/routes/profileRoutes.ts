import { Router } from "express";
import { getMyProfile } from "../controllers/profileController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// GET /profile/me
router.get("/me", authMiddleware, getMyProfile);

export default router;
