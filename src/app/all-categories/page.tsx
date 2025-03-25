"use client";

import React, { useEffect, useState } from "react";
import CategoryCard from "../components/CategoryCard";
import { useRouter } from "next/navigation";
import { fetchCategories, Category } from "../components/categoryApi";

export default function AllCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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

  const chunkArray = (array: Category[], size: number) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const categoriesChunks = chunkArray(categories, 4);

  return (
    <div className="flex min-h-screen flex-col p-2">
      <div className="w-full flex mb-[3.125vw] items-center justify-between">
        <img
          src="img/CategoryCard/ArrowLeft.svg"
          alt="Назад"
          onClick={() => router.back()}
          className="w-[4.17vw] cursor-pointer"
        />
        <p className="text-[#EFEDF6] text-[6.25vw] font-montserrat font-semibold leading-normal">
          Выбери категорию
        </p>
        <img
          src="img/CategoryCard/Lupa.svg"
          alt="Поиск"
          className="w-[4.17vw] h-[4.17vw] cursor-pointer"
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-4 gap-2 mb-2">
          {[...Array(4)].map((_, index) => (
            <CategoryCard key={`skeleton-${index}`} isLoading />
          ))}
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-8">Категории не найдены</div>
      ) : (
        <div className="flex flex-col gap-2">
          {categoriesChunks.map((chunk, index) => (
            <div key={`row-${index}`} className="grid grid-cols-4 gap-2">
              {chunk.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}