import { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const login = async (username, password) => {
    const res = await axios.post(
      "http://localhost:8000/api/auth/token/",
      { username, password }
    );

    const access = res.data.access;
    const refresh = res.data.refresh;

    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);

    const me = await axios.get(
      "http://localhost:8000/api/auth/me/",
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );

    localStorage.setItem("user", JSON.stringify(me.data));
    localStorage.setItem("is_admin", me.data.is_superuser);

    setUser(me.data);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}