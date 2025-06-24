import { Profile } from "../models/Profile";

export class ProfileService {
  async getMyProfile(userId: number) {
    const profile = await Profile.findByPk(userId, {
      attributes: { exclude: ["password"] },
    });

    if (!profile) throw new Error("Perfil não encontrado!");

    return profile;
  }

  // Aqui você também implementa:
  // - getAllProfiles()
  // - updateProfile()
  // - deleteProfile()
  // - getProfileById()
}
