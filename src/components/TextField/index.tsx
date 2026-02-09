import clsx from "clsx";
import { useId } from "react";

type InputTextFieldProps = {
  labelText?: string;
  icon?: React.ReactNode;
  error?: boolean;
  errorMsg?: string;
  onIconClick?: () => void;
} & React.ComponentProps<"input">;

export function TextField({
  labelText = "",
  icon,
  error,
  errorMsg,
  onIconClick,
  ...props
}: InputTextFieldProps) {
  const id = useId();

  return (
    <div className="flex flex-col">
      {labelText && (
        <label className="text-sm" htmlFor={id}>
          {labelText}
        </label>
      )}

      <div className="relative">
        <input
          {...props}
          id={id}
          className={clsx(
            "p-4 w-full",
            "rounded-[10px]",
            "bg-white",
            "text-black",
            "placeholder-gray-400",
            "border border-teal-400",
            "focus:outline-none focus:ring-2 focus:ring-teal-400",
            icon && "pr-12", // espaço pro ícone
            props.className,
          )}
        />

        {icon && (
          <button
            type="button"
            onClick={onIconClick}
            className={clsx(
              "absolute right-4 inset-y-0 flex items-center",
              "text-gray-500 hover:text-teal-600",
              onIconClick ? "cursor-pointer" : "cursor-default",
            )}
          >
            {icon}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-sm ">{errorMsg}</p>}
    </div>
  );
}
