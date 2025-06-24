import { Request, Response } from "express";
import { ProfileService } from "../services/profileService";

const profileService = new ProfileService();

export const getMyProfile = async (req: any, res: Response) => {
  try {
    const profile = await profileService.getMyProfile(req.user.id);
    res.json({ profile });
  } catch (error) {
    res.status(404).json({ message: "Perfil não encontrado!" });
  }
};
