import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../pages/layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import { PrivateRoutesLayout } from "./PrivateRoutesLayout";
import DashboardLayout from "../pages/layouts/DashboardLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        element: <PrivateRoutesLayout />, // wrapper de rotas privadas
        children: [
          {
            path: "dashboard",
            element: <DashboardLayout />, // layout do dashboard
            children: [
              { index: true, element: <Dashboard /> }, // /dashboard
              // { path: "profile", element: <Profile /> },   // /dashboard/profile
              // { path: "settings", element: <Settings /> }, // /dashboard/settings
            ],
          },
        ],
      },
    ],
  },
]);
