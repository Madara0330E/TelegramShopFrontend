// src/app/components/CategoriesList.tsx
"use client";

import React from "react";
import Link from "next/link";
import CategoryCard from "./CategoryCard";
import { useCategories } from "../context/CategoriesContext";

const CategoriesList: React.FC = () => {
  const { categories, isLoading, error } = useCategories();

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  const displayedCategories = categories.slice(0, 8);

  return (
    <div className="p-2">
      <div className="w-full flex mb-[3.125vw] items-center justify-between">
        <p className="text-[#EFEDF6] text-[6.25vw] leading-normal [font-feature-settings:'salt'_on,'ss03'_on,'cv01'_on] font-inter-tight font-semibold ">
          Категории
        </p>
        
        <Link href="/all-categories">
          <img
            src="/img/CategoryCard/Arrow.svg"
            alt="Перейти"
            className="w-[4.17vw] cursor-pointer"
          />
        </Link>
      </div>

      {isLoading ? (
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