// src/app/page.js
"use client";
import CategoriesList from "./components/CategoriesList";
import { useAuth } from "./context/AuthContext";
import "./globals.css";
import ForYouList from "./components/ForYouList";
export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <div className="flex flex-col  min-h-screen bg-[#0E0D10]">
      <CategoriesList />
      <ForYouList />
      <p className="inter-tight font-salt font-ss03 font-cv01">Текст</p>

      <p className="inter-tight font-inter-features">Текст</p>
      <div className="font-inter-tight font-thin">Thin 100</div>
      <div className="font-inter-tight font-extralight">Extra Light 200</div>
      <div className="font-inter-tight font-light">Light 300</div>
      <div className="font-inter-tight font-normal">Regular 400</div>
      <div className="font-inter-tight font-medium">Medium 500</div>
      <div className="font-inter-tight font-semibold">Semi Bold 600</div>
      <div className="font-inter-tight font-bold">Bold 700</div>
      <div className="font-inter-tight font-extrabold">Extra Bold 800</div>
      <div className="font-inter-tight font-black">Black 900</div>

      <div className="font-inter-tight font-normal italic">Italic</div>
      <div className="font-inter-tight font-bold italic">Bold Italic</div>
      <h1 className="text-3xl font-bold text-gray-800">
        Welcome to Telegram Mini App
      </h1>

      {isLoading ? (
        <p className="mt-4 bg-[#18172E]">Loading...</p>
      ) : isAuthenticated ? (
        <div className="mt-6 p-4 bg-white shadow-md rounded-lg">
          <p className="text-green-600">✅ Авторизация успешна!</p>
        </div>
      ) : (
        <div className="mt-6 p-4 bg-[#18172E] shadow-md rounded-lg">
          <p className="text-red-600">❌ Ошибка авторизации</p>
        </div>
      )}
    </div>
  );
}
