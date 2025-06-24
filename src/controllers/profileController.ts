import { Request, Response } from "express";
import { ProfileService } from "../services/profileService";

const profileService = new ProfileService();

export const getMyProfile = async (req: any, res: Response): Promise<void> => {
  try {
    const userId = req.user.id;
    const profile = await profileService.getMyProfile(userId);

    res.json({
      message: "Perfil obtido com sucesso",
      profile,
    });
  } catch (error) {
    res.status(404).json({ message: "Perfil não encontrado!" });
  }
};
