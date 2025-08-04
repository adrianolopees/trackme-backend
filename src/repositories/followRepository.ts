import { Follow } from "../models/Follow";
import { Profile } from "../models";

type FollowWithFollower = Follow & {
  follower: Profile;
};
type FollowWithFollowing = Follow & {
  following: Profile;
};

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

    const { rows: followers, count } = await Follow.findAndCountAll({
      where: { followingProfileId: profileId },
      include: [
        {
          model: Profile,
          as: "follower",
          attributes: ["id", "name", "username", "avatar"],
        },
      ],
      offset,
      limit,
      order: [["followedAt", "DESC"]],
    });

    const totalPages = Math.ceil(count / limit);
    const followedProfiles = (followers as FollowWithFollower[]).map(
      (follow) => follow.follower
    );
    return {
      followers: followedProfiles,
      total: count,
      currentPage: page,
      totalPages,
    };
  },

  async getFollowing(profileId: number, page = 1, limit = 10) {
    const offset = (page - 1) * limit;

    const { rows: following, count } = await Follow.findAndCountAll({
      where: { followerProfileId: profileId },
      include: [
        {
          model: Profile,
          as: "following",
          attributes: ["id", "name", "username", "avatar"],
        },
      ],
      offset,
      limit,
      order: [["followedAt", "DESC"]],
    });

    const totalPages = Math.ceil(count / limit);
    const followingProfiles = (following as FollowWithFollowing[]).map(
      (follow) => follow.following
    );
    return {
      following: followingProfiles,
      total: count,
      currentPage: page,
      totalPages,
    };
  },

  async getFollowingIds(profileId: number): Promise<number[]> {
    const following = await Follow.findAll({
      where: { followerProfileId: profileId },
      attributes: ["followingProfileId"],
    });

    return following.map((f) => f.followingProfileId);
  },
};
