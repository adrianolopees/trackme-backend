import { z } from "zod";
import { SafeProfileSchema } from "./profileSchemas";

// Schemas de entrada
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

// Schemas dos dados internos (o que vai no campo 'data')
export const AuthDataSchema = z.object({
  token: z.string({
    required_error: "Token é obrigatório",
    invalid_type_error: "Token deve ser uma string",
  }),
  profile: SafeProfileSchema,
});

export const TokenDataSchema = z.object({
  token: z.string({
    required_error: "Token é obrigatório",
    invalid_type_error: "Token deve ser uma string",
  }),
});

// Types inferidos
export type RegisterData = z.infer<typeof RegisterSchema>;
export type LoginData = z.infer<typeof LoginSchema>;

// Types dos dados internos
export type AuthData = z.infer<typeof AuthDataSchema>;
export type TokenData = z.infer<typeof TokenDataSchema>;
