import { SafeProfile, ProfileData } from "../schemas/profileSchemas";
import { profileRepository } from "../repositories/profileRepository";
import { toSafeProfile } from "../utils/toSafeProfile";
import { ProfileUpdateData } from "../schemas/profileSchemas";
import { createAppError } from "../middleware/errorHandler";
import { followRepository } from "../repositories/followRepository";

export const profileService = {
  async getProfile(id: number): Promise<ProfileData> {
    const profile = await profileRepository.findById(id);
    if (!profile) {
      throw createAppError("Perfil não encontrado", 404);
    }
    const safeProfile = toSafeProfile(profile);
    return {
      profile: safeProfile,
    };
  },

  async updateProfile(
    id: number,
    data: ProfileUpdateData
  ): Promise<SafeProfile> {
    await profileRepository.update(id, data);
    const updatedProfile = await profileRepository.findById(id);

    if (!updatedProfile) {
      throw createAppError("Perfil não encontrado após atualização", 404);
    }
    return toSafeProfile(updatedProfile);
  },

  async searchProfiles(query: string, currentProfileId: number) {
    const profiles = await profileRepository.searchByQueryExcludeProfile(
      query,
      currentProfileId
    );

    const followingsIds = await followRepository.getFollowingIds(
      currentProfileId
    );
    const followingSet = new Set(followingsIds);

    // Monta o resultado com a flag `isFollowing`
    return profiles.map((profile) => ({
      id: profile.id,
      username: profile.username,
      avatar: profile.avatar,
      isFollowing: followingSet.has(profile.id),
    }));
  },
};
