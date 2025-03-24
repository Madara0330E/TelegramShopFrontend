"use client";

import { AuthProvider } from "../app/context/AuthContext";
import Header from "./components/Header";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="m-0 font-sans bg-[#18172E] min-h-screen flex flex-col">
        <AuthProvider> {/* Провайдер должен оборачивать ВСЁ приложение */}
          <header className="lg:col-start-2 lg:row-start-1 h-[68px] bg-[#18172E] flex w-full justify-between items-center">
            <div className="w-full text-white">
              <Header />
            </div>
          </header>
          <div className="min-h-screen bg-[#18172E]"> {/* Здесь меняете цвет */}
      {children}
    </div>
        </AuthProvider>
      </body>
    </html>
  );
}