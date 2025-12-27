import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { DashboardProvider } from "../../contexts/userContext";
import Header from "../../components/Header";
import { decodeJwt } from "../../utils/decodeJwt";
import { isTokenExpired } from "../../utils/isTokenExpired";
import { useEffect } from "react";
import { clearStorage } from "../../utils/clearStorage";

const ROUTES_NOT_PROTECT = ["/", "login", "register"];

function isProtectedRoute(pathname: string) {
  return ROUTES_NOT_PROTECT.includes(pathname);
}

export default function DashboardLayout() {
  const token = decodeJwt(localStorage.getItem("@finance:token") || "");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(
    () => () => {
      if (
        token &&
        isTokenExpired(token?.exp || 0) &&
        !isProtectedRoute(pathname)
      ) {
        clearStorage();
        navigate("/");
      }
    },
    [navigate, pathname, token, token?.exp]
  );
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
