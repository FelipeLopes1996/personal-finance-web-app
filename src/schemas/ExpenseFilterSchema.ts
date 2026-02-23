import { z } from "zod";

export const ExpenseFilterSchema = z
  .object({
    text: z.string().optional(),
    minValue: z.string().optional(),
    maxValue: z.string().optional(),
    categoryId: z.number().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  })
  .refine(
    (data) => {
      if (!data.startDate || !data.endDate) return true;

      const diff =
        (new Date(data.endDate).getTime() -
          new Date(data.startDate).getTime()) /
        (1000 * 60 * 60 * 24);

      return diff <= 30;
    },
    {
      message: "O intervalo deve ser de no máximo 30 dias",
      path: ["endDate"],
    },
  );

export type ExpenseFilterSchemaType = z.infer<typeof ExpenseFilterSchema>;
