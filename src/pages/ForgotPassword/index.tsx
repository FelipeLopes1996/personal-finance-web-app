import { Button } from "@/components/Button";
import CustomToast from "@/components/CustomToast";
import SpinnerLoading from "@/components/SpinnerLoading";
import { TextField } from "@/components/TextField";
import { ForgotPasswordSchema } from "@/schemas/ForgotPasswordSchema";
import { apiRequest } from "@/utils/api-request";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(ForgotPasswordSchema),
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async ({ email }: ForgotPasswordSchema) => {
    const bodyRequest = {
      email,
    };
    setIsLoading(true);

    const loginSession = await apiRequest<string>("/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyRequest),
    });

    if (loginSession.success) {
      setIsLoading(false);
      CustomToast({
        title: "Email enviado com sucesso!",
        description: "Seja Bem vindo!",
        status: "success",
      });
    } else {
      CustomToast({
        title: "Ops algo deu errado, tente novamente mais tarde.",
        description: " ",
        status: "error",
      });

      setIsLoading(false);
    }
  };

  return (
    <div className="m-auto flex-1 md:w-[40rem] px-[1rem] md:py-25 py-10 ">
      <h1 className="text-[1.7rem] md:text-[2rem] font-extrabold mb-10 text-black leading-tight mx-auto text-center">
        Esqueceu a senha?
      </h1>
      <span>Redefina a senha em duas etapas</span>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[1.5rem]"
      >
        <TextField
          {...register("email")}
          placeholder="e-mail*"
          type="text"
          required
          error={!!errors.email}
          errorMsg={errors?.email?.message || "Insira o seu e-mail"}
        />
        <Button type="submit">
          {isLoading ? <SpinnerLoading width="5" height="5" /> : "Enviar"}
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
