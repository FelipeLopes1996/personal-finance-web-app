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
          "rounded-[20px]",
          "bg-[#1A1F36]",
          "text-[#C9C9C9]",
          "placeholder-gray-400",
          "border border-[#737677]",
          "focus:outline-none",
          "focus:border-transparent",
          "focus:ring-2",
          "focus:ring-blue-600",
          props.className
        )}
        id={id}
      />
    </div>
  );
}
