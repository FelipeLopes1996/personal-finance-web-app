import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { TextField } from "@/components/TextField";
import { SelectField } from "@/components/SelectField";
import { Button } from "@/components/Button";

import type { ICategory } from "@/types/ICategory";
import {
  ExpenseFilterSchema,
  type ExpenseFilterSchemaType,
} from "@/schemas/ExpenseFilterSchema";
import type { IExpenseFilters } from "@/types/IExpenseFilters";
import { currencyMask } from "@/utils/formatCurrency";
import { parseCurrencyToNumber } from "@/utils/parseCurrencyToNumber";
import { todayISO } from "@/utils/todayISO";

interface IExpenseFilterForm {
  categories: ICategory[];
  handleSetFilters: (filters: IExpenseFilters) => void;
  defaultValues?: Partial<ExpenseFilterSchemaType> | undefined;
}

function getMinDate(dateA?: string, dateB?: string) {
  if (!dateA) return dateB;

  if (!dateB) return dateA;

  return new Date(dateA) < new Date(dateB) ? dateA : dateB;
}

const ExpenseFiltersForm = ({
  categories,
  handleSetFilters,
  defaultValues,
}: IExpenseFilterForm) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ExpenseFilterSchemaType>({
    resolver: zodResolver(ExpenseFilterSchema),
    defaultValues,
  });

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  function addDays(date: string, days: number) {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d.toISOString().split("T")[0];
  }

  const today = todayISO();

  const onSubmit = ({
    minValue,
    maxValue,
    categoryId,
    startDate,
    endDate,
  }: ExpenseFilterSchemaType) => {
    const filters: IExpenseFilters = {
      minValue: minValue ? parseCurrencyToNumber(minValue) : undefined,
      maxValue: maxValue ? parseCurrencyToNumber(maxValue) : undefined,
      categoryId: categoryId === 0 ? undefined : categoryId,
      startDate,
      endDate,
    };

    handleSetFilters(filters);
  };

  const categoryOptions = categories.map(({ id, name }) => ({
    value: id,
    label: name,
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <TextField
        {...register("minValue", {
          onChange: (e) => {
            const maskedValue = currencyMask(e.target.value);

            setValue("minValue", maskedValue, {
              shouldValidate: true,
              shouldDirty: true,
            });
          },
        })}
        placeholder="Valor mínimo"
        labelText="Mínimo:"
      />

      <TextField
        {...register("maxValue", {
          onChange: (e) => {
            const maskedValue = currencyMask(e.target.value);

            setValue("maxValue", maskedValue, {
              shouldValidate: true,
              shouldDirty: true,
            });
          },
        })}
        placeholder="Valor máximo"
        labelText="Máximo:"
      />

      <SelectField
        {...register("categoryId", { valueAsNumber: true })}
        optionSelectText="Todas as categorias"
        labelText="Categorias:"
        options={categoryOptions}
      />
      <TextField
        type="date"
        labelText="Data início:"
        max={endDate ? endDate : today}
        error={!!errors.startDate}
        errorMsg={errors.startDate?.message}
        {...register("startDate")}
      />

      <TextField
        type="date"
        labelText="Data final:"
        min={startDate}
        max={startDate ? getMinDate(addDays(startDate, 30), today) : today}
        error={!!errors.endDate}
        errorMsg={errors.endDate?.message}
        {...register("endDate")}
      />

      <div className="flex gap-4">
        <Button
          type="button"
          onClick={() => {
            reset();
            handleSetFilters({});
          }}
        >
          Limpar filtros
        </Button>
        <Button type="submit">Filtrar</Button>
      </div>
    </form>
  );
};
export default ExpenseFiltersForm;
