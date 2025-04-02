"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartData {
  items: CartItem[];
}

export default function CartPage() {
  const { authToken } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authToken) {
      console.log("No authToken available");
      return;
    }

    console.log("Fetching cart items with token:", authToken);

    setIsLoading(true);
    setError(null);

    fetch("https://shop.chasman.engineer/api/v1/cart", {
      headers: {
        Authorization: `${authToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data: CartData) => {
        console.log("Fetched cart data:", data);
        if (data.items && Array.isArray(data.items)) {
          setCartItems(data.items);
        } else {
          console.error("Unexpected data format:", data);
          setCartItems([]);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch cart items:", err);
        setError("Failed to fetch cart items. Please try again later.");
        setIsLoading(false);
      });
  }, [authToken]);

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
            onClick={() => window.location.reload()}
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
          <img src="/img/Arrow.svg" alt="Back" className="w-6 h-6" />
        </Link>
        <div className="flex items-center">
          <span className="text-white text-2xl font-semibold">Корзина</span>
          {cartItems.length > 0 && (
            <sup className="text-white text-lg ml-1 font-semibold">
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
          <div className="text-center w-2/3 max-w-md">
            <p className="text-white text-xl font-semibold">Тут пусто и грустно</p>
            <p className="text-gray-400 text-lg mt-2">Наполни корзину товарами из каталога</p>
            <Link 
              href="/" 
              className="mt-6 inline-block bg-blue-500 text-white px-6 py-3 rounded-md font-medium"
            >
              В каталог
            </Link>
          </div>
        </main>
      )}
    </div>
  );
}
