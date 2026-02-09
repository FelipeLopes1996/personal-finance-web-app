import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { TextField } from "@/components/TextField";
import { ExpenseSchema, type ExpenseSchemaType } from "@/schemas/expenseSchema";
import { parseCurrencyToNumber } from "@/utils/parseCurrencyToNumber";
import { Button } from "../Button";
import SpinnerLoading from "../SpinnerLoading";
import type { ICreateOrEditExpense } from "@/types/IExpense";
import { SelectField } from "../SelectField";
import type { ICategory } from "@/types/ICategory";
import { currencyMask } from "@/utils/formatCurrency";
import { todayISO } from "@/utils/todayISO";
import { useEffect } from "react";

interface IExpenseForm {
  isLoading: boolean;
  sendCreateOrEditExpense: (data: ICreateOrEditExpense) => void;
  defaultValues?: Partial<ExpenseSchemaType> | undefined;
  categories: ICategory[] | [];
}

export default function ExpenseForm({
  isLoading,
  sendCreateOrEditExpense,
  defaultValues,
  categories,
}: IExpenseForm) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ExpenseSchemaType>({
    resolver: zodResolver(ExpenseSchema),
    defaultValues,
  });

  const onSubmit = async ({
    name,
    description,
    value,
    categoryId,
    localDate,
  }: ExpenseSchemaType) => {
    const bodyRequest = {
      name,
      description,
      value: parseCurrencyToNumber(value),
      categoryId: categoryId === 0 ? null : categoryId,
      localDate,
    };
    if (errors.description || errors.name || errors.value) return;
    sendCreateOrEditExpense(bodyRequest);
  };

  const btnText = defaultValues ? "Salvar" : "Adicionar";

  const getCategoryNames = categories?.length
    ? categories.map(({ id, name }) => ({ value: id, label: name }))
    : [];

  useEffect(() => {
    if (!defaultValues?.name) {
      reset({
        localDate: todayISO(),
      });
    }
  }, [defaultValues, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[1.3rem]"
    >
      <TextField
        {...register("name")}
        placeholder="Nome*"
        error={!!errors.name}
        errorMsg={errors?.name?.message || ""}
      />

      <TextField
        {...register("description")}
        placeholder="Descrição*"
        error={!!errors.description}
        errorMsg={errors?.description?.message || ""}
      />

      <TextField
        {...register("value", {
          onChange: (e) => {
            const maskedValue = currencyMask(e.target.value);

            setValue("value", maskedValue, {
              shouldValidate: true,
              shouldDirty: true,
            });
          },
        })}
        placeholder="Valor*"
        error={!!errors.value}
        errorMsg={errors?.value?.message || ""}
      />

      <SelectField
        {...register("categoryId", {
          valueAsNumber: true,
        })}
        optionSelectText="Selecione uma categoria"
        options={getCategoryNames}
        error={!!errors.categoryId}
        errorMsg={errors?.categoryId?.message || ""}
      />

      <TextField type="date" {...register("localDate")} max={todayISO()} />

      <Button disabled={isLoading} type="submit">
        {isLoading ? <SpinnerLoading width="5" height="5" /> : btnText}
      </Button>
    </form>
  );
}
