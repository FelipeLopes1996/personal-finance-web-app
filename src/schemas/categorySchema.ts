import { z } from "zod";

export const CategorySchema = z.object({
  name: z.string().min(3, "Nome precisa ter no mínimo 3 caracteres"),
});

export type CategorySchemaType = z.infer<typeof CategorySchema>;
