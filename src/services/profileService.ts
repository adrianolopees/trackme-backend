import { Profile } from "../models/Profile";
import {
  ProfilePublicAttributes,
  ProfileUpdateAttributes,
} from "../interfaces/Profile";

export class ProfileService {
  // Obter perfil completo do usuário logado
  async getMyProfile(
    profileId: number
  ): Promise<ProfilePublicAttributes | null> {
    const profile = await Profile.findByPk(profileId, {
      attributes: { exclude: ["password"] },
    });
    if (!profile) throw new Error("Perfil não encontrado!");

    return profile?.toJSON() as ProfilePublicAttributes | null;
  }

  // Atualizar perfil do usuário logado
  async updateProfile(
    profileId: number,
    updates: ProfileUpdateAttributes
  ): Promise<ProfilePublicAttributes | null> {
    const profile = await Profile.findByPk(profileId);
    if (!profile) throw new Error("Perfil não encontrado!");

    // Atualiza os campos do perfil
    const updatedProfile = await profile.update(updates);

    return updatedProfile.toJSON() as ProfilePublicAttributes | null;
  }

  // Remover bio e avatar do perfil (seta como null)
  async clearAvatarAndBio(
    profileId: number
  ): Promise<ProfilePublicAttributes | null> {
    const profile = await Profile.findByPk(profileId);
    if (!profile) throw new Error("Perfil não encontrado!");

    // Limpa os campos bio e avatar
    const updatedProfile = await profile.update({
      bio: undefined,
      avatar: undefined,
    });

    return updatedProfile.toJSON() as ProfilePublicAttributes | null;
  }
}
