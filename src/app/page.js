"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [validationMessage, setValidationMessage] = useState("Проверка...");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      console.log("Telegram WebApp is available");
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
        },
        body: JSON.stringify({ InitData: initData }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Validation Response:", data);
          setValidationMessage(data.valid ? "✅ Валидация успешна!" : `❌ Ошибка: ${data.error}`);
        })
        .catch((error) => {
          console.error("Ошибка при отправке данных на сервер:", error);
          setValidationMessage("Ошибка при проверке пользователя.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      console.error("Telegram WebApp is not available");
      setValidationMessage("Ошибка: Telegram WebApp недоступен!");
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