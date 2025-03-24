"use client";

import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import "../globals.css";

export default function Header() {
  const { authToken, tgUser, apiUser, isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-web-app.js?56";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <header className="flex p-2 py-2 justify-between w-full items-center self-stretch border-b border-[#2A282E] bg-[#0E0D10]">
      <div className="HeaderLogo  bg-[#0E0D10] w-full ">
        <img src="/img/Header/Shop.svg" alt="" />
      </div>
      <div className="flex justify-end items-center gap-[26px]">
        <div className="Purchases flex">
          <img src="/img/Header/Purchases.svg"  className="min-w-[26px] h-[20px] " alt="" />
        </div>
        <div className="flex w-[48px] h-[48px] justify-center items-center">
          {isLoading ? (
            <div className=""></div>
          ) : isAuthenticated ? (
            <div className="flex items-center gap-2">
              {apiUser?.avatarUrl ? (
                <img 
                  src={apiUser.avatarUrl} 
                  alt="User" 
                  className="w-12 h-12 rounded-full"
                />
              ) : tgUser?.photo_url ? (
                <img 
                  src={tgUser.photo_url} 
                  alt="User" 
                  className="w-12 h-12 rounded-full"
                />
              ) : (
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white">
                  {tgUser?.first_name?.[0]}
                </div>
              )}
            </div>
          ) : (
            <div className="text-white">Not auth</div>
          )}
        </div>
      </div>
    </header>
  );
}