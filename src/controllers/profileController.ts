import { Request, Response, NextFunction } from "express";
import { profileService } from "../services/profileService";
import { validateData } from "../utils/validateData";
import { imageProcessor } from "../utils/imageProcessor";
import {
  ProfileUpdateSchema,
  ProfileUpdateData,
  IdParamsSchema,
} from "../schemas/profileSchemas";
import { PaginationQuerySchema } from "../schemas/followSchemas";
import { sendError, sendSuccess } from "../utils/responseHelper";

export const profileController = {
  async getMyProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const profileId = req.profile.id;
      const profile = await profileService.getProfile(profileId);
      sendSuccess(res, profile, "Perfil recuperado com sucesso");
    } catch (error) {
      next(error);
    }
  },

  async updateMyProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const profileId = req.profile.id;
      const { bio, profileSetupDone } = req.body;
      const validation = validateData(ProfileUpdateSchema, { bio });
      if (!validation.success) {
        sendError(res, "Dados inválidos", 400, validation.issues);
        return;
      }

      let processedBuffer: Buffer | undefined;
      if (req.file?.buffer) {
        try {
          const isValidImage = await imageProcessor.validateImage(
            req.file.buffer
          );
          if (!isValidImage) {
            sendError(res, "Arquivo de imagem inválido", 400);
            return;
          }

          processedBuffer = await imageProcessor.processAvatar(req.file.buffer);
        } catch (imageError) {
          sendError(res, "Erro ao processar a imagem", 500);
          return;
        }
      }

      const updateData: ProfileUpdateData = {
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
      sendSuccess(res, updatedProfile, "Perfil atualizado com sucesso");
    } catch (error) {
      next(error);
    }
  },

  async getPublicProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const validation = validateData(IdParamsSchema, req.params);
      if (!validation.success) {
        sendError(res, "ID inválido", 400, validation.issues);
        return;
      }

      const id = validation.data.id;
      const publicProfile = await profileService.getProfileById(id);
      sendSuccess(res, publicProfile, "Perfil recuperado com sucesso");
    } catch (error) {
      next(error);
    }
  },

  // ainda implementar essa funcionalidade
  async findNotFollowed(req: Request, res: Response, next: NextFunction) {
    try {
      const profileId = req.profile.id;
      const queryValidation = validateData(PaginationQuerySchema, req.query);
      if (!queryValidation.success) {
        sendError(
          res,
          "Parâmetros de consulta inválidos",
          400,
          queryValidation.issues
        );
        return;
      }

      const { query = "", page, limit } = queryValidation.data;

      const data = await profileService.getProfilesNotFollowedBy(
        profileId,
        query,
        page,
        limit
      );
      sendSuccess(res, data, "Perfis recuperados com sucesso");
    } catch (error) {
      next(error);
    }
  },
};
