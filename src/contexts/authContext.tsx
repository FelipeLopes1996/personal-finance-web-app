import { clearStorage } from "@/utils/clearStorage";
import { createContext, useEffect, useState, type ReactNode } from "react";

interface IAuthContextType {
  token: string | null;
  logout: () => void;
  handleChangeToken: (value: string) => void;
}

interface IAuthProvider {
  children: ReactNode;
}

const AuthContext = createContext<IAuthContextType | null>(null);

function AuthProvider({ children }: IAuthProvider) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("@finance:token");
    setToken(storedToken);
  }, []);

  const logout = () => {
    clearStorage();
    setToken(null);
  };
  const handleChangeToken = (value: string) => {
    setToken(value);
  };

  return (
    <AuthContext.Provider value={{ token, logout, handleChangeToken }}>
      {children}
    </AuthContext.Provider>
  );
}
export { AuthContext, AuthProvider };
