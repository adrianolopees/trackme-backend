import { createAppError } from "../middleware/errorHandler";
import { profileRepository } from "../repositories/profileRepository";
import { followRepository } from "../repositories/followRepository";
import { toSafeProfile } from "../utils/toSafeProfile";
import { PaginatedList } from "../schemas/followSchemas";

export const followService = {
  async follow(currentProfileId: number, targetProfileId: number) {
    if (currentProfileId === targetProfileId) {
      throw createAppError("Você não pode seguir a si mesmo", 400);
    }

    const targetProfile = await profileRepository.findById(targetProfileId);
    if (!targetProfile) {
      throw createAppError("Perfil não encontrado", 404);
    }

    const existingFollow = await followRepository.isFollowing(
      currentProfileId,
      targetProfileId
    );
    if (existingFollow) {
      throw createAppError("Você já segue esse perfil", 400);
    }

    const follow = await followRepository.createFollow(
      currentProfileId,
      targetProfileId
    );
    return follow;
  },

  async unfollow(currentProfileId: number, targetProfileId: number) {
    if (currentProfileId === targetProfileId) {
      throw createAppError("Você não pode deixar de seguir a si mesmo", 400);
    }

    const existingFollow = await followRepository.isFollowing(
      currentProfileId,
      targetProfileId
    );
    if (!existingFollow) {
      throw createAppError("Você não está seguindo esse perfil", 404);
    }

    const deletedCount = await followRepository.unfollow(
      currentProfileId,
      targetProfileId
    );
    if (deletedCount === 0) {
      throw createAppError("Erro ao deixar de seguir o perfil", 500);
    }

    return targetProfileId;
  },

  async getFollowers(
    profileId: number,
    page: number,
    limit: number
  ): Promise<PaginatedList> {
    const profile = await profileRepository.findById(profileId);
    if (!profile) {
      throw createAppError("Perfil não encontrado", 404);
    }

    const { followers, total, totalPages, currentPage } =
      await followRepository.getFollowers(profileId, page, limit);

    return {
      followers: followers.map(toSafeProfile),
      total,
      totalPages,
      currentPage,
    };
  },

  async getFollowing(
    profileId: number,
    page: number,
    limit: number
  ): Promise<PaginatedList> {
    const profile = await profileRepository.findById(profileId);
    if (!profile) {
      throw createAppError("Perfil não encontrado", 404);
    }

    const { following, total, totalPages, currentPage } =
      await followRepository.getFollowing(profileId, page, limit);

    return {
      following: following.map(toSafeProfile),
      total,
      totalPages,
      currentPage,
    };
  },

  async getFollowersCount(profileId: number): Promise<number> {
    const profile = await profileRepository.findById(profileId);
    if (!profile) {
      throw createAppError("Perfil não encontrado", 404);
    }
    return await followRepository.countFollowers(profileId);
  },

  async getFollowingCount(profileId: number): Promise<number> {
    const profile = await profileRepository.findById(profileId);
    if (!profile) {
      throw createAppError("Perfil não encontrado", 404);
    }
    return await followRepository.countFollowing(profileId);
  },
};
