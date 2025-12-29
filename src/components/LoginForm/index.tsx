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

export default function LoginForm() {
  const navigate = useNavigate();
  const { setValue: setToken } = useLocalStorage<string | null>(
    "@finance:token",
    null
  );
  const { setValue: setUserId } = useLocalStorage<string | null>(
    "@finance:userId",
    null
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
      navigate("/dashboard");
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
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col mb-[30px]">
        <TextField
          {...register("email")}
          placeholder="e-mail*"
          type="text"
          required
        />
        {errors.email && (
          <p className="text-red-500 text-sm pl-[15px]">
            {errors.email.message}
          </p>
        )}
        {!errors.email && (
          <span className="text-[#C5C5C5] text-[12px] pl-[15px]">
            Insira o seu e-mail
          </span>
        )}
      </div>

      <div className="flex flex-col relative mb-[30px]">
        <TextField
          {...register("password")}
          placeholder="Senha*"
          type={showPassword ? "text" : "password"}
          required
        />
        {errors.password && (
          <p className="text-red-500 text-sm pl-[15px]">
            {errors.password.message}
          </p>
        )}

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-3 text-gray-400 hover:cursor-pointer"
        >
          {/* <VisibleIcon /> */}
        </button>
      </div>

      {/* <div className="flex items-center justify-between text-gray-400 text-sm mb-[40px]">
        <label className="flex items-center gap-2 cursor-pointer text-[#C5C5C5]">
          <span className="relative w-5 h-5">
            <input
              onChange={() => setIsRememberUser(!isRememberUser)}
              checked={isRememberUser}
              type="checkbox"
              className="peer cursor-pointer appearance-none w-5 h-5 border border-gray-400 rounded-[7px] bg-teal-600  transition"
            />
            <span className="absolute left-[4px] top-[-1px] text-white text-sm scale-0 peer-checked:scale-100 transition-transform pointer-events-none">
              ✓
            </span>
          </span>
          Lembrar meu usuário
        </label>
        <a href="#" className="text-[#1876D2] hover:underline">
          Esqueci minha senha
        </a>
      </div> */}

      <Button
        disabled={isLoading}
        className={clsx(
          isLoading && "!bg-teal-700 hover:cursor-default",
          "hover:shadow-[0_0_15px_2px_#a1d1bd]"
        )}
        type="submit"
      >
        {isLoading ? <SpinnerLoading width="5" height="5" /> : "Entrar"}
      </Button>
    </form>
  );
}
