// src/context/AuthContext.js
"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [tgUser, setTgUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Функция для проверки авторизации через Telegram
  const validateTelegramAuth = async (initData) => {
    try {
      const response = await fetch("https://shop.chasman.engineer/api/v1/auth/validate-init", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "accept": "*/*",
        },
        body: JSON.stringify({ initData }),
      });
      
      const data = await response.json();
      if (data.authToken) {
        setAuthToken(data.authToken);
        // Здесь можно добавить парсинг данных пользователя из Telegram
        return true;
      }
      return false;
    } catch (error) {
      console.error("Auth error:", error);
      return false;
    }
  };

  // Инициализация Telegram WebApp
  const initTelegramWebApp = () => {
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      const webApp = window.Telegram.WebApp;
      webApp.ready();
      
      if (webApp.initData) {
        setIsLoading(true);
        validateTelegramAuth(webApp.initData).finally(() => {
          setIsLoading(false);
        });
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.Telegram?.WebApp) {
        initTelegramWebApp();
      } else {
        const script = document.createElement("script");
        script.src = "https://telegram.org/js/telegram-web-app.js";
        script.async = true;
        script.onload = initTelegramWebApp;
        document.body.appendChild(script);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ 
      authToken, 
      tgUser, 
      isLoading, 
      isAuthenticated: !!authToken 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};