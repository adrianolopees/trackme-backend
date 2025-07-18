import { SafeProfile } from "../schemas/profileSchemas";
import { profileRepository } from "../repositories/profileRepository";
import { toSafeProfile } from "../utils/toSafeProfile";
import { UpdateProfileInput } from "../types/profileTypes";
import { createAppError } from "../middleware/errorHandler";

export const profileService = {
  async getProfile(id: number): Promise<SafeProfile> {
    const profile = await profileRepository.findById(id);
    if (!profile) {
      throw createAppError("Perfil não encontrado", 404);
    }
    return toSafeProfile(profile);
  },

  async updateProfile(
    id: number,
    data: UpdateProfileInput
  ): Promise<SafeProfile> {
    await profileRepository.update(id, data);
    const updatedProfile = await profileRepository.findById(id);

    if (!updatedProfile) {
      throw createAppError("Perfil não encontrado após atualização", 404);
    }
    return toSafeProfile(updatedProfile);
  },
};
