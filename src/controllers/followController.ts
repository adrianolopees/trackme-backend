import { NextFunction, Request, Response } from "express";
import { FollowParamsSchema } from "../schemas/followSchemas";
import { profileRepository } from "../repositories/profileRepository";
import { followRepository } from "../repositories/followRepository";
import { validateData } from "../utils/validateData";

export const followController = {
  async followProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
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

      if (targetProfileId === currentProfileId) {
        res.status(400).json({
          success: false,
          message: "Você não pode seguir a si mesmo",
        });
        return;
      }

      // Verificar se o perfil alvo existe
      const targetProfile = await profileRepository.findById(targetProfileId);
      if (!targetProfile) {
        res.status(404).json({
          success: false,
          message: "Perfil não encontrado",
        });
        return;
      }

      const existingFollow = await followRepository.isFollowing(
        currentProfileId,
        targetProfileId
      );
      if (existingFollow) {
        res.status(400).json({
          success: false,
          message: "Você já segue esse perfil",
        });
        return;
      }

      const follow = await followRepository.createFollow(
        currentProfileId,
        targetProfileId
      );
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
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
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

      if (currentProfileId === targetProfileId) {
        res.status(400).json({
          success: false,
          message: "Você não pode deixar de seguir a si mesmo",
        });
        return;
      }

      const existingFollow = await followRepository.isFollowing(
        currentProfileId,
        targetProfileId
      );
      if (!existingFollow) {
        res.status(404).json({
          success: false,
          message: "Você não está seguindo esse perfil",
        });
        return;
      }

      await followRepository.unfollow(currentProfileId, targetProfileId);

      res.status(200).json({
        success: true,
        message: "Perfil deixado de seguir com sucesso!",
      });
    } catch (error) {
      next(error);
    }
  },

  async getFollowers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const validation = validateData(FollowParamsSchema, req.params);
      console.log("📝 Validation result:", validation);
      console.log("req.query:", req.query);
      console.log("req.params:", req.params);
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

      // Validação dos parâmetros de paginação
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

      const result = await followRepository.getFollowers(
        profileId,
        pageNumber,
        limitNumber
      );

      res.status(200).json({
        success: true,
        data: result,
        message: "Seguidores obtidos com sucesso!",
      });
    } catch (error) {
      next(error);
    }
  },

  async getFollowing(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
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

      // Validação dos parâmetros de paginação
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

      const result = await followRepository.getFollowing(
        profileId,
        pageNumber,
        limitNumber
      );

      res.status(200).json({
        success: true,
        data: result,
        message: "Seguindo obtidos com sucesso!",
      });
    } catch (error) {
      next(error);
    }
  },
};
