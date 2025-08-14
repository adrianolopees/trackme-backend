import { PublicProfileResponse, SafeProfile } from "../schemas/profileSchemas";
import { ProfileUpdateData } from "../schemas/profileSchemas";
import { toPublicProfile, toSafeProfile } from "../utils";
import { profileRepository } from "../repositories/profileRepository";
import { followRepository } from "../repositories/followRepository";
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
    data: ProfileUpdateData
  ): Promise<SafeProfile> {
    await profileRepository.update(id, data);
    const updatedProfile = await profileRepository.findById(id);

    if (!updatedProfile) {
      throw createAppError("Perfil não encontrado após atualização", 404);
    }
    return toSafeProfile(updatedProfile);
  },

  async getProfileById(id: number): Promise<PublicProfileResponse> {
    const profile = await profileRepository.findById(id);
    if (!profile) {
      throw createAppError("Perfil não encontrado", 404);
    }

    const followersTotal = await followRepository.countFollowers(id);
    const followingsTotal = await followRepository.countFollowing(id);

    return {
      publicProfile: toPublicProfile(profile),
      followersTotal,
      followingsTotal,
    };
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
