import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().nonempty("teste"),
});

export type LoginSchema = z.infer<typeof LoginSchema>;
