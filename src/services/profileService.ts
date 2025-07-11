// services/profileService.ts
import { Profile } from "../models/Profile";
import { ProfileUpdateData } from "../validators/profileValidator";

export class ProfileService {
  /**
   * Busca perfil por ID
   * @param id - ID do perfil
   * @returns Promise<Profile | null> - Perfil sem senha ou null se não encontrado
   */
  async getProfileById(id: number) {
    const profile = await Profile.findByPk(id);

    if (!profile) {
      return null; // Retorna null ao invés de throw - deixa controller decidir
    }

    const { password, ...safeProfile } = profile.get();
    return safeProfile;
  }

  /**
   * Atualiza perfil
   * @param id - ID do perfil
   * @param data - Dados já validados para atualização
   * @returns Promise<Profile> - Perfil atualizado sem senha
   */
  async updateProfile(id: number, data: ProfileUpdateData) {
    const profile = await Profile.findByPk(id);

    if (!profile) {
      throw new Error("Perfil não encontrado");
    }

    const updatedProfile = await profile.update(data);
    const { password, ...safeProfile } = updatedProfile.toJSON();

    return safeProfile;
  }

  /**
   * Verifica se perfil existe
   * @param id - ID do perfil
   * @returns Promise<boolean>
   */
  async profileExists(id: number): Promise<boolean> {
    const profile = await Profile.findByPk(id, {
      attributes: ["id"], // Só busca ID para performance
    });
    return !!profile;
  }
}
