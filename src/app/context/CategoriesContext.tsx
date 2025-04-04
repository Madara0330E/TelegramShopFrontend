// src/app/context/CategoriesContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Category, fetchCategories } from "../components/categoryApi";

interface CategoriesContextType {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  refreshCategories: () => void;
}

const CategoriesContext = createContext<CategoriesContextType>({
  categories: [],
  isLoading: true,
  error: null,
  refreshCategories: () => {},
});

export function CategoriesProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategoriesData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshCategories = () => {
    fetchCategoriesData();
  };

  useEffect(() => {
    fetchCategoriesData();
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories, isLoading, error, refreshCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
}

export const useCategories = () => useContext(CategoriesContext);