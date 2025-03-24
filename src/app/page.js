"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [validationMessage, setValidationMessage] = useState("Проверка...");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkTelegramWebApp = () => {
        if (window.Telegram && window.Telegram.WebApp) {
          console.log("Telegram WebApp найден");
          const webApp = window.Telegram.WebApp;
          webApp.ready();
          console.log("WebApp is ready");

          const initData = webApp.initData;
          console.log("Init Data:", initData);

          if (!initData || initData.length === 0) {
            console.error("Ошибка: Нет данных initData от Telegram.");
            setValidationMessage("Ошибка: нет данных от Telegram!");
            return;
          }

          setIsLoading(true);
          setValidationMessage("Проверка...");

          fetch("https://shop.chasman.engineer/api/v1/auth/validate-init", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "accept": "*/*",
            },
            body: JSON.stringify({ initData }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Validation Response:", data);
              
              if (data.authToken) {
                setValidationMessage("✅ Валидация успешна! Токен получен.");
              } else {
                setValidationMessage(`❌ Ошибка: ${data.error || "Неизвестная ошибка"}`);
              }
            })
            .catch((error) => {
              console.error("Ошибка при отправке данных на сервер:", error);
              setValidationMessage("Ошибка при проверке пользователя.");
            })
            .finally(() => {
              setIsLoading(false);
            });
        } else {
          console.error("Ошибка: Telegram WebApp недоступен!");
          setValidationMessage("Ошибка: Telegram WebApp недоступен!");
        }
      };

      if (window.Telegram && window.Telegram.WebApp) {
        checkTelegramWebApp();
      } else {
        const script = document.createElement("script");
        script.src = "https://telegram.org/js/telegram-web-app.js";
        script.async = true;
        script.onload = checkTelegramWebApp;
        document.body.appendChild(script);
      }
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800">Welcome to Telegram Mini App</h1>
      <p className="mt-4 text-gray-600">This is a mini app built with React, Next.js, and Tailwind CSS.</p>
      {isLoading && <p className="mt-4 text-blue-600">Loading...</p>}
      <div className="mt-6 p-4 bg-white shadow-md rounded-lg">
        <p className={validationMessage.startsWith("✅") ? "text-green-600" : "text-red-600"}>{validationMessage}</p>
      </div>
    </div>
  );
}
