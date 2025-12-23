import { z } from "zod";

export const RegisterSchema = z
  .object({
    name: z.string().min(3, "Nome precisa ter pelo menos 3 caracteres"),
    email: z.string().email("E-mail inválido"),
    salary: z
      .string()
      .min(1, "O valor é obrigatório")
      .refine((value) => {
        // remove tudo que não for número ou vírgula
        const numeric = value
          .replace(/\./g, "")
          .replace(",", ".")
          .replace(/[^\d.]/g, "");

        const numberValue = Number(numeric);
        return !isNaN(numberValue) && numberValue > 0;
      }, "Informe um valor válido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas precisam ser iguais",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof RegisterSchema>;
