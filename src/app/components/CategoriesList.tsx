"use client";

import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";

interface Category {
  id: string;
  name: string;
  iconUrl: string;
  isNew: boolean;
}

const CategoriesList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
        setCategories(data.categories);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading categories...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  if (categories.length === 0) {
    return <div className="text-center py-8">No categories found</div>;
  }

  // Slice the categories to only show 8 items (2 rows of 4)
  const displayedCategories = categories.slice(0, 8);

  return (
    <div className="container mx-auto p-2 ">
      <div className="w-full flex mb-[3.125vw] items-center justify-between">
        <p className=" text-[#EFEDF6] font-inter-tight text-[6.25vw] font-semibold leading-none typography-features">
          Категории
        </p>
        <img
          src="img/CategoryCard/Arrow.svg"
          alt=""
          className="w-[4.17vw]"
        />
      </div>
      <div className="grid grid-cols-4 gap-[2.08vw] ">
        {displayedCategories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CategoriesList;
