import { Outlet } from "react-router-dom";
import Header from "../../components/Header";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="py-8 text-center  border-t border-gray-300">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center gap-2 mb-2">
            <span className="text-lg font-semibold  text-teal-600">
              Controle de finanças (dps add um icone)
            </span>
          </div>
          <p className="text-sm text-muted-foreground dark:text-gray-500">
            © 2025 Controle de finançs by Felipe & Mayara. Todos os direitos
            reservados.
          </p>
          <div className="mt-3 space-x-4">
            {/* <a
              className="text-xs text-muted-foreground hover:text-primary dark:hover:text-primary-foreground"
              href="/terms-of-service"
            >
              Termos de Serviço
            </a>
            <a
              className="text-xs text-muted-foreground hover:text-primary dark:hover:text-primary-foreground"
              href="/privacy-policy"
            >
              Política de Privacidade
            </a> */}
          </div>
        </div>
      </footer>
    </div>
  );
}
