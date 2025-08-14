import { z } from "zod";

export const IdParamsSchema = z.object({
  id: z.coerce.number(),
});

export const ProfileSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
  bio: z.string().optional(),
  avatar: z.string().optional(),
  profileSetupDone: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const SafeProfileSchema = ProfileSchema.omit({ password: true });
export type SafeProfile = z.infer<typeof SafeProfileSchema>;

export const PublicProfileSchema = ProfileSchema.omit({
  password: true,
  email: true,
  profileSetupDone: true,
});
export type PublicProfile = z.infer<typeof PublicProfileSchema>;

export const PublicProfileResponseSchema = z.object({
  publicProfile: PublicProfileSchema,
  followersTotal: z.number(),
  followingsTotal: z.number(),
});
export type PublicProfileResponse = z.infer<typeof PublicProfileResponseSchema>;

export const ProfileDataSchema = z.object({
  profile: SafeProfileSchema,
});
export type ProfileData = z.infer<typeof ProfileDataSchema>;

export const ProfileUpdateSchema = z.object({
  bio: z.string().max(160, "Bio deve ter no máximo 160 caracteres").optional(),
  avatar: z.instanceof(Buffer).optional(),
  profileSetupDone: z.boolean().optional(),
});
export type ProfileUpdateData = z.infer<typeof ProfileUpdateSchema>;
