import clsx from "clsx";
import { NavLink } from "react-router-dom";

type NavItemProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
  isFooter: boolean;
};

export function NavItem({ to, icon, label, isFooter }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        clsx(
          "flex items-center text-sm text-[#666666] font-semibold",
          isFooter
            ? "flex-col text-xs"
            : "p-3.5 gap-3 border-b-1 border-[#666]",
          isActive && "text-teal-600 font-semibold border-teal-600"
        )
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}
