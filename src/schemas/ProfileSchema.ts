import { z } from "zod";

export const ProfileSchema = z.object({
  name: z.string().min(3, "Nome precisa ter pelo menos 3 caracteres"),
  salary: z
    .string()
    .min(1, "O valor é obrigatório")
    .refine((value) => {
      const numeric = value
        .replace(/\./g, "")
        .replace(",", ".")
        .replace(/[^\d.]/g, "");

      const numberValue = Number(numeric);
      return !isNaN(numberValue) && numberValue > 0;
    }, "Informe um valor válido"),
});

export type ProfileSchema = z.infer<typeof ProfileSchema>;
