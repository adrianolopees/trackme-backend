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
});

// Schema para retorno do login
export const AuthResponseSchema = z.object({
  token: z.string({
    required_error: "Token é obrigatório",
    invalid_type_error: "Token deve ser uma string",
  }),
  profile: SafeProfileSchema,
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
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
export type ApiResponse<T = any> = {
  success: boolean;
  message: string;
  data?: T;
  errors?: any[];
};
