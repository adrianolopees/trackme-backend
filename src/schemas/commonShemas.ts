import { z } from "zod";

export const IdParamSchema = z.object({
  profileId: z.coerce
    .number()
    .int()
    .positive({ message: "ID do perfil deve ser um número positivo" }),
});
