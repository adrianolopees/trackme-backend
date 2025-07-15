import { Request, Response, NextFunction } from "express";
import { profileService } from "../services/profileService";
import { ProfileUpdateSchema } from "../schemas/profileSchemas";
import { validateData } from "../utils/validateData";
import { UpdateProfileInput } from "../types/profileTypes";

export const profileController = {
  async getMyProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const profileId = req.profile?.id;
      if (!profileId) {
        res.status(401).json({
          success: false,

          message: "Não autorizado",
        });
        return;
      }

      const profile = await profileService.getProfile(profileId);
      res.status(200).json({
        success: true,
        data: profile,
        message: "Perfil recuperado com sucesso",
      });
    } catch (error) {
      next(error);
    }
  },

  async updateMyProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const profileId = req.profile?.id;
      if (!profileId) {
        res.status(401).json({ success: false, message: "Não autorizado" });
        return;
      }

      const avatarBuffer = req.file?.buffer;
      const { bio } = req.body;

      // Validação com Zod
      const validation = validateData(ProfileUpdateSchema, { bio });
      if (!validation.success) {
        res.status(400).json({
          success: false,
          message: "Dados inválidos",
          errors: validation.issues,
        });
        return;
      }

      const updateData: UpdateProfileInput = {
        ...validation.data,
        ...(avatarBuffer ? { avatar: avatarBuffer } : {}),
      };

      const updatedProfile = await profileService.updateProfile(
        profileId,
        updateData
      );

      res.status(200).json({
        success: true,
        data: updatedProfile,
        message: "Perfil atualizado com sucesso",
      });
    } catch (error) {
      next(error);
    }
  },
};
