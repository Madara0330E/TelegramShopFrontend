// src/app/context/CartContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  isLoading: boolean;
  error: string | null;
  refreshCart: () => void;
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  isLoading: true,
  error: null,
  refreshCart: () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = async (authToken?: string) => {
    if (!authToken) {
      console.log("No authToken available");
      setCartItems([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://shop.chasman.engineer/api/v1/cart", {
        headers: {
          Authorization: `${authToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched cart data:", data);
      
      if (data.items && Array.isArray(data.items)) {
        setCartItems(data.items);
      } else {
        console.error("Unexpected data format:", data);
        setCartItems([]);
      }
    } catch (err) {
      console.error("Failed to fetch cart items:", err);
      setError("Failed to fetch cart items. Please try again later.");
      setCartItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshCart = () => {
    const authToken = localStorage.getItem("authToken");
    fetchCart(authToken || undefined);
  };

  useEffect(() => {
    // Initial fetch
    const authToken = localStorage.getItem("authToken");
    fetchCart(authToken || undefined);
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, isLoading, error, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);