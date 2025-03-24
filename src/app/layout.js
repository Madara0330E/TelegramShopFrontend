"use client";

import { AuthProvider } from "../app/context/AuthContext";
import Header from "./components/Header";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-[#18172E]">
      <head>
        {/* Мета-теги и скрипты */}
        <script src="https://telegram.org/js/telegram-web-app.js" async />
      </head>
      <body className="m-0 font-sans min-h-screen flex flex-col bg-[#18172E]">
        <AuthProvider>
          <header className="sticky top-0 z-50 h-[68px] bg-[#18172E] w-full">
            <div className="w-full text-white">
              <Header />
            </div>
          </header>
          
          <main className="flex-1">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}