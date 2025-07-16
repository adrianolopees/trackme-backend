import { Op } from "sequelize";
import { Profile } from "../models/Profile";

export const profileRepository = {
  async create(profileData: any) {
    return await Profile.create(profileData);
  },

  async findById(id: number) {
    return await Profile.findByPk(id);
  },

  async findByEmail(email: string) {
    return await Profile.findOne({ where: { email } });
  },

  async update(id: number, updates: Partial<any>) {
    return await Profile.update(updates, { where: { id } });
  },

  async delete(id: number) {
    return await Profile.destroy({ where: { id } });
  },

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
