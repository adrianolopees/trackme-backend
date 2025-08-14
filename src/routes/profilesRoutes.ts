import express from "express";
import { profileController } from "../controllers/profileController";
import { authMiddleware } from "../middleware/authMiddleware";
import { upload } from "../middleware/multerConfig";

const router = express.Router();

router.get("/me", authMiddleware, profileController.getMyProfile);
router.put(
  "/me",
  authMiddleware,
  upload.single("avatar"),
  profileController.updateMyProfile
);
router.get("/:id", profileController.getProfileById as any);

router.get("/search", authMiddleware, profileController.searchProfiles);

export default router;
