import { RequestHandler, Router } from "express";
import { getMyProfile } from "../controllers/profileController";

const router = Router();

router.get("/me", getMyProfile); // ✅ Aqui é a rota que você está tentando

export default router;
