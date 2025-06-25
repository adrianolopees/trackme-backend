import { Response } from "express";
import { ProfileService } from "../services/profileService";
import { ProfilePublicAttributes } from "../interfaces/Profile";
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
