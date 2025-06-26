import { Response, Request } from "express";
import { ProfileService } from "../services/profileService";
import { profileUpdateSchema } from "../validators/profileValidator";

const profileService = new ProfileService();

const profileId = 1; // Exemplo de ID de perfil, deve ser substituído pela lógica real

// GET /profile/my
export const getMyProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const profile = await profileService.getMyProfile(profileId);

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
  req: Request,
  res: Response
): Promise<void> => {
  const validation = profileUpdateSchema.safeParse(req.body);
  if (!validation.success) {
    res.status(400).json({
      message: "Dados inválidos!",
      errors: validation.error.format(),
    });
    return;
  }
  const updates = validation.data;

  try {
    const updated = await profileService.updateProfile(profileId, updates);
    if (!updated) {
      res.status(404).json({ message: "Perfil não encontrado!" });
      return;
    }

    res.json({ message: "Perfil atualizado comj sucesso!", profile: updated });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar perfil!" });
    return;
  }
};

export const deleteAvatarAndBio = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await profileService.clearAvatarAndBio(profileId);
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
