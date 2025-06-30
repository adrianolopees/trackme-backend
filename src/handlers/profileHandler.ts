import { Request, Response, NextFunction } from "express";
import { ProfileController } from "../controllers/profileController";
import { validateData } from "../utils/validateData";
import { profileUpdateSchema } from "../validators/profileValidator";

export class ProfileHandler {
  constructor(private profileController: ProfileController) {}

  /**
   * Handler HTTP para buscar perfil
   */
  getMyProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const profileId = req.profile?.id;

      if (!profileId) {
        res.status(401).json({
          success: false,
          message: "Não autorizado",
        });
        return;
      }

      const profile = await this.profileController.getMyProfile(profileId);

      res.status(200).json({
        success: true,
        data: profile,
        message: "Perfil recuperado com sucesso",
      });
    } catch (error) {
      // Delega tratamento de erro para middleware global
      next(error);
    }
  };

  /**
   * Handler HTTP para atualizar perfil
   */
  updateMyProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const profileId = req.profile?.id;

      if (!profileId) {
        res.status(401).json({
          success: false,
          message: "Não autorizado",
        });
        return;
      }

      // Validação dos dados de entrada
      const validationResult = validateData(profileUpdateSchema, req.body);

      if (!validationResult.success) {
        res.status(400).json({
          success: false,
          message: "Dados inválidos",
          errors: validationResult.issues,
        });
        return;
      }

      const updatedProfile = await this.profileController.updateMyProfile(
        profileId,
        validationResult.data
      );

      res.status(200).json({
        success: true,
        data: updatedProfile,
        message: "Perfil atualizado com sucesso",
      });
    } catch (error) {
      next(error);
    }
  };
}
