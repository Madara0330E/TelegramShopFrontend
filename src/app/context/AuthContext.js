"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [tgUser, setTgUser] = useState(null);
  const [apiUser, setApiUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isWebAppReady, setIsWebAppReady] = useState(false);
  const [authError, setAuthError] = useState(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://shop.chasman.engineer/api/v1";

  const fetchUserData = useCallback(async (token) => {
    setIsLoading(true);
    setAuthError(null);
    
    try {
      console.log("Starting to fetch user data with token:", token);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(`${API_BASE_URL}/users/@me`, {
        method: "GET",
        headers: {
          "accept": "application/json",
          "Authorization": `Bearer ${token}`,
          "Cache-Control": "no-cache",
        },
        signal: controller.signal,
        credentials: "include",
      });

      clearTimeout(timeoutId);

      console.log("User data fetch response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: `HTTP error! status: ${response.status}`
        }));
        console.error("Error response data:", errorData);
        throw new Error(errorData.message || "Failed to fetch user data");
      }

      const userData = await response.json();
      console.log("Successfully fetched user data:", userData);

      setApiUser(userData);
      return true;
    } catch (error) {
      console.error("Error in fetchUserData:", {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      
      setAuthError(error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [API_BASE_URL]);

  const validateTelegramAuth = useCallback(async (initData) => {
    setIsLoading(true);
    setAuthError(null);
    
    try {
      console.log("Validating Telegram auth with initData:", initData);

      if (!initData || typeof initData !== "string" || !initData.includes("hash=")) {
        throw new Error("Invalid Telegram initData format");
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(`${API_BASE_URL}/auth/validate-init`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "accept": "application/json",
        },
        body: JSON.stringify({ 
          initData,
          platform: "web",
          version: "1.0",
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      console.log("Telegram auth validation response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: `HTTP error! status: ${response.status}`
        }));
        console.error("Error response data:", errorData);
        throw new Error(errorData.message || "Telegram auth validation failed");
      }

      const data = await response.json();
      console.log("Telegram auth response data:", data);

      if (!data.authToken) {
        throw new Error("No auth token received from server");
      }

      setAuthToken(data.authToken);
      localStorage.setItem('authToken', data.authToken);
      sessionStorage.setItem('tgAuthData', JSON.stringify(data));

      const userFetchSuccess = await fetchUserData(data.authToken);
      
      if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
        setTgUser(window.Telegram.WebApp.initDataUnsafe.user);
      }

      return userFetchSuccess;
    } catch (error) {
      console.error("Error in validateTelegramAuth:", {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      
      setAuthError(error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [API_BASE_URL, fetchUserData]);

  const initTelegramWebApp = useCallback(() => {
    try {
      const webApp = window.Telegram.WebApp;
      console.log("Initializing Telegram WebApp:", webApp);

      if (!webApp) {
        throw new Error("Telegram WebApp not available");
      }

      document.documentElement.style.setProperty(
        '--tg-viewport-height', 
        `${webApp.viewportHeight}px`
      );
      document.documentElement.style.setProperty(
        '--tg-viewport-stable-height', 
        `${webApp.viewportStableHeight}px`
      );

      webApp.ready();
      console.log("Telegram WebApp ready");

      if (webApp.initData) {
        console.log("Found Telegram initData, starting validation");
        setIsLoading(true);
        setAuthError(null);
        
        validateTelegramAuth(webApp.initData)
          .catch(error => {
            console.error("Telegram auth validation error:", error);
          });
      } else {
        console.log("No Telegram initData available");
        const savedToken = localStorage.getItem('authToken');
        if (savedToken) {
          console.log("Found saved token, fetching user data");
          fetchUserData(savedToken).catch(error => {
            console.error("Failed to fetch user with saved token:", error);
          });
        }
      }

      setIsWebAppReady(true);
    } catch (error) {
      console.error("Error initializing Telegram WebApp:", {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      
      setAuthError(error.message);
      setIsLoading(false);
    }
  }, [validateTelegramAuth, fetchUserData]);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (window.Telegram?.WebApp) {
          initTelegramWebApp();
          return;
        }

        console.log("Loading Telegram WebApp script");
        const script = document.createElement("script");
        script.src = "https://telegram.org/js/telegram-web-app.js";
        script.async = true;
        script.onload = () => {
          console.log("Telegram WebApp script loaded");
          if (window.Telegram?.WebApp) {
            initTelegramWebApp();
          } else {
            console.error("Telegram WebApp not available after script load");
            setAuthError("Failed to initialize Telegram WebApp");
            setIsLoading(false);
          }
        };
        script.onerror = (error) => {
          console.error("Failed to load Telegram WebApp script:", error);
          setAuthError("Failed to load Telegram WebApp");
          setIsLoading(false);
        };
        document.body.appendChild(script);

        return () => {
          if (script.parentNode) {
            document.body.removeChild(script);
          }
        };
      } catch (error) {
        console.error("Error in auth initialization:", {
          name: error.name,
          message: error.message,
          stack: error.stack
        });
        
        setAuthError(error.message);
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [initTelegramWebApp]);

  const logout = useCallback(() => {
    console.log("Logging out");
    setAuthToken(null);
    setApiUser(null);
    setTgUser(null);
    setAuthError(null);
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('tgAuthData');
  }, []);

  const refreshAuth = useCallback(async () => {
    if (!authToken) return false;
    console.log("Refreshing auth");
    return await fetchUserData(authToken);
  }, [authToken, fetchUserData]);

  const contextValue = {
    authToken,
    tgUser,
    apiUser,
    isLoading,
    isWebAppReady,
    authError,
    isAuthenticated: !!authToken,
    logout,
    refreshAuth,
  };

  return (
    <AuthContext.Provider value={contextValue}>
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