import { z } from "zod";

export const FollowParamsSchema = z.object({
  profileId: z.coerce
    .number()
    .int()
    .positive({ message: "ID do perfil deve ser um número positivo" }),
});
