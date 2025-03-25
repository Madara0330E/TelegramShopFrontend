import React, { createContext, useState, useEffect, ReactNode } from "react";

interface Category {
  id: string;
  name: string;
  iconUrl: string;
  isNew: boolean;
}

interface CategoryContextProps {
  categories: Category[];
  error: string | null;
  loading: boolean;
  fetchCategories: () => void;
}

export const CategoryContext = createContext<CategoryContextProps>({
  categories: [],
  error: null,
  loading: true,
  fetchCategories: () => {},
});

export const CategoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://shop.chasman.engineer/api/v1/categories",
        {
          headers: {
            accept: "*/*",
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwNDU0MTE1MDkiLCJuYmYiOjE3NDIzOTIyOTEsImV4cCI6MTc0MjM5NTg5MSwiaWF0IjoxNzQyMzkyMjkxLCJpc3MiOiJtci5yYWZhZWxsbyJ9.1axn5_yWtp_JrGzPV1rpZfZlTJgTjJA4mwKWhugAGUY",
          },
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("API Response:", data); // Log the API response
      setCategories(data.categories);
    } catch (err) {
      console.error("Error fetching categories:", err); // Log the error
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, error, loading, fetchCategories }}>
      {children}
    </CategoryContext.Provider>
  );
};
