import express, { Request, Response } from "express";
import authenticateToken from "../middleware/authMiddleware";
import { register, login } from "../controllers/authController";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/perfil", authenticateToken, (req: Request, res: Response) => {
  // Rota protegida que retorna os dados do usuário autenticado);
  const user = (req as any).user; // O usuário foi adicionado ao req pelo middleware
  res.status(200).json({
    message: "Perfil acessado com sucesso!",
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
  });
});

export default router;
