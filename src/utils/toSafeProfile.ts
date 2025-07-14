import { Profile } from "../models/Profile";
import { SafeProfile } from "../schemas/profileSchemas";

export function toSafeProfile(profile: Profile): SafeProfile {
  return {
    id: profile.id,
    username: profile.username,
    email: profile.email,
    name: profile.name,
    bio: profile.bio ?? undefined,
    avatar: profile.avatar ? String(profile.avatar) : undefined,
  };
}
