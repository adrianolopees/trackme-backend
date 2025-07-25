import { Follow } from "../models/Follow";

export const followRepository = {
  async isFollowing(followerId: number, followingId: number): Promise<boolean> {
    const existing = await Follow.findOne({
      where: {
        followerProfileId: followerId,
        followingProfileId: followingId,
      },
    });

    return !!existing; // retorna true se existir, false se não
  },

  // Cria um novo follow
  async createFollow(followerId: number, followingId: number): Promise<Follow> {
    const follow = await Follow.create({
      followerProfileId: followerId,
      followingProfileId: followingId,
      followedAt: new Date(), // opcional, pois já tem defaultValue
    });

    return follow;
  },

  async unfollow(followerId: number, profileId: number): Promise<number> {
    const deletedCount = await Follow.destroy({
      where: {
        followerProfileId: followerId,
        followingProfileId: profileId,
      },
    });

    return deletedCount; // retorna o número de registros excluídos (0 ou 1)
  },
};
