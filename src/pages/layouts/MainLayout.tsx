import { Link, Outlet } from "react-router-dom";
import Header from "../../components/Header";
import { useAuthGuard } from "../../hooks/useAuthGuard";
import logoIconName from "../../assets/icon-logo-name-removebg.png";
import { useAuth } from "@/hooks/useAuth";

export default function MainLayout() {
  useAuthGuard();
  const { token } = useAuth();
  const validHomeRedirect = token ? "" : "/";
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex-1 overflow-y-auto pb-[4rem]">
        <Outlet />
      </main>
      <footer className="w-full pb-8 pt-0 bg-teal-50 mt-auto sticky bottom-0">
        <div className="container mx-auto">
          <div className="flex justify-center items-center gap-2 ">
            <Link
              // className="block bg-teal-600 w-[3rem] h-[3rem] rounded-[50%] p-[5px]"
              className="flex items-center justify-center  w-[10rem] h-[5rem] p-0.5 "
              to={validHomeRedirect}
            >
              <img
                src={logoIconName}
                alt="LOGO"
                className="w-full h-full object-cover"
              />
            </Link>
          </div>
          <p className="text-sm text-center dark:text-gray-500">
            © 2025 Cashflow by Felipe & Mayara. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
