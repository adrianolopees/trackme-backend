// utils/validateData.ts
import { ZodSchema } from "zod";

export const validateData = <T>(
  schema: ZodSchema<T>,
  data: unknown
):
  | { success: true; data: T }
  | { success: false; error: string; issues: any } => {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  return {
    success: false,
    error: "Erro de validação",
    issues: result.error.format(),
  };
};
