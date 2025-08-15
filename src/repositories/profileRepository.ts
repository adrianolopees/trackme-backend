import { Profile } from "../models/Profile";
import { Follow } from "../models/Follow";
import { RegisterData } from "../schemas/authSchemas";
import { ProfileUpdateData } from "../schemas/profileSchemas";
import { Op, literal } from "sequelize";

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

  async findProfilesNotFollowedBy(
    authProfileId: number,
    query: string = "",
    page: number = 1,
    limit: number = 10
  ) {
    const offset = (page - 1) * limit;

    const whereClause: any = {
      id: { [Op.ne]: authProfileId }, // Exclui o próprio usuário
    };

    if (query.trim()) {
      whereClause[Op.or] = [
        { username: { [Op.iLike]: `%${query}%` } },
        { name: { [Op.iLike]: `%${query}%` } },
      ];
    }

    return await Profile.findAndCountAll({
      where: whereClause,
      attributes: ["id", "username", "name", "avatar", "bio"], // Adicione campos úteis para o front-end (ex.: bio para preview)
      include: [
        {
          model: Follow,
          as: "followers", // Assumindo alias para o relacionamento (ajuste conforme seu modelo)
          where: { followerId: authProfileId }, // Verifica se já segue
          required: false, // Left join para incluir não seguidos
        },
      ],
      // Filtra para não seguidos: onde o follow não existe
      having: literal('COUNT("followers"."id") = 0'), // Conta follows == 0 (não segue)
      group: ["Profile.id"], // Group by para o having funcionar
      order: [["username", "ASC"]], // Ordena alfabeticamente (pode ajustar)
      limit,
      offset,
    });
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
