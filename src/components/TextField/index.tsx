import clsx from "clsx";
import { useId } from "react";

type InputTextFieldProps = {
  labelText?: string;
} & React.ComponentProps<"input">;

export function TextField({ labelText = "", ...props }: InputTextFieldProps) {
  const id = useId();

  return (
    <div className="flex flex-col gap-2">
      {labelText && (
        <label className="text-sm" htmlFor={id}>
          {labelText}
        </label>
      )}
      <input
        {...props}
        className={clsx(
          "p-4",
          "rounded-[10px]",
          "bg-white",
          "text-[#000000]",
          "placeholder-gray-400",
          "border border-teal-400",
          "focus:outline-none",
          "focus:border-transparent",
          "focus:ring-2",
          "focus:ring-teal-400",
          props.className
        )}
        id={id}
      />
    </div>
  );
}
