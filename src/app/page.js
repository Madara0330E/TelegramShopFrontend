// src/app/page.js
"use client";
import CategoriesList from './components/CategoriesList';
import { useAuth } from "./context/AuthContext";
import "./globals.css";
export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0E0D10]">
        <CategoriesList />
      <h1 className="text-3xl font-bold text-gray-800">Welcome to Telegram Mini App</h1>
      
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