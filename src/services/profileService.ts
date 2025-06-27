import { Profile } from "../models/Profile";

export class ProfileService {
  static async getProfileById(id: number) {
    return Profile.findByPk(id);
  }
}
