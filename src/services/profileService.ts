import { Profile } from "../models/Profile";
import { validateData } from "../utils/validateData";
import {
  profileUpdateSchema,
  ProfileUpdateData,
} from "../validators/profileValidator";

export class ProfileService {
  static async getProfileById(id: number) {
    const profile = await Profile.findByPk(id);

    if (!profile) throw new Error("Perfil não encontrado");

    const { password, ...safeProfile } = profile.toJSON();
    return safeProfile;
  }

  static async updateProfile(id: number, data: ProfileUpdateData) {
    const validationResult = validateData(profileUpdateSchema, data);
    if (!validationResult.success) {
      throw new Error(
        `Erro de validação: ${validationResult.error} - ${JSON.stringify(
          validationResult.issues
        )}`
      );
    }
    const validatedData = validationResult.data;

    const profile = await Profile.findByPk(id);
    if (!profile) throw new Error("Perfil não encontrado");

    const update = await profile.update(validatedData);

    const { password, ...safeProfile } = update.toJSON();
    return safeProfile;
  }
}
