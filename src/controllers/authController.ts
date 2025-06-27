import { Request, Response } from "express";
import { registerSchema, loginSchema } from "../validators/profileValidator";
import { validateData } from "../utils/validateData";
import { AuthService } from "../services/authService";

export const register = async (req: Request, res: Response): Promise<void> => {
  const validation = validateData(registerSchema, req.body);
  if (!validation.success) {
    res.status(400).json({
      message: validation.error,
      errors: validation.issues,
    });
    return;
  }
  const validData = validation.data;
  try {
    const user = await AuthService.register(validData);
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
  const validation = validateData(loginSchema, req.body);
  if (!validation.success) {
    res.status(400).json({
      message: validation.error,
      errors: validation.issues,
    });
    return;
  }

  const loginData = validation.data;

  try {
    const result = await AuthService.login(loginData);
    res.status(200).json({
      message: "Login bem-sucedido!",
      ...result,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erro no servidor";
    res.status(401).json({ message: msg });
  }
};
