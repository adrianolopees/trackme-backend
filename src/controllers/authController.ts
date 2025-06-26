import { Request, Response } from "express";
import { registerSchema, loginSchema } from "../validators/profileValidator";
import { AuthService } from "../services/authService";

export const register = async (req: Request, res: Response): Promise<void> => {
  const validation = registerSchema.safeParse(req.body);
  if (!validation.success) {
    res.status(400).json({
      message: "Dados inválidos",
      errors: validation.error.format(),
    });
    return;
  }
  const validatiedData = validation.data;
  try {
    const user = await AuthService.register(validatiedData);
    res.status(201).json({
      message: "Usuário registrado com sucesso!",
      user,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erro desconhecido";
    res.status(400).json({ message: msg });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const validation = loginSchema.safeParse(req.body);
  if (!validation.success) {
    res.status(400).json({
      message: "Dados inválidos!",
      errors: validation.error.format(),
    });
    return;
  }

  const { identifier, password } = req.body;

  try {
    const result = await AuthService.login(identifier, password);
    res.status(200).json({
      message: "Login bem-sucedido!",
      ...result,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erro no servidor";
    res.status(401).json({ message: msg });
  }
};
