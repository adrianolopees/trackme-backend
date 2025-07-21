import { Request, Response, NextFunction } from "express";
import { profileService } from "../services/profileService";
import { ProfileUpdateSchema } from "../schemas/profileSchemas";
import { validateData } from "../utils/validateData";
import { UpdateProfileInput } from "../types/profileTypes";
import sharp from "sharp";

export const profileController = {
  async getMyProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const profileId = req.profile?.id;
      if (!profileId) {
        res.status(401).json({ success: false, message: "Não autorizado" });
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

  async updateMyProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const profileId = req.profile?.id;
      if (!profileId) {
        res.status(401).json({ success: false, message: "Não autorizado" });
        return;
      }

      const { bio, profileSetupDone } = req.body;
      const validation = validateData(ProfileUpdateSchema, { bio });
      if (!validation.success) {
        res.status(400).json({
          success: false,
          message: "Dados inválidos",
          errors: validation.issues,
        });
        return;
      }

      // Inicializa processedBuffer como undefined
      let processedBuffer: Buffer | undefined;

      // Processa a imagem se existir
      if (req.file?.buffer) {
        try {
          processedBuffer = await sharp(req.file.buffer)
            .rotate()
            .resize(256, 256, {
              fit: "cover", // Mantém proporção e corta se necessário
              position: "center",
            })
            .jpeg({
              quality: 80,
              progressive: true,
            })
            .toBuffer();
        } catch (imageError) {
          console.error("❌ Erro ao processar imagem:", imageError);
          res.status(400).json({
            success: false,
            message: "Erro ao processar imagem",
          });
          return;
        }
      }

      const updateData: UpdateProfileInput = {
        ...validation.data,
        ...(processedBuffer ? { avatar: processedBuffer } : {}),
      };
      if (profileSetupDone !== undefined) {
        updateData.profileSetupDone = profileSetupDone === "true";
      }
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
