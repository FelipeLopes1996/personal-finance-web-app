import clsx from "clsx";
import type React from "react";

interface IButton extends React.ComponentProps<"button"> {
  textButton?: "text" | "outline";
}

export function Button({ textButton = "outline", ...props }: IButton) {
  const baseStyle = "w-full  cursor-pointer transition-colors rounded-[6px]";

  const variants = {
    text: "bg-white text-teal-600 hover:bg-teal-50 p-3.5",
    outline: "text-white bg-teal-600 p-3.5",
  };

  const buttonClasses = clsx(
    `${baseStyle} ${variants[textButton]} ${props.className ?? ""}`,
  );

  return <button {...props} className={buttonClasses} />;
}
