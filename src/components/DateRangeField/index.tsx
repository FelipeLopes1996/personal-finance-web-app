/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { addDays, getMinDate, todayISO } from "@/utils/date";
import { TextField } from "../TextField";

interface DateRangeFieldProps {
  register?: any;
  watch?: any;
  setValue?: any;
  errors?: any;
  dirtyFields?: any;
  startName?: string;
  endName?: string;
  maxRangeDays?: number;
}

export function DateRangeField({
  register,
  watch,
  setValue,
  errors,
  dirtyFields,
  startName = "startDate",
  endName = "endDate",
  maxRangeDays = 30,
}: DateRangeFieldProps) {
  const today = todayISO();

  const startDate = watch(startName);
  const endDate = watch(endName);

  useEffect(() => {
    if (!dirtyFields[startName]) return;

    if (startDate) {
      const maxDate = getMinDate(addDays(startDate, maxRangeDays), today);
      setValue(endName, maxDate);
    }
  }, [
    startDate,
    dirtyFields,
    setValue,
    startName,
    endName,
    today,
    maxRangeDays,
  ]);

  return (
    <>
      <TextField
        type="date"
        labelText="Data início:"
        max={endDate ? endDate : today}
        error={!!errors[startName]}
        errorMsg={errors[startName]?.message}
        className="h-[3rem]"
        {...register(startName)}
      />

      <TextField
        type="date"
        labelText="Data final:"
        min={startDate}
        max={startDate ? getMinDate(addDays(startDate, 30), today) : today}
        error={!!errors[endName]}
        errorMsg={errors[endName]?.message}
        className="h-[3rem]"
        {...register(endName)}
      />
    </>
  );
}
