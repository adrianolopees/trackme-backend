import { Router } from "express";
import { followController } from "../controllers/followController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// ROTA DE TESTE
router.get("/test", (req, res) => {
  console.log("🎯 ROTA DE TESTE FUNCIONOU!");
  res.json({ message: "Follow routes funcionando!" });
});

// DEBUG - adicione este middleware para todas as rotas
router.use((req, res, next) => {
  console.log("🔥 FOLLOW ROUTE MIDDLEWARE:", req.method, req.url, req.params);
  next();
});

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
