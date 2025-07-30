import { Router } from "express";
import { followController } from "../controllers/followController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// Rotas específicas PRIMEIRO
router.get(
  "/:profileId/followers",
  authMiddleware,
  followController.getFollowers
);
router.get(
  "/:profileId/following",
  authMiddleware,
  followController.getFollowing
);

// Rotas de ação DEPOIS
router.post(
  "/:profileId",
  (req, res, next) => {
    console.log("🚀 POST /:profileId ROUTE CHAMADA");
    console.log("Params:", req.params);
    console.log(
      "Headers:",
      req.headers.authorization?.substring(0, 30) + "..."
    );
    next();
  },
  authMiddleware,
  followController.followProfile
);

router.delete("/:profileId", authMiddleware, followController.unfollowProfile);

export default router;
