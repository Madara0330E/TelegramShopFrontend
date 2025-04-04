"use client";

import React from "react";
import CategoryCard from "../components/CategoryCard";
import { useRouter } from "next/navigation";
import { useCategories } from "../context/CategoriesContext";

// Полный тип, соответствующий и API, и CategoryCard
type ApiCategory = {
  id: string | number;
  name: string;
  image?: string;
  slug?: string;
  isNew?: boolean;
  iconUrl?: string;
};

type CategoryCardProps = {
  id: string | number;
  name: string;
  iconUrl: string;
  isNew: boolean;
};

export default function AllCategories() {
  const { categories: rawCategories, isLoading, error } = useCategories();
  const router = useRouter();

  // Преобразование данных API в формат для CategoryCard
  const categories: CategoryCardProps[] = React.useMemo(() => {
    if (!rawCategories) return [];
    
    return rawCategories.map((cat: ApiCategory) => ({
      id: cat.id,
      name: cat.name,
      iconUrl: cat.iconUrl || cat.image || '/img/ProductDetails/ErrorIcon.svg',
      isNew: cat.isNew || false
    }));
  }, [rawCategories]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2">
        {[...Array(4)].map((_, rowIndex) => (
          <div key={`skeleton-row-${rowIndex}`} className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, cardIndex) => (
              <CategoryCard key={`skeleton-${rowIndex}-${cardIndex}`} isLoading />
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  if (!categories || categories.length === 0) {
    return <div className="text-center py-8">Категории не загружены</div>;
  }

  const chunkArray = (array: CategoryCardProps[], size: number) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const categoriesChunks = chunkArray(categories, 4);

  return (
    <div className="flex flex-col p-2">
      {/* Шапка */}
      <div className="w-full flex mb-[3.125vw] items-center justify-between">
        <img
          src="/img/CategoryCard/ArrowLeft.svg"
          alt="Назад"
          onClick={() => router.back()}
          className="w-[4.17vw] cursor-pointer"
        />
        <p className="text-[#EFEDF6] text-[6.25vw] font-semibold leading-normal [font-feature-settings:'salt'_on,'ss03'_on,'cv01'_on] font-inter-tight">
          Выбери категорию
        </p>
        <img
          src="/img/CategoryCard/Lupa.svg"
          alt="Поиск"
          className="w-[4.17vw] h-[4.17vw] cursor-pointer"
        />
      </div>

      {/* Контент */}
      <div className="flex flex-col gap-2">
        {categoriesChunks.map((chunk, index) => (
          <div key={`row-${index}`} className="grid grid-cols-4 gap-2">
            {chunk.map((category) => (
              <CategoryCard 
                key={category.id} 
                category={category} 
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}