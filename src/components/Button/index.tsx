import clsx from "clsx";

type ButtonProps = React.ComponentProps<"button">;

export function Button({ ...props }: ButtonProps) {
  const buttonClasses = clsx(
    "w-full",
    "p-4",
    "bg-teal-600",
    "rounded-[6px]",
    "text-white",
    "cursor-pointer",
    "transition-colors",
    props.className
  );

  return <button {...props} className={buttonClasses} />;
}
