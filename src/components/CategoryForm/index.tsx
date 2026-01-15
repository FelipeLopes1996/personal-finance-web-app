import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { TextField } from "@/components/TextField";
import { Button } from "../Button";
import SpinnerLoading from "../SpinnerLoading";
// import { ExpenseSchema, type ExpenseSchemaType } from "@/schemas/expenseSchema";
import {
  CategorySchema,
  type CategorySchemaType,
} from "@/schemas/categorySchema";
import type { ICategory } from "@/types/ICategory";

interface IExpenseForm {
  isLoading: boolean;
  sendCreateOrEditCategory: (data: ICategory) => void;
  defaultValues?: Partial<CategorySchemaType> | undefined;
}

export default function CategoryForm({
  isLoading,
  sendCreateOrEditCategory,
  defaultValues,
}: IExpenseForm) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategorySchemaType>({
    resolver: zodResolver(CategorySchema),
    defaultValues,
  });

  const onSubmit = async ({ name }: CategorySchemaType) => {
    const bodyRequest = {
      name,
    };
    if (errors.name) return;
    sendCreateOrEditCategory(bodyRequest);
  };

  const btnText = defaultValues ? "Salvar" : "Adicionar";

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField {...register("name")} placeholder="Nome*" />
      {errors.name && (
        <p className="text-red-500 text-sm">{errors.name.message}</p>
      )}

      <Button disabled={isLoading} className="mt-[30px]" type="submit">
        {isLoading ? <SpinnerLoading width="5" height="5" /> : btnText}
      </Button>
    </form>
  );
}
