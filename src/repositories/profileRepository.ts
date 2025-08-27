import { Profile, Follow } from "../models";
import { RegisterData } from "../schemas/authSchemas";
import {
  ProfileUpdateData,
  FindAndCountResponse,
} from "../schemas/profileSchemas";
import { Op } from "sequelize";

export const profileRepository = {
  async create(registerData: RegisterData) {
    return await Profile.create(registerData);
  },

  async update(id: number, updates: ProfileUpdateData) {
    return await Profile.update(updates, { where: { id } });
  },

  async delete(id: number) {
    return await Profile.destroy({ where: { id } });
  },

  async findById(id: number) {
    return await Profile.findByPk(id);
  },

  async findByEmail(email: string) {
    return await Profile.findOne({ where: { email } });
  },

  async findProfilesNotFollowedBy(
    authProfileId: number,
    query: string = "",
    page: number = 1,
    limit: number = 10
  ): Promise<FindAndCountResponse> {
    const offset = (page - 1) * limit;

    // filtros base
    const whereClause: any = {
      id: { [Op.ne]: authProfileId }, // exclui o próprio usuário
    };

    if (query.trim()) {
      whereClause[Op.or] = [
        { username: { [Op.iLike]: `%${query}%` } },
        { name: { [Op.iLike]: `%${query}%` } },
      ];
    }

    // adiciona o filtro de não seguido
    whereClause["$followers.followerProfileId$"] = null;

    const result = await Profile.findAndCountAll({
      where: whereClause,
      attributes: ["id", "username", "name", "avatar", "bio"],
      include: [
        {
          model: Follow,
          as: "followers", // join usando quem segue esse profile
          attributes: [],
          where: { followerProfileId: authProfileId },
          required: false, // LEFT JOIN
        },
      ],
      order: [["username", "ASC"]],
      limit,
      offset,
      subQuery: false,
    });

    return {
      count: result.count,
      rows: result.rows,
    };
  },
};
