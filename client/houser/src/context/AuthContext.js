import React, { createContext, useContext, useState } from "react";
const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    localStorage.getItem("user") !== null
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("user") !== null ? true : false
  );
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("user") !== null
      ? JSON.parse(localStorage.getItem("user")).isAdmin
      : false
  );
  const login = (data) => {
    setIsLoggedIn(true);
    setIsAdmin(data.entity.isAdmin);
    setUser(data.entity);
    localStorage.setItem("token", data.entity.token);
    localStorage.setItem("user", JSON.stringify(data.entity));
  };
  const logout = async () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };
  const values = { isAdmin, isLoggedIn, login, logout, user };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
