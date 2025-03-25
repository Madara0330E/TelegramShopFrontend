"use client";
import { Inter_Tight, Montserrat_Alternates } from 'next/font/google';
import { AuthProvider } from "../app/context/AuthContext";
import Header from "./components/Header";
import "./globals.css";
import { useEffect, useState } from 'react';

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: '500',
  variable: '--font-inter-tight',
  display: 'swap',
});

const montserratAlternates = Montserrat_Alternates({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-montserrat-alternates',
  weight: '400',
});

export default function RootLayout({ children }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <html 
      lang="en" 
      className={`${montserratAlternates.variable} ${interTight.variable} bg-[#0E0D10]`}
      suppressHydrationWarning
      style={isClient ? {} : {
        // Статические значения для SSR
        '--tg-viewport-height': '100vh',
        '--tg-viewport-stable-height': '100vh'
      }}
    >
      <head>
        {/* Удаляем прямой script и переносим в AuthProvider */}
      </head>
      <body className="m-0 min-h-screen flex flex-col bg-[#0E0D10]">
        <AuthProvider>
          <header className="sticky top-0 z-50 h-[68px] w-full">
            <div className="w-full text-white">
              <Header />
            </div>
          </header>
          
          <main className="flex-1 bg-[#0E0D10] min-h-screen">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}