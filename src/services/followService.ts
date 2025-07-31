import { createAppError } from "../middleware/errorHandler";
import { profileRepository } from "../repositories/profileRepository";
import { followRepository } from "../repositories/followRepository";

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
    return {
      newFollow: follow,
    };
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

    return {
      unfollowedProfileId: targetProfileId,
    };
  },
};
