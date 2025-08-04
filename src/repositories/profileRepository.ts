import { Profile } from "../models/Profile";
import { RegisterData } from "../schemas/authSchemas";
import { ProfileUpdateData } from "../schemas/profileSchemas";
import { Op } from "sequelize";

export const profileRepository = {
  async create(registerData: RegisterData) {
    return await Profile.create(registerData);
  },

  async findById(id: number) {
    return await Profile.findByPk(id);
  },

  async findByEmail(email: string) {
    return await Profile.findOne({ where: { email } });
  },

  async update(id: number, updates: ProfileUpdateData) {
    return await Profile.update(updates, { where: { id } });
  },

  async delete(id: number) {
    return await Profile.destroy({ where: { id } });
  },

  async searchByQueryExcludeProfile(query: string, excludeProfileId: number) {
    return await Profile.findAll({
      where: {
        [Op.or]: [
          { username: { [Op.iLike]: `%${query}%` } },
          { name: { [Op.iLike]: `%${query}%` } },
        ],
        id: { [Op.ne]: excludeProfileId },
      },
      attributes: ["id", "username", "avatar"],
    });
  },
};
