import { profileRepository } from "../repositories/profileRepository";
import { followRepository } from "../repositories/followRepository";
import { toPublicProfile } from "../utils/toSafeUser";
import { Request, Response } from "express";
import { validateData } from "../utils/validateData";
import { UserParamsSchema } from "../schemas/followSchemas";

export const userController = {
  async getUserById(req: Request, res: Response) {
    try {
      const validation = validateData(UserParamsSchema, req.params);
      if (!validation.success) {
        res.status(400).json({
          success: false,
          message: "Dados inválidos",
          errors: validation.issues,
        });
        return;
      }

      const userId = validation.data.id;

      const profile = await profileRepository.findById(userId);
      if (!profile) {
        return res.status(404).json({ message: "Perfil não encontrado!" });
      }

      const followersTotal = await followRepository.countFollowers(userId);
      const followingsTotal = await followRepository.countFollowing(userId);

      return res.json({
        data: toPublicProfile(profile),
        followersTotal,
        followingsTotal,
      });
    } catch (error) {}
  },
};
