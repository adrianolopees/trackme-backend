import { NextFunction, Request, Response } from "express";
import { FollowParamsSchema } from "../schemas/followSchemas";
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
      const { page = "1", limit = "10" } = req.query;

      const pageNumber = parseInt(page as string, 10);
      const limitNumber = parseInt(limit as string, 10);

      if (
        isNaN(pageNumber) ||
        pageNumber < 1 ||
        isNaN(limitNumber) ||
        limitNumber < 1 ||
        limitNumber > 100
      ) {
        res.status(400).json({
          success: false,
          message: "Parâmetros de paginação inválidos",
        });
        return;
      }
      const followers = await followService.getFollowers(
        profileId,
        pageNumber,
        limitNumber
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

  async getFollowings(req: Request, res: Response, next: NextFunction) {
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
      const { page = "1", limit = "10" } = req.query;

      const pageNumber = parseInt(page as string, 10);
      const limitNumber = parseInt(limit as string, 10);

      if (isNaN(pageNumber) || pageNumber < 1) {
        res.status(400).json({
          success: false,
          message: "Número da página deve ser um número positivo",
        });
        return;
      }

      if (isNaN(limitNumber) || limitNumber < 1 || limitNumber > 100) {
        res.status(400).json({
          success: false,
          message: "Limite deve ser um número entre 1 e 100",
        });
        return;
      }

      const followings = await followService.getFollowings(
        profileId,
        pageNumber,
        limitNumber
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
};
