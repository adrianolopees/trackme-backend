// types/profile.ts
import { z } from "zod";

// Schema para o perfil retornado (sem senha)
export const SafeProfileSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string().email(),
  name: z.string(),
  bio: z.string().optional(),
  avatar: z.instanceof(Buffer).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Schema para resposta de API
export const ApiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.any().optional(),
  errors: z.array(z.any()).optional(),
});

// Types inferidos
export type SafeProfile = z.infer<typeof SafeProfileSchema>;
export type ApiResponse<T = any> = {
  success: boolean;
  message: string;
  data?: T;
  errors?: any[];
};
