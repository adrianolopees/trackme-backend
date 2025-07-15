import { z } from "zod";

export const ProfileUpdateSchema = z.object({
  bio: z.string().max(160, "Bio deve ter no máximo 160 caracteres").optional(),
});

export const ProfileSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string().email(),
  name: z.string(),
  bio: z.string().optional(),
  avatar: z.string().optional(),
  password: z.string(),
});

export const SafeProfileSchema = ProfileSchema.omit({ password: true });
export type SafeProfile = z.infer<typeof SafeProfileSchema>;

export type ProfileUpdateData = z.infer<typeof ProfileUpdateSchema>;
