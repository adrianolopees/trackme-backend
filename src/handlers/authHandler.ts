import { Request, Response, NextFunction } from "express";
import { AuthController } from "../controllers/authController";
import { validateData } from "../utils/validateData";
import { registerSchema, loginSchema } from "../validators/profileValidator";
import { success } from "zod/v4";

export class AuthHandler {
  constructor(private authController: AuthController) {}

  /**
   * Handler HTTP para registro de usuário
   */
  register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // validação dos dados de entrada
      const validation = validateData(registerSchema, req.body);

      if (!validation.success) {
        res.status(400).json({
          success: false,
          message: "Dados inválidos",
          errors: validation.issues,
        });
        return;
      }
      const profile = await this.authController.register(validation.data);

      res.status(201).json({
        success: true,
        data: profile,
        message: "Usuário registrado com sucesso!",
      });
    } catch (error) {
      if (error instanceof Error) {
        if (
          error.message.includes("já existe") ||
          error.message.includes("credenciais inválidas")
        ) {
          res.status(400).json({
            success: false,
            message: error.message,
          });
          return;
        }
      }
      next(error);
    }
  };

  /**
   * Handler HTTP para login de usuário
   */
  login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // Validação dos dados de entrada
      const validation = validateData(loginSchema, req.body);

      if (!validation.success) {
        res.status(400).json({
          success: false,
          message: "Dados inválidos",
          errors: validation.issues,
        });
        return;
      }

      const profileAndToken = await this.authController.login(validation.data);

      res.status(200).json({
        success: true,
        data: profileAndToken,
        message: "Login realizado com sucesso!",
      });
    } catch (error) {
      // Trata erros de negócio como 400, outros como 500
      if (error instanceof Error) {
        // Erros conhecidos de validação de negócio
        if (
          error.message.includes("já existe") ||
          error.message.includes("Credenciais inválidas")
        ) {
          res.status(400).json({
            success: false,
            message: error.message,
          });
          return;
        }
      }

      // Outros erros vão para middleware global (500)
      next(error);
    }
  };
}
