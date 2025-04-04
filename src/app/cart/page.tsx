// src/app/cart/page.tsx
"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cartItems, isLoading, error, refreshCart } = useCart();

  if (isLoading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="bg-red-500/20 p-6 rounded-lg max-w-md">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p className="text-red-500">{error}</p>
          <button 
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            onClick={refreshCart}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex p-4 justify-between items-center">
        <Link href="/" className="p-2">
          <img src="/img/Arrow.svg" alt="Back" className="w-[4.167vw] h-[3.646vw]" />
        </Link>
        <div className="flex items-center">
          <span className="text-[#EFEDF6] text-[6.25vw] font-semibold leading-normal [font-feature-settings:'salt'_on,'ss03'_on,'cv01'_on] font-inter-tight">Корзина</span>
          {cartItems.length > 0 && (
            <sup className="text-[#EFEDF6] text-[4.167vw] ml-[1.042vw] font-semibold leading-normal [font-feature-settings:'salt'_on,'ss03'_on,'cv01'_on] font-inter-tight">
              {cartItems.length}
            </sup>
          )}
        </div>
        <div className="w-6"></div>
      </header>

      {cartItems.length > 0 ? (
        <main className="flex-grow p-4">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.product.id} className="p-4 bg-gray-800 rounded-lg">
                <p className="text-white font-medium">{item.product.name}</p>
                <p className="text-gray-400">{item.quantity} × {item.product.price} ₽</p>
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 bg-gray-700 rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="text-gray-300">Итого:</span>
              <span className="font-bold text-white">
                {cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0)} ₽
              </span>
            </div>
            <button className="w-full bg-blue-500 text-white py-3 rounded-md font-medium mt-2">
              Оформить заказ
            </button>
          </div>
        </main>
      ) : (
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center w-[66.667vw]">
             <p className="text-[#EFEDF6] text-[4.167vw] font-inter-tight font-semibold leading-normal">Тут пусто и грустно</p>
             <p className="text-[#EFEDF6] opacity-50 text-[4.167vw] font-inter-tight font-medium leading-normal">Наполни корзину товарами из каталога</p>
           </div>
        </main>
      )}
    </div>
  );
}