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

export const ProfileDBSchema = z.object({
  id: z.number(),
  username: z.string(),
  name: z.string(),
  bio: z.string().nullable().optional(),
  avatar: z.instanceof(Buffer).nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const SafeProfileSchema = ProfileSchema.omit({ password: true });

export const PublicProfileSchema = ProfileSchema.omit({
  password: true,
  email: true,
  profileSetupDone: true,
});

export const FindAndCountResult = z.object({
  count: z.number(),
  rows: z.array(ProfileDBSchema),
});

export const PublicProfileResponseSchema = z.object({
  data: PublicProfileSchema,
  followersTotal: z.number(),
  followingsTotal: z.number(),
});

export const ProfileDataSchema = z.object({
  profile: SafeProfileSchema,
});

export const ProfileUpdateSchema = z.object({
  bio: z.string().max(160, "Bio deve ter no máximo 160 caracteres").optional(),
  avatar: z.instanceof(Buffer).optional(),
  profileSetupDone: z.boolean().optional(),
});

export type SafeProfile = z.infer<typeof SafeProfileSchema>;
export type ProfileUpdateData = z.infer<typeof ProfileUpdateSchema>;
export type ProfileRepositoryResult = z.infer<typeof ProfileDBSchema>;
export type ProfileData = z.infer<typeof ProfileDataSchema>;
export type PublicProfileResponse = z.infer<typeof PublicProfileResponseSchema>;
export type FindAndCountResponse = z.infer<typeof FindAndCountResult>;
export type PublicProfile = z.infer<typeof PublicProfileSchema>;
