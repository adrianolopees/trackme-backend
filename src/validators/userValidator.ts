import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(3, "Username deve ter ao menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  bio: z.string().optional(),
  avatar: z.instanceof(Buffer).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const loginSchema = z.object({
  identifier: z.string().min(3),
  password: z.string().min(6),
});
