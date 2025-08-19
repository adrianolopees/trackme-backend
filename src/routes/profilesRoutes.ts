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
router.get(
  "/not-followed",
  authMiddleware,
  profileController.findNotFollowed as any
);
router.get("/:id", profileController.getProfileById as any);

export default router;
