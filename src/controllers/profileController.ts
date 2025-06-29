import { Request, Response } from "express";
import { ProfileService } from "../services/profileService";

export const getMyProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const profileId = req.profile?.id; // middleware autenticou e colocou profile no req

    if (!profileId) {
      res.status(401).json({ message: "Não autorizado" });
      return;
    }

    const safeProfile = await ProfileService.getProfileById(profileId);
    if (!safeProfile) {
      res.status(404).json({ message: "Perfil não encontrado" });
      return;
    }
    // Removendo a senha do perfil antes de enviar a resposta
    // Retornando sem senha

    res.status(200).json(safeProfile);
    return;
  } catch (error) {
    console.error("Erro ao buscar perfil:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
    return;
  }
};

export const updateMyProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const profileId = req.profile?.id; // middleware autenticou e colocou profile no req

    if (!profileId) {
      res.status(401).json({ message: "Não autorizado" });
      return;
    }

    const updatedProfile = await ProfileService.updateProfile(
      profileId,
      req.body
    );

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};
