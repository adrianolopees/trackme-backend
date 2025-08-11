import express from "express";
import { followController } from "../controllers/followController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get(
  "/:profileId/followers",
  authMiddleware,
  followController.getFollowers
);
router.get(
  "/:profileId/following",
  authMiddleware,
  followController.getFollowings
);

router.get(
  "/:profileId/followers-count",
  authMiddleware,
  followController.getFollowersCount
);
router.get(
  "/:profileId/following-count",
  authMiddleware,
  followController.getFollowingCount
);

// Rotas de ação DEPOIS
router.post("/:profileId", authMiddleware, followController.followProfile);

router.delete("/:profileId", authMiddleware, followController.unfollowProfile);

export default router;
