import { TextField } from "../TextField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../Button";
import clsx from "clsx";
import { useState } from "react";
import { RegisterSchema } from "../../schemas/RegisterSchema";
import { apiRequest } from "../../utils/api-request";
import { useNavigate } from "react-router-dom";
import CustomToast from "../CustomToast";
import { currencyMask } from "../../utils/formatCurrency";
import { parseCurrencyToNumber } from "../../utils/parseCurrencyToNumber";
import SpinnerLoading from "../SpinnerLoading";

interface IRegisterUser {
  name: string;
  email: string;
  salary: string;
  password: string;
}

export default function RegisterForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(RegisterSchema),
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async ({
    name,
    email,
    salary,
    password,
  }: RegisterSchema) => {
    const bodyRequest = {
      name,
      email,
      salary: parseCurrencyToNumber(salary),
      password,
    };
    setIsLoading(true);
    const responseRegister = await apiRequest<IRegisterUser>("/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyRequest),
    });

    if (responseRegister.success) {
      CustomToast({
        title: "Usuário criado com sucesso",
        description: "Seja Bem vindo! Logue com sua conta para ter acesso",
        status: "success",
      });

      navigate("/login");
    } else {
      CustomToast({
        title:
          responseRegister?.errors[0] === "Cliente já existe"
            ? "Este e-mail já está em uso"
            : responseRegister?.errors[0],
        description: "",
        status: "error",
      });

      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField {...register("name")} placeholder="Nome*" type="text" />
      {errors.name && (
        <p className="text-red-500 text-sm">{errors.name.message}</p>
      )}

      <TextField
        {...register("email")}
        placeholder="e-mail*"
        type="email"
        className="mt-[30px]"
      />
      {errors.email && (
        <p className="text-red-500 text-sm ">{errors.email.message}</p>
      )}
      <TextField
        {...register("salary", {
          onChange: (e) => {
            const maskedValue = currencyMask(e.target.value);

            setValue("salary", maskedValue, {
              shouldValidate: true,
              shouldDirty: true,
            });
          },
        })}
        placeholder="Salário"
        type="text"
        className="mt-[30px]"
      />
      {errors.email && (
        <p className="text-red-500 text-sm ">{errors.salary?.message}</p>
      )}

      <div className="flex flex-col relative mb-[30px]">
        <TextField
          {...register("password")}
          placeholder="Senha*"
          type="password"
          className="mt-[30px]"
        />
        {errors.password && (
          <p className="text-red-500 text-sm pl-[10px]">
            {errors.password.message}
          </p>
        )}

        <TextField
          {...register("confirmPassword")}
          placeholder="Confirmar Senha*"
          type="password"
          className="mt-[30px]"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm pl-[10px]">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button
        disabled={isLoading}
        className={clsx(
          isLoading && "!bg-teal-700 hover:cursor-default",
          "hover:shadow-[0_0_15px_2px_#a1d1bd]",
        )}
        type="submit"
      >
        {isLoading ? <SpinnerLoading width="5" height="5" /> : "Registrar"}
      </Button>
    </form>
  );
}
