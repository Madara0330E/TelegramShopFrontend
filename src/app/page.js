"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CategoriesList from "./components/CategoriesList";
import { useAuth } from "./context/AuthContext";
import "./globals.css";
import ForYouList from "./components/ForYouList";

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      window.location.href = 'https://t.me/TGChadBot?startapp';
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-[#3A36DB] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-white text-lg font-medium">Подгрузка данных...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0E0D10]">
      <CategoriesList dataLoaded={dataLoaded} setDataLoaded={setDataLoaded} />
      <ForYouList dataLoaded={dataLoaded} />
    </div>
  );
}