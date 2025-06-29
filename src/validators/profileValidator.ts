import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string({
      required_error: "Username é obrigatório",
      invalid_type_error: "Username deve ser um texto",
    })
    .min(3, "Username deve ter ao menos 3 caracteres"),

  email: z
    .string({
      required_error: "Email é obrigatório",
      invalid_type_error: "Email deve ser um texto",
    })
    .email("Email inválido"),

  password: z
    .string({
      required_error: "Senha é obrigatória",
      invalid_type_error: "Senha deve ser um texto",
    })
    .min(6, "Senha deve ter pelo menos 6 caracteres"),

  name: z
    .string({
      required_error: "Nome é obrigatório",
      invalid_type_error: "Nome deve ser um texto",
    })
    .min(2, "Nome deve ter pelo menos 2 caracteres"),

  bio: z.string().optional(),

  avatar: z
    .instanceof(Buffer, {
      message: "Avatar deve ser um arquivo de imagem",
    })
    .optional(),

  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const loginSchema = z.object({
  identifier: z
    .string({
      required_error: "Identificador é obrigatório",
      invalid_type_error: "Identificador deve ser um texto",
    })
    .min(3),

  password: z
    .string({
      required_error: "Senha é obrigatória",
      invalid_type_error: "Senha deve ser um texto",
    })
    .min(6),
});

export const getProfileSchema = z.object({
  id: z
    .number({
      required_error: "ID é obrigatório",
      invalid_type_error: "ID deve ser um número",
    })
    .int("ID deve ser um número inteiro")
    .positive("ID deve ser um número positivo"),
});

export const profileUpdateSchema = z.object({
  bio: z
    .string({
      invalid_type_error: "Bio deve ser um texto",
    })
    .max(160, "Bio deve ter no máximo 160 caracteres")
    .optional(),
  avatar: z.instanceof(Buffer).optional(),
});

// schema para validar resposta (se necessário)
export const safeProfileResponseSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string().email(),
  name: z.string(),
  bio: z.string().optional(),
  avatar: z.instanceof(Buffer).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type RegisterData = z.infer<typeof registerSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type ProfileUpdateData = z.infer<typeof profileUpdateSchema>;
