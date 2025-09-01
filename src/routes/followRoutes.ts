import express from "express";
import { followController } from "../controllers/followController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();
router.use(authMiddleware);

// Rotas de consulta ANTES
router.get("/:profileId/followers", followController.getFollowers);
router.get("/:profileId/following", followController.getFollowing);

router.get("/:profileId/followers-count", followController.getFollowersCount);
router.get("/:profileId/following-count", followController.getFollowingCount);

// Rotas de ação DEPOIS
router.post("/:profileId/follow", followController.followProfile);
router.delete("/:profileId/follow", followController.unfollowProfile);

export default router;
