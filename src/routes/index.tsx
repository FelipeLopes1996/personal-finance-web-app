import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../pages/layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import { PrivateRoutesLayout } from "./PrivateRoutesLayout";
import DashboardLayout from "../pages/layouts/DashboardLayout";
import Profile from "@/pages/Profile";
import Category from "@/pages/Category";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    element: <PrivateRoutesLayout />, // wrapper de rotas privadas
    children: [
      {
        element: <DashboardLayout />, // layout do dashboard
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "profile", element: <Profile /> },
          { path: "category", element: <Category /> },
          // { path: "settings", element: <Settings /> }, // /dashboard/settings
        ],
      },
    ],
  },
]);
