// src/app/components/CategoryCard.tsx
"use client";

import React from "react";

interface Category {
  id: string;
  name: string;
  iconUrl: string;
  isNew: boolean;
}

interface CategoryCardProps {
  category?: Category;
  isLoading?: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, isLoading = false }) => {
  if (isLoading || !category) {
    return (
      <div className="rounded-lg shadow-md overflow-hidden w-full mb-2 animate-pulse">
        <div className="relative w-full aspect-square bg-gray-700 rounded-lg"></div>
        <div className="flex justify-center items-center mt-0.5 max-w-[22.14vw]">
          <div className="h-[4vw] w-[80%] bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 w-full mb-2">
      <div className="relative w-full aspect-square">
        <img
          src={category.iconUrl}
          alt={category.name}
          className="w-full h-full object-cover rounded-lg"
        />
        {category.isNew && (
          <span
            style={{
              background: "linear-gradient(90deg, #3C53E8 0%, #7DB3F6 100%)",
            }}
            className="flex w-full px-2 py-1 h-[7.03125vw] justify-center items-center gap-1 absolute bottom-0 rounded-b-lg"
          >
            <img
              src="img/CategoryCard/SoftStar.svg"
              alt=""
              className="w-[3.125vw] h-[3.125vw]"
            />
            <span className="text-[#EFEDF6] text-[4.1667vw] text-base inter-tight-semibold font-semibold leading-normal">
              Новое
            </span>
          </span>
        )}
      </div>
      <div className="flex justify-center items-center mt-0.5 max-w-[22.14vw]">
        <p className="text-[#EFEDF6] text-[3.6458vw] text-center w-full break-words whitespace-normal normal-case font-medium leading-normal font-montserrat">
          {category.name}
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;