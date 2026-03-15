import { Button } from "@/components/Button";
import CustomToast from "@/components/CustomToast";
import SpinnerLoading from "@/components/SpinnerLoading";
import { TextField } from "@/components/TextField";
import { ResetPasswordSchema } from "@/schemas/ResetPasswordSchema";
import { apiRequest } from "@/utils/api-request";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(ResetPasswordSchema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      CustomToast({
        title: "Token inválido ou ausente",
        description: "Verifique o link enviado por email.",
        status: "error",
      });
      navigate("/login");
    }
  }, [token, navigate]);

  const onSubmit = async ({ newPassword }: ResetPasswordSchema) => {
    if (!token) return;

    const bodyRequest = {
      token,
      newPassword,
    };
    setIsLoading(true);

    const response = await apiRequest<string>("/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyRequest),
    });

    if (response.success) {
      setIsLoading(false);
      CustomToast({
        title: "Senha alterada com sucesso!",
        description: "Você pode fazer login com a nova senha.",
        status: "success",
      });
      navigate("/login");
    } else {
      CustomToast({
        title: "Ops, algo deu errado, tente novamente mais tarde.",
        description: response.errors.join(", "),
        status: "error",
      });
      setIsLoading(false);
    }
  };

  if (!token) {
    return <SpinnerLoading />;
  }

  return (
    <div className="m-auto flex-1 md:w-[40rem] px-[1rem] md:py-25 py-10 ">
      <div>
        <h1 className="text-center text-3xl font-extrabold text-gray-900">
          Redefinir Senha
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Digite sua nova senha
        </p>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <TextField
            labelText="Nova Senha"
            type={showPassword ? "text" : "password"}
            {...register("newPassword")}
            error={!!errors.newPassword?.message}
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
            labelText="Confirmar Nova Senha"
            type={showPasswordConfirm ? "text" : "password"}
            {...register("confirmPassword")}
            error={!!errors.confirmPassword?.message}
            icon={
              showPasswordConfirm ? (
                <EyeClosed className="hover: cursor-pointer" />
              ) : (
                <Eye className="hover: cursor-pointer" />
              )
            }
            onIconClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
          />
        </div>
        <div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <SpinnerLoading /> : "Redefinir Senha"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
