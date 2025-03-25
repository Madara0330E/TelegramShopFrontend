"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import CategoryCard from "./CategoryCard";
import { fetchCategories, Category } from "./categoryApi";

const CategoriesList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  const displayedCategories = categories.slice(0, 8);

  return (
    <div className="container mx-auto p-2">
      <div className="w-full flex mb-[3.125vw] items-center justify-between">
        <p className="text-[#EFEDF6] text-[6.25vw] font-montserrat font-semibold leading-normal">
          Категории
        </p>
        
        <Link href="/all-categories">
          <img
            src="img/CategoryCard/Arrow.svg"
            alt="Перейти"
            className="w-[4.17vw] cursor-pointer"
          />
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-4 gap-[2.08vw]">
          {[...Array(8)].map((_, index) => (
            <CategoryCard key={`skeleton-${index}`} isLoading />
          ))}
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-8">No categories found</div>
      ) : (
        <div className="grid grid-cols-4 gap-[2.08vw]">
          {displayedCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesList;