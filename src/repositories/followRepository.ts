import { Follow } from "../models/Follow";
import { Profile } from "../models";

export const followRepository = {
  async isFollowing(followerId: number, followingId: number): Promise<boolean> {
    const existing = await Follow.findOne({
      where: {
        followerProfileId: followerId,
        followingProfileId: followingId,
      },
    });

    return !!existing;
  },

  async createFollow(followerId: number, followingId: number): Promise<Follow> {
    const follow = await Follow.create({
      followerProfileId: followerId,
      followingProfileId: followingId,
      followedAt: new Date(),
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

  async getFollowers(profileId: number, page = 1, limit = 10) {
    const offset = (page - 1) * limit;

    const { rows: followers, count } = await Profile.findAndCountAll({
      include: [
        {
          model: Follow,
          as: "followers",
          where: { followingProfileId: profileId },
          attributes: [],
        },
      ],
      offset,
      limit,
      order: [["followedAt", "DESC"]],
    });

    const totalPages = Math.ceil(count / limit);

    return {
      followers,
      total: count,
      currentPage: page,
      totalPages,
    };
  },

  async getFollowing(profileId: number, page = 1, limit = 10) {
    const offset = (page - 1) * limit;

    const { rows: following, count } = await Profile.findAndCountAll({
      include: [
        {
          model: Follow,
          as: "following",
          where: { followingProfileId: profileId },
          attributes: [],
        },
      ],
      offset,
      limit,
      order: [["followedAt", "DESC"]],
    });

    const totalPages = Math.ceil(count / limit);

    return {
      following,
      total: count,
      currentPage: page,
      totalPages,
    };
  },
};
