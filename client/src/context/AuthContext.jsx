import { createContext, useContext, useEffect, useState } from "react";
import http from "../api/http";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      const token = localStorage.getItem("junklife_token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await http.get("/auth/me");
        setUser(data.data);
      } catch {
        localStorage.removeItem("junklife_token");
      } finally {
        setLoading(false);
      }
    };

    bootstrap();
  }, []);

  const login = (payload) => {
    localStorage.setItem("junklife_token", payload.token);
    setUser(payload.user);
  };

  const logout = () => {
    localStorage.removeItem("junklife_token");
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
