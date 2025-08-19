import { NextFunction, Request, Response } from "express";
import {
  FollowParamsSchema,
  PaginationQuerySchema,
} from "../schemas/followSchemas";
import { followService } from "../services/followService";
import { validateData } from "../utils/validateData";

export const followController = {
  async followProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const validation = validateData(FollowParamsSchema, req.params);
      if (!validation.success) {
        res.status(400).json({
          success: false,
          message: "Dados inválidos",
          errors: validation.issues,
        });
        return;
      }

      const targetProfileId = validation.data.profileId;
      const currentProfileId = req.profile?.id;

      if (!currentProfileId) {
        res.status(401).json({
          success: false,
          message: "Não autorizado",
        });
        return;
      }

      const follow = await followService.follow(
        currentProfileId,
        targetProfileId
      );

      res.status(201).json({
        success: true,
        message: "Perfil seguido com sucesso!",
        data: follow,
      });
    } catch (error) {
      next(error);
    }
  },

  async unfollowProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const validation = validateData(FollowParamsSchema, req.params);
      if (!validation.success) {
        res.status(400).json({
          success: false,
          message: "Dados inválidos",
          errors: validation.issues,
        });
        return;
      }

      const targetProfileId = validation.data.profileId;
      const currentProfileId = req.profile?.id;

      if (!currentProfileId) {
        res.status(401).json({
          success: false,
          message: "Não autorizado",
        });
        return;
      }

      const unfollowedId = await followService.unfollow(
        currentProfileId,
        targetProfileId
      );
      res.status(200).json({
        success: true,
        message: "Perfil deixado de seguir com sucesso!",
        data: unfollowedId,
      });
    } catch (error) {
      next(error);
    }
  },

  async getFollowers(req: Request, res: Response, next: NextFunction) {
    try {
      const paramsValidation = validateData(FollowParamsSchema, req.params);
      if (!paramsValidation.success) {
        res.status(400).json({
          success: false,
          message: "Dados inválidos",
          errors: paramsValidation.issues,
        });
        return;
      }
      const profileId = paramsValidation.data.profileId;

      const queryValidation = validateData(PaginationQuerySchema, req.query);
      if (!queryValidation.success) {
        res.status(400).json({
          success: false,
          message: "Parâmetros de paginação inválidos",
          errors: queryValidation.issues,
        });
        return;
      }
      const { page, limit } = queryValidation.data;
      const followers = await followService.getFollowers(
        profileId,
        page!,
        limit!
      );

      res.status(200).json({
        success: true,
        data: followers,
        message: "Seguidores obtidos com sucesso!",
      });
    } catch (error) {
      next(error);
    }
  },

  async getFollowing(req: Request, res: Response, next: NextFunction) {
    try {
      const paramsValidation = validateData(FollowParamsSchema, req.params);
      if (!paramsValidation.success) {
        res.status(400).json({
          success: false,
          message: "Dados inválidos",
          errors: paramsValidation.issues,
        });
        return;
      }
      const profileId = paramsValidation.data.profileId;

      const queryValidation = validateData(PaginationQuerySchema, req.query);
      if (!queryValidation.success) {
        res.status(400).json({
          success: false,
          message: "Parâmetros de paginação inválidos",
          errors: queryValidation.issues,
        });
        return;
      }
      const { page, limit } = queryValidation.data;

      const followings = await followService.getFollowing(
        profileId,
        page!,
        limit!
      );

      res.status(200).json({
        success: true,
        data: followings,
        message: "Seguindo obtidos com sucesso!",
      });
    } catch (error) {
      next(error);
    }
  },

  async getFollowersCount(req: Request, res: Response, next: NextFunction) {
    try {
      const validation = validateData(FollowParamsSchema, req.params);
      if (!validation.success) {
        res.status(400).json({
          success: false,
          message: "Dados inválidos",
          errors: validation.issues,
        });
        return;
      }

      const profileId = validation.data.profileId;
      const count = await followService.getFollowersCount(profileId);

      res.status(200).json({
        success: true,
        data: { followersTotal: count },
        message: "Total de seguidores obtido com sucesso!",
      });
    } catch (error) {
      next(error);
    }
  },

  async getFollowingCount(req: Request, res: Response, next: NextFunction) {
    try {
      const validation = validateData(FollowParamsSchema, req.params);
      if (!validation.success) {
        res.status(400).json({
          success: false,
          message: "Dados inválidos",
          errors: validation.issues,
        });
        return;
      }

      const profileId = validation.data.profileId;
      const count = await followService.getFollowingCount(profileId);

      res.status(200).json({
        success: true,
        data: { followingTotal: count },
        message: "Total de seguindo obtido com sucesso!",
      });
    } catch (error) {
      next(error);
    }
  },
};
