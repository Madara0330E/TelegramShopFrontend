"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

// Создаём контекст аутентификации
const AuthContext = createContext();



export const AuthProvider = ({ children }) => {
  // Состояния
  const [authToken, setAuthToken] = useState(null);
  const [tgUser, setTgUser] = useState(null);
  const [apiUser, setApiUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isWebAppReady, setIsWebAppReady] = useState(false);
  const [authError, setAuthError] = useState(null);

  // Функция для получения данных пользователя
  const fetchUserData = useCallback(async (token) => {
    try {
      console.log("Fetching user data with token:", token); // Отладочная информация
      
      const response = await fetch("https://shop.chasman.engineer/api/v1/users/@me", {
        method: "GET",
        headers: {
          "accept": "*/*",
          "Authorization": `Bearer ${token}`,
          "Cache-Control": "no-cache",
        },
        credentials: "include", // Для работы с куками, если требуется
      });
      
      console.log("User data response status:", response.status); // Логируем статус
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("Error response data:", errorData);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const userData = await response.json();
      console.log("Received user data:", userData); // Логируем полученные данные
      
      setApiUser(userData);
      return true;
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      setAuthError(error.message);
      return false;
    }
  }, []);

  // Функция для валидации Telegram авторизации
  const validateTelegramAuth = useCallback(async (initData) => {
    try {
      console.log("Validating Telegram auth with initData:", initData); // Отладочная информация
      
      const response = await fetch("https://shop.chasman.engineer/api/v1/auth/validate-init", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "accept": "*/*",
        },
        body: JSON.stringify({ 
          initData: initData,
          // Дополнительные параметры, если нужны:
          platform: "web",
          version: "1.0",
        }),
      });
      
      console.log("Validation response status:", response.status); // Логируем статус
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("Error response data:", errorData);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Received auth data:", data); // Логируем полученные данные
      
      if (data.authToken) {
        // Сохраняем токен в состоянии и localStorage
        setAuthToken(data.authToken);
        localStorage.setItem('authToken', data.authToken);
        
        // Получаем данные пользователя
        const userFetchSuccess = await fetchUserData(data.authToken);
        
        // Если есть данные пользователя от Telegram, сохраняем их
        if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
          setTgUser(window.Telegram.WebApp.initDataUnsafe.user);
        }
        
        return userFetchSuccess;
      }
      
      return false;
    } catch (error) {
      console.error("Auth validation error:", error);
      setAuthError(error.message);
      return false;
    }
  }, [fetchUserData]);

  // Инициализация Telegram WebApp
  const initTelegramWebApp = useCallback(() => {
    try {
      const webApp = window.Telegram.WebApp;
      console.log("Initializing Telegram WebApp:", webApp); // Отладочная информация

      // Устанавливаем CSS-переменные для viewport
      document.documentElement.style.setProperty(
        '--tg-viewport-height', 
        `${webApp.viewportHeight}px`
      );
      document.documentElement.style.setProperty(
        '--tg-viewport-stable-height', 
        `${webApp.viewportStableHeight}px`
      );
      
      // Инициализируем WebApp
      webApp.ready();
      
      // Если есть данные для авторизации
      if (webApp.initData) {
        console.log("Telegram initData available:", webApp.initData);
        setIsLoading(true);
        setAuthError(null);
        
        validateTelegramAuth(webApp.initData)
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        console.log("No Telegram initData available");
        setIsLoading(false);
      }
      
      setIsWebAppReady(true);
    } catch (error) {
      console.error("Error initializing Telegram WebApp:", error);
      setIsLoading(false);
      setAuthError("Failed to initialize Telegram WebApp");
    }
  }, [validateTelegramAuth]);

  // Эффект для загрузки Telegram WebApp и проверки аутентификации
  useEffect(() => {
    const initializeAuth = async () => {
      // Проверяем, может WebApp уже загружен
      if (window.Telegram?.WebApp) {
        initTelegramWebApp();
        return;
      }

      // Если нет, загружаем скрипт
      const script = document.createElement("script");
      script.src = "https://telegram.org/js/telegram-web-app.js";
      script.async = true;
      
      script.onload = () => {
        if (window.Telegram?.WebApp) {
          initTelegramWebApp();
        } else {
          console.error("Telegram WebApp script loaded but window.Telegram not available");
          setIsLoading(false);
          setAuthError("Failed to load Telegram WebApp");
        }
      };
      
      script.onerror = () => {
        console.error("Failed to load Telegram WebApp script");
        setIsLoading(false);
        setAuthError("Failed to load Telegram WebApp");
      };
      
      document.body.appendChild(script);

      // Проверяем сохранённый токен, если Telegram не загружен
      const savedToken = localStorage.getItem('authToken');
      if (savedToken && !window.Telegram?.WebApp) {
        console.log("Found saved token, trying to fetch user data");
        setIsLoading(true);
        fetchUserData(savedToken)
          .then((success) => {
            if (!success) {
              localStorage.removeItem('authToken');
              setAuthToken(null);
            }
          })
          .finally(() => setIsLoading(false));
      } else {
        setIsLoading(false);
      }

      return () => {
        if (script.parentNode) {
          document.body.removeChild(script);
        }
      };
    };

    initializeAuth();
  }, [initTelegramWebApp, fetchUserData]);

  // Выход из системы
  const logout = useCallback(() => {
    setAuthToken(null);
    setApiUser(null);
    setTgUser(null);
    localStorage.removeItem('authToken');
  }, []);

  // Предоставляем значения контекста
  const contextValue = {
    authToken,
    tgUser,
    apiUser,
    isLoading,
    isWebAppReady,
    authError,
    isAuthenticated: !!authToken,
    logout,
    refreshAuth: () => {
      if (authToken) {
        return fetchUserData(authToken);
      }
      return Promise.resolve(false);
    },
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Хук для использования контекста аутентификации
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};