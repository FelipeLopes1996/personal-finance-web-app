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
import { Eye, EyeClosed } from "lucide-react";

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
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[1.5rem]"
    >
      <TextField
        {...register("name")}
        placeholder="Nome*"
        type="text"
        error={!!errors.name}
        errorMsg={errors?.name?.message || ""}
      />

      <TextField
        {...register("email")}
        placeholder="e-mail*"
        type="email"
        error={!!errors.email}
        errorMsg={errors?.email?.message || ""}
      />
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
        error={!!errors.salary}
        errorMsg={errors?.salary?.message || ""}
      />

      <TextField
        {...register("password")}
        placeholder="Senha*"
        type={showPassword ? "text" : "password"}
        error={!!errors.password}
        errorMsg={errors?.password?.message || ""}
        onIconClick={() => setShowPassword(!showPassword)}
        icon={
          showPassword ? (
            <EyeClosed className="hover: cursor-pointer" />
          ) : (
            <Eye className="hover: cursor-pointer" />
          )
        }
      />

      <TextField
        {...register("confirmPassword")}
        placeholder="Confirmar Senha*"
        type={showPasswordConfirm ? "text" : "password"}
        icon={
          showPasswordConfirm ? (
            <EyeClosed className="hover: cursor-pointer" />
          ) : (
            <Eye className="hover: cursor-pointer" />
          )
        }
        error={!!errors.confirmPassword}
        errorMsg={errors?.confirmPassword?.message || ""}
        onIconClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
      />

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
