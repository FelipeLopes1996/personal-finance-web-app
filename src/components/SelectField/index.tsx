import clsx from "clsx";
import { useId } from "react";

interface ISelectOption {
  value: string | number | undefined;
  label: string;
}

interface ISelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  labelText?: string;
  optionSelectText?: string;
  options: ISelectOption[];
  error?: boolean;
  errorMsg?: string;
}

export function SelectField({
  labelText = "",
  optionSelectText = "",
  options,
  error,
  errorMsg,
  ...props
}: ISelectFieldProps) {
  const id = useId();

  return (
    <div className="flex flex-col gap-2">
      {labelText && (
        <label htmlFor={id} className="text-sm">
          {labelText}
        </label>
      )}

      <select
        {...props}
        id={id}
        className={clsx(
          "p-4",
          "rounded-[10px]",
          "bg-white",
          "text-black",
          "border border-teal-400",
          "focus:outline-none",
          "focus:ring-1 focus:ring-teal-400",
          props.className,
        )}
      >
        <option value={0}>{optionSelectText}</option>

        {options.map((option) => (
          <option
            className="py-2 px-4 text-sm text-gray-800"
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      {error && <p className="text-red-500 text-sm ">{errorMsg}</p>}
    </div>
  );
}
