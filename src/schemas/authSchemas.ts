import { z } from "zod";
import { SafeProfileSchema } from "./profileSchemas";

export const RegisterSchema = z.object({
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
});

export const LoginSchema = z.object({
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

export const AuthResponseSchema = z.object({
  token: z.string({
    required_error: "Token é obrigatório",
    invalid_type_error: "Token deve ser uma string",
  }),
  profile: SafeProfileSchema,
});

export const TokenResponseSchema = z.object({
  token: z.string({
    required_error: "Token é obrigatório",
    invalid_type_error: "Token deve ser uma string",
  }),
});

export type RegisterData = z.infer<typeof RegisterSchema>;
export type LoginData = z.infer<typeof LoginSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
export type TokenResponse = z.infer<typeof TokenResponseSchema>;
