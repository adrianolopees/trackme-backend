import { Router } from "express";
import {
  getMyProfile,
  updateProfile,
  deleteAvatarAndBio,
} from "../controllers/profileController";

const router = Router();

// GET /profile/me
router.get("/me", getMyProfile);

// PATCH /profile/update
router.patch("/update", updateProfile);

// DELETE /profile/avatar-bio
router.delete("/avatar-bio", deleteAvatarAndBio);

export default router;
