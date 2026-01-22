import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { decodeJwt } from "../utils/decodeJwt";
import { isTokenExpired } from "../utils/isTokenExpired";
import { clearStorage } from "../utils/clearStorage";
import { useAuth } from "./useAuth";

const PUBLIC_ROUTES = ["/", "/login", "/register"];

export function useAuthGuard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const rawToken = localStorage.getItem("@finance:token");

    // 🔴 NÃO LOGADO
    if (!rawToken) {
      // tenta acessar rota privada
      if (!PUBLIC_ROUTES.includes(pathname)) {
        navigate("/", { replace: true });
      }
      return;
    }

    const token = decodeJwt(rawToken);

    // 🔴 TOKEN EXPIRADO
    if (isTokenExpired(token?.exp || 0)) {
      clearStorage();
      logout();
      navigate("/", { replace: true });
      return;
    }

    // 🟢 LOGADO tentando acessar rota pública
    if (PUBLIC_ROUTES.includes(pathname)) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate, pathname]);
}
