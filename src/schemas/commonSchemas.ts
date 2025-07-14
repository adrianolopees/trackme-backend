import { z } from "zod";

export const ApiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.any().optional(),
  errors: z.array(z.any()).optional(),
});

export const AuthResponseSchema = z.object({
  token: z.string(),
  profile: z.any(), // Importar o schema do perfil
});
