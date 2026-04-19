import { z } from "zod";

export const ExpenseSchema = z
  .object({
    name: z.string().min(1, "Nome é obrigatório"),
    description: z
      .string()
      .min(3, "Descrição deve ter pelo menos 3 caracteres")
      .optional()
      .or(z.literal("")),
    value: z.string().min(1, "Valor é obrigatório"),
    categoryId: z.number().min(1, "Categoria é obrigatório"),
    localDate: z
      .string()
      .refine((value) => !isNaN(Date.parse(value)), "Data inválida"),
    paymentMethod: z.enum(["PIX", "CREDITO", "DEBITO", "DINHEIRO"] as const, {
      message: "Selecione a forma de pagamento",
    }),
    nameCard: z.string().optional().or(z.literal("")),
  })
  .superRefine(({ paymentMethod, nameCard }, ctx) => {
    const needsCardName =
      paymentMethod === "CREDITO" || paymentMethod === "DEBITO";

    if (needsCardName && !nameCard?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Nome do cartão é obrigatório",
        path: ["nameCard"],
      });
    }
  });

export type ExpenseSchemaType = z.infer<typeof ExpenseSchema>;
