// controllers/profileController.ts
import { ProfileService } from "../services/profileService";
import { ProfileUpdateData } from "../validators/profileValidator";

export class ProfileController {
  constructor(private profileService: ProfileService) {}

  /**
   * Busca perfil do usuário autenticado
   * @param profileId - ID do perfil extraído do token JWT
   * @returns Promise<Profile> - Perfil sem senha
   */
  async getMyProfile(profileId: number) {
    const profile = await this.profileService.getProfileById(profileId);

    if (!profile) {
      throw new Error("Perfil não encontrado");
    }

    return profile;
  }

  /**
   * Atualiza perfil do usuário autenticado
   * @param profileId - ID do perfil extraído do token JWT
   * @param updateData - Dados validados para atualização
   * @returns Promise<Profile> - Perfil atualizado sem senha
   */
  async updateMyProfile(profileId: number, updateData: ProfileUpdateData) {
    const updatedProfile = await this.profileService.updateProfile(
      profileId,
      updateData
    );

    return updatedProfile;
  }
}

// Instância única para uso nas rotas
export const profileController = new ProfileController(new ProfileService());
