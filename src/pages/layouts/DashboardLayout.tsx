import { Outlet } from "react-router-dom";
import { DashboardProvider } from "../../contexts/userContext";
import Header from "../../components/Header";
import { useAuthGuard } from "../../hooks/useAuthGuard";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout() {
  useAuthGuard();
  return (
    <DashboardProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex flex-1">
          <aside className="hidden md:flex">
            <Sidebar variant="sidebar" />
          </aside>
          <main className="flex-1 p-7.5">
            <Outlet />
          </main>
        </div>
        <footer className="md:hidden fixed bottom-0 left-0 right-0 z-50">
          <Sidebar variant="footer" />
        </footer>
      </div>
    </DashboardProvider>
  );
}
