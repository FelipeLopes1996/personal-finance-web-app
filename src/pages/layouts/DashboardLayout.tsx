import { Outlet } from "react-router-dom";
import { DashboardProvider } from "../../contexts/userContext";
import Header from "../../components/Header";
import { useAuthGuard } from "../../hooks/useAuthGuard";

export default function DashboardLayout() {
  useAuthGuard();
  return (
    <DashboardProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </DashboardProvider>
  );
}
