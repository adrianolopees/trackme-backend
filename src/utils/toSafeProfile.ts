import { Profile } from "../models/Profile";
import { SafeProfile, SafeProfileSchema } from "../schemas/profileSchemas";
import { validateData } from "./validateData";

export function toSafeProfile(profile: Profile): SafeProfile {
  const safeProfile = {
    id: profile.id,
    username: profile.username,
    email: profile.email,
    name: profile.name,
    bio: profile.bio ?? undefined,
    avatar: profile.avatar
      ? `data:image/png;base64,${profile.avatar}`
      : undefined,
    createdAt: profile.createdAt,
    updatedAt: profile.updatedAt,
  };
  const validation = validateData(SafeProfileSchema, safeProfile);
  if (!validation.success) {
    throw new Error(
      "Erro ao validar SafeProfile: " + JSON.stringify(validation.issues)
    );
  }
  return validation.data;
}
