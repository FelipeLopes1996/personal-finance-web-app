import clsx from "clsx";
import type React from "react";

interface IButton extends React.ComponentProps<"button"> {
  textButton?: "text" | "outline";
}

export function Button({ textButton = "outline", ...props }: IButton) {
  const baseStyle =
    "w-full p-3.5 cursor-pointer transition-colors rounded-[6px]";

  const variants = {
    text: "bg-white text-teal-600 hover:bg-teal-50",
    outline: "text-white bg-teal-600",
  };

  const buttonClasses = clsx(
    `${baseStyle} ${variants[textButton]} ${props.className ?? ""}`
  );

  return <button {...props} className={buttonClasses} />;
}
