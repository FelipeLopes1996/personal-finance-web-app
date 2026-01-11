import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { TextField } from "@/components/TextField";
import { ExpenseSchema, type ExpenseSchemaType } from "@/schemas/expenseSchema";
import { parseCurrencyToNumber } from "@/utils/parseCurrencyToNumber";
import { formatCurrency } from "@/utils/formatCurrency";
import { Button } from "../Button";
import SpinnerLoading from "../SpinnerLoading";
import type { ICreateOrEditExpense } from "@/types/IExpense";
import { useEffect } from "react";

interface IExpenseForm {
  isLoading: boolean;
  sendCreateOrEditExpense: (data: ICreateOrEditExpense) => void;
  defaultValues?: Partial<ExpenseSchemaType> | undefined;
}

export default function ExpenseForm({
  isLoading,
  sendCreateOrEditExpense,
  defaultValues,
}: IExpenseForm) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ExpenseSchemaType>({
    resolver: zodResolver(ExpenseSchema),
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const onSubmit = async ({ name, description, value }: ExpenseSchemaType) => {
    const bodyRequest = {
      name,
      description,
      value: parseCurrencyToNumber(value),
    };
    if (errors.description || errors.name || errors.value) return;
    sendCreateOrEditExpense(bodyRequest);
  };

  const btnText = defaultValues ? "Salvar" : "Adicionar";

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField {...register("name")} placeholder="Nome*" />
      {errors.name && (
        <p className="text-red-500 text-sm">{errors.name.message}</p>
      )}

      <TextField
        {...register("description")}
        placeholder="Descrição*"
        className="mt-[30px]"
      />
      {errors.description && (
        <p className="text-red-500 text-sm">{errors.description.message}</p>
      )}

      <TextField
        {...register("value", {
          onChange: (e) => {
            e.target.value = formatCurrency(e.target.value);
          },
        })}
        placeholder="Valor*"
        className="mt-[30px]"
      />
      {errors.value && (
        <p className="text-red-500 text-sm">{errors.value.message}</p>
      )}

      {/* Categoria */}
      {/* <TextField
        {...register("categoryId", { valueAsNumber: true })}
        placeholder="Categoria*"
        type="number"
        className="mt-[30px]"
      />
      {errors.categoryId && (
        <p className="text-red-500 text-sm">
          {errors.categoryId.message}
        </p>
      )} */}

      <Button disabled={isLoading} className="mt-[30px]" type="submit">
        {isLoading ? <SpinnerLoading width="5" height="5" /> : btnText}
      </Button>
    </form>
  );
}
