import { TextField } from "../TextField";
import { useForm } from "react-hook-form";
import { LoginSchema } from "../../schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../Button";
import clsx from "clsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../utils/api-request";
import CustomToast from "../CustomToast";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { decodeJwt } from "../../utils/decodeJwt";
import SpinnerLoading from "../SpinnerLoading";
import { useAuth } from "@/hooks/useAuth";
import { Eye, EyeClosed } from "lucide-react";

export default function LoginForm() {
  const navigate = useNavigate();
  const { handleChangeToken } = useAuth();
  const { setValue: setToken } = useLocalStorage<string | null>(
    "@finance:token",
    null,
  );
  const { setValue: setUserId } = useLocalStorage<string | null>(
    "@finance:userId",
    null,
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(LoginSchema),
  });
  const [isLoading, setIsLoading] = useState(false);
  // const [isRememberUser, setIsRememberUser] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async ({ email, password }: LoginSchema) => {
    const bodyRequest = {
      email,
      passwordUser: password,
    };
    setIsLoading(true);

    const loginSession = await apiRequest<string>("/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyRequest),
    });

    if (loginSession.success) {
      const { data } = loginSession;
      setToken(data);
      handleChangeToken(data);
      const decodeToken = decodeJwt(data || "");
      setUserId(JSON.stringify(decodeToken?.userId));

      // if (isRememberUser) {
      //   localStorage.setItem(
      //     "@loomi-remember-user",
      //     JSON.stringify({ email, password, isRememberUser })
      //   );
      // }
      setIsLoading(false);
      CustomToast({
        title: "Usuário logado com sucesso",
        description: "Seja Bem vindo!",
        status: "success",
      });
      navigate("/expense");
    } else {
      CustomToast({
        title: "Usuário ou senha inválidos",
        description: " ",
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
        {...register("email")}
        placeholder="e-mail*"
        type="text"
        required
        error={!!errors.email}
        errorMsg={errors?.email?.message || "Insira o seu e-mail"}
      />

      <TextField
        {...register("password")}
        placeholder="Senha*"
        type={showPassword ? "text" : "password"}
        required
        icon={
          showPassword ? (
            <EyeClosed className="hover: cursor-pointer" />
          ) : (
            <Eye className="hover: cursor-pointer" />
          )
        }
        onIconClick={() => setShowPassword(!showPassword)}
        error={!!errors.password}
        errorMsg={errors?.password?.message || ""}
      />

      <Button
        disabled={isLoading}
        className={clsx(
          isLoading && "!bg-teal-700 hover:cursor-default",
          "hover:shadow-[0_0_15px_2px_#a1d1bd]",
        )}
        type="submit"
      >
        {isLoading ? <SpinnerLoading width="5" height="5" /> : "Entrar"}
      </Button>
    </form>
  );
}
