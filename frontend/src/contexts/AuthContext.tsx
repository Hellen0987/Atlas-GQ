import React, { createContext, useContext, useState, useEffect } from "react";
import API, { setAuthToken } from "../services/api";

interface AuthContextType {
  token: string | null;
  user: any | null;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [user, setUser] = useState<any>(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null);

  useEffect(() => {
    setAuthToken(token || undefined);
  }, [token]);

  async function login(email: string, senha: string) {
    const res = await API.post("/auth/login", { email, senha });
    const { token: t, user: u } = res.data;
    setToken(t);
    setUser(u);
    localStorage.setItem("token", t);
    localStorage.setItem("user", JSON.stringify(u));
    setAuthToken(t);
  }

  function logout() {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthToken(undefined);
  }

  return <AuthContext.Provider value={{ token, user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
