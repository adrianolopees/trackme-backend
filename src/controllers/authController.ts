import { authService } from "../services/authService";
import { Request, Response, NextFunction } from "express";
import { validateData } from "../utils/validateData";
import { RegisterSchema, LoginSchema } from "../schemas/authSchemas";

export const authController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const validation = validateData(RegisterSchema, req.body);
      if (!validation.success) {
        res.status(400).json({
          success: false,
          message: "Dados inválidos",
          errors: validation.issues,
        });
        return;
      }
      const profile = await authService.register(validation.data);
      res.status(201).json({
        success: true,
        data: profile,
        message: "Usuário registrado com sucesso!",
      });
    } catch (error) {
      next(error);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const validation = validateData(LoginSchema, req.body);
      if (!validation.success) {
        res.status(400).json({
          success: false,
          message: "Dados inválidos",
          errors: validation.issues,
        });
        return;
      }

      const profile = await authService.login(validation.data);
      res.status(200).json({
        success: true,
        data: profile,
        message: "Login realizado com sucesso!",
      });
    } catch (error) {
      next(error);
    }
  },
};
