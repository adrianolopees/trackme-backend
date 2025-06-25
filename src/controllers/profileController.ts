import { Response } from "express";
import { ProfileService } from "../services/profileService";
import {
  ProfilePublicAttributes,
  ProfileRegistrationAttributes,
  ProfileUpdateAttributes,
} from "../interfaces/Profile";
import { AuthenticatedRequest } from "../interfaces/AuthenticatedRequest";

const profileService = new ProfileService();

// GET /profile/my
export const getMyProfile = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const profile = await profileService.getMyProfile(req.user.id);

    if (!profile) {
      res.status(404).json({ message: "Perfil não encontrado!" });
      return;
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Perfil não encontrado!" });
  }
};

//PATH /profile/update
export const updateProfile = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const updates: ProfileUpdateAttributes = req.body;

    const updated = await profileService.updateProfile(req.user.id, updates);
    if (!updated) {
      res.status(404).json({ message: "Perfil não encontrado!" });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar perfil!" });
    return;
  }
};

export const deleteAvatarAndBio = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const result = await profileService.clearAvatarAndBio(req.user.id);
    if (!result) {
      res.status(404).json({ message: "Perfil não encontrado!" });
      return;
    }
    res.json({
      message: "Bio e avatar removidos com sucesso!",
      profile: result,
    });
  } catch (error) {
    res.status(500).json({ message: "Erro ao remover bio e avatar!" });
    return;
  }
};
