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

const PAYMENT_METHOD_OPTIONS = [
  { value: "PIX", label: "PIX" },
  { value: "CREDITO", label: "Crédito" },
  { value: "DEBITO", label: "Débito" },
  { value: "DINHEIRO", label: "Dinheiro" },
];

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
    watch,
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
    paymentMethod,
    nameCard,
  }: ExpenseSchemaType) => {
    const bodyRequest = {
      name,
      description,
      value: parseCurrencyToNumber(value),
      categoryId: categoryId === 0 ? null : categoryId,
      localDate,
      paymentMethod,
      nameCard:
        paymentMethod === "CREDITO" || paymentMethod === "DEBITO"
          ? nameCard?.trim()
          : undefined,
    };
    if (errors.description || errors.name || errors.value) return;
    sendCreateOrEditExpense(bodyRequest);
  };

  const btnText = defaultValues ? "Salvar" : "Adicionar";

  const getCategoryNames = categories?.length
    ? categories.map(({ id, name }) => ({ value: id, label: name }))
    : [];

  const paymentMethod = watch("paymentMethod");
  const needsCardName =
    paymentMethod === "CREDITO" || paymentMethod === "DEBITO";

  useEffect(() => {
    if (!defaultValues?.name) {
      reset({
        localDate: todayISO(),
        paymentMethod: "PIX",
        nameCard: "",
      });
    }
  }, [defaultValues, reset]);

  useEffect(() => {
    if (!needsCardName) {
      setValue("nameCard", "", { shouldDirty: true, shouldValidate: true });
    }
  }, [needsCardName, setValue]);

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
        placeholder="Descrição"
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

      <SelectField
        {...register("paymentMethod")}
        optionSelectText="Selecione a forma de pagamento"
        options={PAYMENT_METHOD_OPTIONS}
        error={!!errors.paymentMethod}
        errorMsg={errors?.paymentMethod?.message || ""}
      />

      {needsCardName ? (
        <TextField
          {...register("nameCard")}
          placeholder="Nome no cartão*"
          error={!!errors.nameCard}
          errorMsg={errors?.nameCard?.message || ""}
        />
      ) : null}

      <TextField type="date" {...register("localDate")} max={todayISO()} />

      <Button disabled={isLoading} type="submit">
        {isLoading ? <SpinnerLoading width="5" height="5" /> : btnText}
      </Button>
    </form>
  );
}
