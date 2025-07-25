import { NextFunction, Request, Response } from "express";
import { Follow } from "../models/Follow";
import { Profile } from "../models/Profile";
import { Op } from "sequelize";
import { FollowParamsSchema } from "../schemas/followSchemas";
import { profileRepository } from "../repositories/profileRepository";
import { followRepository } from "../repositories/followRepository";
import { validateData } from "../utils/validateData";
import { ca } from "zod/v4/locales";

interface AuthenticatedRequest extends Request {
  profile: {
    id: number;
    profileId: number;
  };
}

interface FollowParamsRequest extends AuthenticatedRequest {
  params: {
    profileId: string;
  };
}

interface PaginationQuery {
  page?: string;
  limit?: string;
}
interface FollowersQuery extends PaginationQuery {}
interface SuggestionQuery {
  limit?: string;
}

interface FollowResponse {
  success: boolean;
  data?: Follow;
  message: string;
  error?: string;
}

interface FollowStatusResponse {
  isFollowing: boolean;
}

interface PaginatedProfileResponse {
  followers?: Profile[];
  following?: Profile[];
  total: number;
  currentPage: number;
  totalPages: number;
}

interface FollowStatsResponse {
  followersCount: number;
  followingCount: number;
}

interface FollowProfileRequest extends FollowParamsRequest {}
interface FollowProfileResponse extends Response<FollowResponse> {}
type FollowProfileNext = NextFunction;

export const followController = {
  async followProfile(
    req: FollowProfileRequest,
    res: FollowProfileResponse,
    next: FollowProfileNext
  ): Promise<void> {
    try {
      const validation = validateData(FollowParamsSchema, req.params);
      if (!validation.success) {
        res.status(400).json({
          success: false,
          message: "Dados inválidos.",
          error: validation.issues,
        });
        return;
      }

      const profileId = parseInt(req.params.profileId);
      const followerId = req.profile.profileId;

      if (followerId === profileId) {
        res.status(400).json({
          success: false,
          message: "Você não pode seguir a si mesmo.",
        });
        return;
      }

      const profileToFollow = await profileRepository.findById(profileId);
      if (!profileToFollow) {
        res.status(404).json({
          success: false,
          message: "Perfil não encontrado.",
        });
        return;
      }

      const existingFollow = await followRepository.isFollowing(
        followerId,
        profileId
      );
      if (existingFollow) {
        res.status(400).json({
          success: false,
          message: "Você já segue esse perfil",
        });
        return;
      }

      const follow = await followRepository.createFollow(followerId, profileId);
      res.status(201).json({
        success: true,
        data: follow,
        message: "Perfil seguido com sucesso!",
      });
    } catch (error) {
      next(error);
    }
  },

  async unfollowProfile(
    req: FollowProfileRequest,
    res: FollowProfileResponse,
    next: FollowProfileNext
  ): Promise<void> {
    try {
      const validation = validateData(FollowParamsSchema, req.params);
      if (!validation.success) {
        res.status(400).json({
          success: false,
          message: "Dados inválidos.",
          error: validation.issues,
        });
        return;
      }

      const profileId = parseInt(req.params.profileId);
      const followerId = req.profile.profileId;

      if (followerId === profileId) {
        res.status(400).json({
          success: false,
          message: "Você não pode deixar de seguir a si mesmo.",
        });
        return;
      }

      const existingFollow = await followRepository.isFollowing(
        followerId,
        profileId
      );
      if (!existingFollow) {
        res.status(404).json({
          success: false,
          message: "Você não está seguindo esse perfil.",
        });
        return;
      }

      const deletedCount = await followRepository.unfollow(
        followerId,
        profileId
      );
      if (deletedCount === 0) {
        res.status(404).json({
          success: false,
          message: "Follow não encontrado ou já removido.",
        });
        return;
      }
      res.status(200).json({
        success: true,
        message: "Perfil deixado de seguir com sucesso!",
      });
    } catch (error) {
      next(error);
    }
  },
};
