import { authService } from "../services/authService";
import { Request, Response, NextFunction } from "express";
import { validateData } from "../utils/validateData";
import { RegisterSchema, LoginSchema } from "../schemas/authSchemas";
import { sendCreated, sendSuccess, sendError } from "../utils/responseHelper";

export const authController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const validation = validateData(RegisterSchema, req.body);
      if (!validation.success) {
        sendError(res, "Dados inválidos", 400, validation.issues);
        return;
      }
      const profile = await authService.register(validation.data);
      sendCreated(res, profile, "Usuário registrado com sucesso!");
    } catch (error) {
      next(error);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const validation = validateData(LoginSchema, req.body);
      if (!validation.success) {
        sendError(res, "Dados inválidos", 400, validation.issues);
        return;
      }

      const token = await authService.login(validation.data);
      sendSuccess(res, token, "Login realizado com sucesso!");
    } catch (error) {
      next(error);
    }
  },
};
