import { Profile } from "../models/Profile";
import { SafeUser } from "../schemas/profileSchemas";

export function toSafeUser(profile: Profile): SafeUser {
  return {
    id: profile.id,
    username: profile.username,
    name: profile.name,
    bio: profile.bio ?? undefined,
    avatar: profile.avatar
      ? `data:image/png;base64,${profile.avatar}`
      : undefined,
    createdAt: profile.createdAt,
    updatedAt: profile.updatedAt,
  };
}
