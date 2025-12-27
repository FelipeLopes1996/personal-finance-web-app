import { Outlet, Navigate } from "react-router-dom";

export const PrivateRoutesLayout = () => {
  const token = localStorage.getItem("@finance:token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; // renderiza todas as rotas privadas
};
