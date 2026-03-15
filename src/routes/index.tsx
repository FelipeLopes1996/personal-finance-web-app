import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../pages/layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Expense from "../pages/Expense";
import { PrivateRoutesLayout } from "./PrivateRoutesLayout";
import DashboardLayout from "../pages/layouts/DashboardLayout";
import Profile from "@/pages/Profile";
import Category from "@/pages/Category";
import Dashboard from "@/pages/Dashboard";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password", element: <ResetPassword /> },
    ],
  },
  {
    element: <PrivateRoutesLayout />, // wrapper de rotas privadas
    children: [
      {
        element: <DashboardLayout />, // layout do dashboard
        children: [
          { path: "expense", element: <Expense /> },
          { path: "dashboard", element: <Dashboard /> },
          { path: "profile", element: <Profile /> },
          { path: "category", element: <Category /> },
          // { path: "settings", element: <Settings /> }, // /dashboard/settings
        ],
      },
    ],
  },
]);
