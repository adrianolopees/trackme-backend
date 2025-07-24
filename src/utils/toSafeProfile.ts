import { Profile } from "../models/Profile";
import { SafeProfile } from "../schemas/profileSchemas";

export function toSafeProfile(profile: Profile): SafeProfile {
  return {
    id: profile.id,
    username: profile.username,
    email: profile.email,
    name: profile.name,
    bio: profile.bio ?? undefined,
    avatar: profile.avatar
      ? `data:image/png;base64,${profile.avatar}`
      : undefined,
    profileSetupDone: profile.profileSetupDone,
    createdAt: profile.createdAt,
    updatedAt: profile.updatedAt,
  };
}
