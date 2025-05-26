import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(3, "Username deve ter ao menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  name: z.string().min(1, "Nome é obrigatório"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  profilePicture: z.string().url().optional(),
});

export const loginSchema = z.object({
  identifier: z.string().min(3),
  password: z.string().min(6),
});
