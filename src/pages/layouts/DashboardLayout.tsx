import { Outlet } from "react-router-dom";
import { DashboardProvider } from "../../contexts/userContext";
import Header from "../../components/Header";
import { useAuthGuard } from "../../hooks/useAuthGuard";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout() {
  useAuthGuard();
  return (
    <DashboardProvider>
      <div className="h-screen flex flex-col">
        <Header />
        <div className="flex flex-1 min-h-0">
          <aside className="hidden md:flex">
            <Sidebar variant="sidebar" />
          </aside>
          <main className="flex-1 p-7.5 pb-[1rem] overflow-y-auto">
            <Outlet />
          </main>
        </div>
        <footer className="md:hidden mt-auto sticky bottom-0">
          <Sidebar variant="footer" />
        </footer>
      </div>
    </DashboardProvider>
  );
}
