"use client";
import { Inter_Tight, Montserrat_Alternates } from 'next/font/google';
import { AuthProvider } from "../app/context/AuthContext";
import Header from "./components/Header";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: '500', // Указываем один вес
  variable: '--font-inter-tight',
  display: 'swap',
});

const montserratAlternates = Montserrat_Alternates({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-montserrat-alternates',
  weight: '400', // Один вес или массив нужных весов
  // Если нужно несколько весов:
  // weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserratAlternates.variable} ${interTight.variable} bg-primary-dark`}>
      <head>
        <script src="https://telegram.org/js/telegram-web-app.js" async />
      </head>
      <body className="m-0  min-h-screen flex flex-col bg-[#0E0D10]">
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