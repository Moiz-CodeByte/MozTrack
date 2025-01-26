"use client";

import { useRouter } from "next/navigation";  // Import useRouter
import React, { createContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter(); // Initialize useRouter hook

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    router.push("/");  // Redirect to homepage using useRouter
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};