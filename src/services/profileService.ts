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
      data: toPublicProfile(profile),
      followersTotal,
      followingsTotal,
    };
  },

  async getProfilesNotFollowedBy(
    authProfileId: number,
    query: string,
    page: number,
    limit: number
  ) {
    const { count, rows } = await profileRepository.findProfilesNotFollowedBy(
      authProfileId,
      query,
      page,
      limit
    );

    const notFollowedProfiles = rows.map((profile: any) =>
      toPublicProfile(profile)
    );

    const totalCount = Array.isArray(count) ? count.length : count;
    return {
      profiles: notFollowedProfiles,
      total: totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    };
  },
};
