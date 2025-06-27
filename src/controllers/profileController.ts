import { Request, Response } from "express";
import { ProfileService } from "../services/profileService";

export const getMyProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const profileId = (req as any).user?.id; // middleware autenticou e colocou user no req

    if (!profileId) {
      res.status(401).json({ message: "Não autorizado" });
      return;
    }

    const profile = await ProfileService.getProfileById(profileId);
    if (!profile) {
      res.status(404).json({ message: "Perfil não encontrado" });
      return;
    }

    // Retornando sem senha
    const { password, ...profileWithoutPassword } = profile.toJSON();

    res.status(200).json(profileWithoutPassword);
    return;
  } catch (error) {
    console.error("Erro ao buscar perfil:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
    return;
  }
};
