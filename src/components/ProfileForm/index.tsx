import { Button } from "@/components/Button";
import { TextField } from "@/components/TextField";
import { ProfileSchema } from "@/schemas/ProfileSchema";
import { currencyMask } from "@/utils/formatCurrency";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import SpinnerLoading from "../SpinnerLoading";

type ProfileFormProps = {
  defaultValues?: {
    name: string;
    salary: string;
  };
  isLoading: boolean;
  onSubmit: (data: ProfileSchema) => void;
};

export default function ProfileForm({
  defaultValues,
  isLoading,
  onSubmit,
}: ProfileFormProps) {
  const defaultName = defaultValues?.name;
  const defaultSalary = defaultValues?.salary;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileSchema>({
    resolver: zodResolver(ProfileSchema),
  });

  useEffect(() => {
    if (defaultName === undefined || defaultSalary === undefined) return;

    setValue("name", defaultName);
    setValue("salary", defaultSalary);
  }, [defaultName, defaultSalary, setValue]);

  return (
    <form
      className="flex flex-col gap-[1.5rem]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        {...register("name")}
        placeholder="Nome"
        type="text"
        error={!!errors.name}
        errorMsg={errors.name?.message || ""}
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
        errorMsg={errors.salary?.message || ""}
      />

      <div className="pt-2 flex justify-end">
        <Button className="max-w-[10rem]" type="submit" disabled={isLoading}>
          {isLoading ? <SpinnerLoading width="5" height="5" /> : "Salvar"}
        </Button>
      </div>
    </form>
  );
}
