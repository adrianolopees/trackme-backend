import { Router } from "express";
import {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
} from "../controllers/profileController";

const router = Router();

// Rota para criar um perfil
router.post("/", createProfile);

// Rota para obter um perfil por ID
router.get("/:profileId", getProfile);

// Rota para atualizar um perfil por ID
router.put("/:profileId", updateProfile);

// Rota para deletar um perfil por ID
router.delete("/:profileId", deleteProfile);

export default router;
