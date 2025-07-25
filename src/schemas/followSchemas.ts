import { z } from "zod";

export const FollowParamsSchema = z.object({
  profileId: z.string().regex(/^\d+$/, { message: "ID inválido" }),
});
