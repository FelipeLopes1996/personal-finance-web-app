import { z } from "zod";

export const ExpenseFilterSchema = z.object({
  text: z.string().optional(),
  minValue: z.string().optional(),
  maxValue: z.string().optional(),
  categoryId: z.number().optional(),
});

export type ExpenseFilterSchemaType = z.infer<typeof ExpenseFilterSchema>;
