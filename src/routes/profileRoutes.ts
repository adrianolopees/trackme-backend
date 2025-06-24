import { Router } from "express";
import authenticateToken from "../middleware/authMiddleware";
import { getMyProfile } from "../controllers/profileController";

const router = Router();

router.get("/me", authenticateToken, getMyProfile); // ✅ Aqui é a rota que você está tentando

export default router;
