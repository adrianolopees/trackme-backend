import { Op } from "sequelize";
import { Profile } from "../models/Profile";

export const authRepository = {
  async findByIdentifier(identifier: string) {
    return await Profile.findOne({
      where: {
        [Op.or]: [{ email: identifier }, { username: identifier }],
      },
    });
  },

  async findByEmailOrUsername(email: string, username: string) {
    return await Profile.findOne({
      where: {
        [Op.or]: [{ email }, { username }],
      },
    });
  },
};
