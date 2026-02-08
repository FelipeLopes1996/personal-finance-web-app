import { Link, useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useAuth } from "@/hooks/useAuth";
import logo from "../../assets/icon-logo-removebg.png";

const Header = () => {
  useAuthGuard();
  const navigate = useNavigate();
  const { token, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const validHomeRedirect = token ? "" : "/";

  return (
    <header className=" bg-teal-50 border-b-1 border-[#e5e5e5]">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12 rounded-full overflow-hidden">
            <Link
              className="flex items-center justify-center  w-[3rem] h-[3rem] p-0.5 rounded-full"
              to={validHomeRedirect}
            >
              <img
                src={logo}
                alt="LOGO"
                className="w-full h-full object-contain"
              />
            </Link>
          </div>
          {token ? (
            <div className="md:flex md:items-center md:gap-12">
              <Button
                onClick={handleLogout}
                className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm"
              >
                Sair
              </Button>
            </div>
          ) : (
            <div className="md:flex md:items-center md:gap-12">
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm"
                >
                  Entrar
                </Link>

                <Link
                  to="/register"
                  className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
                >
                  Registrar
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
