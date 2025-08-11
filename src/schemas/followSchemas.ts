import { z } from "zod";

export const FollowParamsSchema = z.object({
  profileId: z.coerce
    .number()
    .int()
    .positive({ message: "ID do perfil deve ser um número positivo" }),
});

export const PaginationQuerySchema = z.object({
  page: z.coerce
    .number()
    .int()
    .min(1, "Página deve ser pelo menos 1")
    .default(1),
  limit: z.coerce
    .number()
    .int()
    .min(1, " Limite deve ser pelo menos 1")
    .max(100, "Limite máximo é 100")
    .default(10),
});
