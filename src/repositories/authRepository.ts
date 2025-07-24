import { Op } from "sequelize";
import { Profile } from "../models/Profile";

export const authRepository = {
  // 🔹 Adicionado para login
  async findByIdentifier(identifier: string) {
    return await Profile.findOne({
      where: {
        [Op.or]: [{ email: identifier }, { username: identifier }],
      },
    });
  },

  // 🔹 Adicionado para registro
  async findByEmailOrUsername(email: string, username: string) {
    return await Profile.findOne({
      where: {
        [Op.or]: [{ email }, { username }],
      },
    });
  },
};
