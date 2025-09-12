import { NextFunction, Request, Response } from "express";
import {
  FollowParamsSchema,
  PaginationQuerySchema,
} from "../schemas/followSchemas";
import { followService } from "../services/followService";
import { validateData } from "../utils/validateData";
import { sendCreated, sendError, sendSuccess } from "../utils/responseHelper";

export const followController = {
  async followProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const validation = validateData(FollowParamsSchema, req.params);
      if (!validation.success) {
        sendError(res, "Dados inválidos", 400, validation.issues);
        return;
      }

      const targetProfileId = validation.data.profileId;
      const currentProfileId = req.profile.id;

      const follow = await followService.follow(
        currentProfileId,
        targetProfileId
      );

      sendCreated(res, follow, "Perfil seguido com sucesso!");
    } catch (error) {
      next(error);
    }
  },

  async unfollowProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const validation = validateData(FollowParamsSchema, req.params);
      if (!validation.success) {
        sendError(res, "Dados inválidos", 400, validation.issues);
        return;
      }

      const targetProfileId = validation.data.profileId;
      const currentProfileId = req.profile.id;

      const unfollowedId = await followService.unfollow(
        currentProfileId,
        targetProfileId
      );
      sendSuccess(res, unfollowedId, "Perfil deixado de seguir com sucesso!");
    } catch (error) {
      next(error);
    }
  },

  async getFollowers(req: Request, res: Response, next: NextFunction) {
    try {
      const paramsValidation = validateData(FollowParamsSchema, req.params);
      if (!paramsValidation.success) {
        sendError(res, "Dados inválidos", 400, paramsValidation.issues);
        return;
      }
      const profileId = paramsValidation.data.profileId;

      const queryValidation = validateData(PaginationQuerySchema, req.query);
      if (!queryValidation.success) {
        sendError(
          res,
          "Parâmetros de paginação inválidos",
          400,
          queryValidation.issues
        );
        return;
      }
      const { page, limit } = queryValidation.data;
      const followers = await followService.getFollowers(
        profileId,
        page,
        limit
      );

      sendSuccess(res, followers, "Seguidores obtidos com sucesso!");
    } catch (error) {
      next(error);
    }
  },

  async getFollowing(req: Request, res: Response, next: NextFunction) {
    try {
      const paramsValidation = validateData(FollowParamsSchema, req.params);
      if (!paramsValidation.success) {
        sendError(res, "Dados inválidos", 400, paramsValidation.issues);
        return;
      }
      const profileId = paramsValidation.data.profileId;

      const queryValidation = validateData(PaginationQuerySchema, req.query);
      if (!queryValidation.success) {
        sendError(
          res,
          "Parâmetros de paginação inválidos",
          400,
          queryValidation.issues
        );
        return;
      }
      const { page, limit } = queryValidation.data;

      const followings = await followService.getFollowing(
        profileId,
        page,
        limit
      );

      sendSuccess(res, followings, "Perfis seguindo obtidos com sucesso!");
    } catch (error) {
      next(error);
    }
  },

  async getFollowersCount(req: Request, res: Response, next: NextFunction) {
    try {
      const validation = validateData(FollowParamsSchema, req.params);
      if (!validation.success) {
        sendError(res, "Dados inválidos", 400, validation.issues);
        return;
      }

      const profileId = validation.data.profileId;
      const count = await followService.getFollowersCount(profileId);

      sendSuccess(
        res,
        { followersTotal: count },
        "Total de seguidores obtido com sucesso!"
      );
    } catch (error) {
      next(error);
    }
  },

  async getFollowingCount(req: Request, res: Response, next: NextFunction) {
    try {
      const validation = validateData(FollowParamsSchema, req.params);
      if (!validation.success) {
        sendError(res, "Dados inválidos", 400, validation.issues);
        return;
      }

      const profileId = validation.data.profileId;
      const count = await followService.getFollowingCount(profileId);

      sendSuccess(
        res,
        { followingTotal: count },
        "Total de perfis seguindo obtido com sucesso!"
      );
    } catch (error) {
      next(error);
    }
  },
};
