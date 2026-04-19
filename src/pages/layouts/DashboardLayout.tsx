import { Outlet } from "react-router-dom";
import { DashboardProvider } from "../../contexts/userContext";
import Header from "../../components/Header";
import { useAuthGuard } from "../../hooks/useAuthGuard";
import Sidebar from "@/components/Sidebar";
import { IaChatProvider } from "@/contexts/iaChatContext";
import IaChatWidget from "@/components/IaChatWidget";
import { useLocation } from "react-router-dom";

export default function DashboardLayout() {
  useAuthGuard();
  const location = useLocation();
  const isChatRoute = location.pathname === "/ia-chat";
  return (
    <DashboardProvider>
      <IaChatProvider>
        <div className="h-screen flex flex-col">
          <Header />
          <div className="flex flex-1 min-h-0">
            <aside className="hidden md:flex">
              <Sidebar variant="sidebar" />
            </aside>
            <main className="flex-1 p-7.5 pb-[4rem] overflow-y-auto">
              <Outlet />
            </main>
          </div>
          <footer className="md:hidden mt-auto sticky bottom-0">
            <Sidebar variant="footer" />
          </footer>
          {isChatRoute ? null : <IaChatWidget />}
        </div>
      </IaChatProvider>
    </DashboardProvider>
  );
}
