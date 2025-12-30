import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import { useAuthGuard } from "../../hooks/useAuthGuard";

export default function MainLayout() {
  useAuthGuard();
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex-1 overflow-y-auto pb-[4rem]">
        <Outlet />
      </main>
      <footer className="w-full py-8 bg-teal-50 mt-auto sticky bottom-0">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center gap-2 mb-2">
            <span className="text-lg font-semibold  text-teal-600">
              Controle de finanças (dps add um icone)
            </span>
          </div>
          <p className="text-sm text-center dark:text-gray-500">
            © 2025 Controle de finançs by Felipe & Mayara. Todos os direitos
            reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
