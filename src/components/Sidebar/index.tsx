import { Home, User } from "lucide-react";
import clsx from "clsx";
import { NavItem } from "../NavItem";

type SidebarProps = {
  variant: "sidebar" | "footer";
};

export default function Sidebar({ variant }: SidebarProps) {
  const isFooter = variant === "footer";

  return (
    <nav
      className={clsx(
        "bg-teal-50  ",
        isFooter
          ? "flex justify-around items-center h-14"
          : "w-64 min-h-full flex flex-col border-r-1 border-[#e5e5e5] "
      )}
    >
      <NavItem
        to="/dashboard"
        icon={<Home />}
        label="Dashboard"
        isFooter={isFooter}
      />
      <NavItem
        to="/profile"
        icon={<User />}
        label="Perfil"
        isFooter={isFooter}
      />
      {/* <NavItem
        to="/settings"
        icon={<Settings />}
        label="Config"
        isFooter={isFooter}
      /> */}
    </nav>
  );
}
