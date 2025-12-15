import { TextField } from "../TextField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../Button";
import clsx from "clsx";
import { useState } from "react";
import { RegisterSchema } from "../../schemas/RegisterSchema";

// interface UserForm {
//   username: string;
//   email: string;
// }
export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(RegisterSchema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async ({
    email,
    password,
    confirmPassword,
  }: RegisterSchema) => {
    const register = {
      email,
      password,
      confirmPassword,
    };
    console.log("register", register);
    // setIsLoading(true);
    // const res = await signIn('credentials', {
    //   email,
    //   password,
    //   redirect: false,
    // });

    // if (res?.ok) {
    //   const session = await fetch('/api/auth/session').then(r => r.json());

    //   if (session?.user?.username) {
    //     localStorage.setItem('@loomi-username', session.user.username || '');
    //   }

    //   if (isRememberUser) {
    //     localStorage.setItem(
    //       '@loomi-remember-user',
    //       JSON.stringify({ email, password, isRememberUser }),
    //     );
    //   }
    //   CustomToast({
    //     title: 'Usuário logado com sucesso',
    //     description: 'Seja Bem vindo!',
    //     status: 'success',
    //   });

    //   router.push('/dashboard');
    // } else {
    //   CustomToast({
    //     title: 'Usuário ou senha inválidos',
    //     description: ' ',
    //     status: 'error',
    //   });

    setIsLoading(false);
    // }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col mb-[20px]">
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
          className="mb-[30px]"
        />
        {errors.password && (
          <p className="text-red-500 text-sm pl-[15px]">
            {errors.password.message}
          </p>
        )}

        <TextField
          {...register("password")}
          placeholder="Confirmar Senha*"
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

      <Button
        disabled={isLoading}
        className={clsx(
          isLoading && "!bg-blue-400 hover:cursor-default",
          "hover:shadow-[0_0_15px_2px_#a1d1bd]"
        )}
        type="submit"
      >
        {/* {isLoading ? <SpinnerLoading width="5" height="5" /> : "Entrar"} */}
        {isLoading ? "..." : "Registrar"}
      </Button>
    </form>
  );
}
