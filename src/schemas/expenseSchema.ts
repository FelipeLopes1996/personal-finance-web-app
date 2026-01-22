import { z } from "zod";

export const ExpenseSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z
    .string()
    .min(3, "Descrição deve ter pelo menos 3 caracteres")
    .optional()
    .or(z.literal("")),
  value: z.string().min(1, "Valor é obrigatório"),
  categoryId: z.number().optional(),
});

export type ExpenseSchemaType = z.infer<typeof ExpenseSchema>;
