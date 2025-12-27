import { createContext, type ReactNode } from "react";
import { decodeJwt } from "../utils/decodeJwt";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface IDashboardContextData {
  userId: number | null;
  exp: number | null;
}

interface IDashboardCProviderProps {
  children: ReactNode;
}

const DashboardContext = createContext<IDashboardContextData | null>(null);

function DashboardProvider({ children }: IDashboardCProviderProps) {
  const { value } = useLocalStorage<string | null>("@finance:token", null);
  const decodeToken = decodeJwt(value || "");
  const userId = decodeToken?.userId || null;
  const exp = decodeToken?.exp || null;

  return (
    <DashboardContext.Provider value={{ userId, exp }}>
      {children}
    </DashboardContext.Provider>
  );
}

export { DashboardContext, DashboardProvider };
