import { z } from "zod";
import { PublicProfileSchema } from "./profileSchemas";

export const FollowParamsSchema = z.object({
  profileId: z.coerce.number().int().positive(),
});

export const PaginationQuerySchema = z.object({
  page: z.coerce
    .number()
    .int()
    .min(1, "Página deve ser pelo menos 1")
    .transform((val) => (val ? Number(val) : 1)),
  limit: z.coerce
    .number()
    .int()
    .min(1, "Limite deve ser pelo menos 1")
    .max(100, "Limite máximo é 100"),
  query: z.string().trim().default(""),
});

export const PaginatedListSchema = z.object({
  followers: z.array(PublicProfileSchema).optional(), // Use 'optional' para o caso de 'following'
  following: z.array(PublicProfileSchema).optional(), // Use 'optional' para o caso de 'followers'
  total: z.number(),
  currentPage: z.number(),
  totalPages: z.number(),
});

export const PaginatedNotFollowedSchema = z.object({
  profiles: z.array(PublicProfileSchema), // Obrigatório, sem optional, pois é o foco dessa rota
  total: z.number().int().min(0), // Adicionei min(0) para validação extra
  currentPage: z.number().int().min(1),
  totalPages: z.number().int().min(1),
});

export type PaginatedNotFollowed = z.infer<typeof PaginatedNotFollowedSchema>;

export type PaginatedList = z.infer<typeof PaginatedListSchema>;
