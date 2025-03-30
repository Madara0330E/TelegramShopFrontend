"use client";

import React from "react";
import Link from "next/link";
import "../globals.css";

interface Product {
  id: string;
  name: string;
  categoryName: string;
  price: number;
  originalPrice: number | null;
  discountPercent: number;
  imgUrl: string;
  inStock: boolean;
  isNew: boolean;
  isPopular: boolean;
}

interface ProductItemProps {
  product?: Product;
  isLoading?: boolean;
}

const ProductItem: React.FC<ProductItemProps> = ({
  product,
  isLoading = false,
}) => {
  if (isLoading || !product) {
    return (
      <div className="rounded-lg shadow-md overflow-hidden w-full animate-pulse">
        <div className="relative w-full aspect-square bg-gray-700 rounded-lg"></div>
        <div className="flex flex-col gap-1 mt-2">
          <div className="h-[4vw] w-[80%] bg-gray-700 rounded"></div>
          <div className="h-[3vw] w-[60%] bg-gray-700 rounded"></div>
          <div className="h-[4vw] w-[40%] bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(Math.round(price));
  };

  return (
    <Link
      href={`/product/${product.id}`}
      className="block rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 w-full"
    >
      <div className="relative w-full aspect-square rounded-lg bg-gray-700 overflow-hidden">
        {/* Обычный тег img вместо next/image */}
        <img
          src={product.imgUrl}
          alt={product.name}
          className="w-full h-full object-contain"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder-product.png';
          }}
        />

        {/* Бейджи */}
        <div className="absolute top-2 left-2 flex flex-col gap-[1.042vw] z-10">
          {product.isPopular && (
            <div
              style={{
                background: "linear-gradient(90deg, #EC403A 0%, #E2964E 100%)",
              }}
              className="flex justify-center py-1 px-2 items-center h-[7.031vw] gap-[1.042vw] w-[32.292vw] rounded-[6px]"
            >
              <img
                src="/img/ForYou/Exclude.svg"
                alt="Популярный товар"
                className="w-[1.875vw] h-[3.125vw]"
              />
              <span className="text-[#EFEDF6] text-[4.167vw] leading-normal font-inter-tight font-semibold">
                Популярный
              </span>
            </div>
          )}

          {product.isNew && (
            <div
              style={{
                background: "linear-gradient(90deg, #3C53E8 0%, #7DB3F6 100%)",
              }}
              className="flex justify-center py-1 px-2 h-[7.031vw] items-center w-[20.573vw] gap-1 rounded-[6px]"
            >
              <img
                src="/img/CategoryCard/SoftStar.svg"
                alt="Новый товар"
                className="w-[3.125vw] h-[3.125vw]"
              />
              <span className="text-[#EFEDF6] font-montserrat text-[4.167vw] font-semibold leading-none">
                Новое
              </span>
            </div>
          )}
        </div>

        {/* Скидка */}
        {product.discountPercent > 0 && (
          <div
            style={{
              background: "linear-gradient(90deg, #EC3A63 0%, #E35F7D 100%)",
            }}
            className="flex px-2 py-1 justify-center items-center gap-1 rounded-[6px] absolute left-2 bottom-2"
          >
            <img
              src="/img/ForYou/notes.svg"
              alt="Скидка"
              className="w-[3vw] h-[3vw]"
            />
            <span className="text-[#EFEDF6] text-[3.5vw] font-semibold leading-normal font-inter-tight">
              Скидка {Math.round(product.discountPercent)}%
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1 mt-2 p-2">
        <h3 className="text-[#EFEDF6] text-[4vw] font-bold leading-none font-inter-tight line-clamp-2">
          {product.name}
        </h3>
        <div className="text-[#EFEDF6] opacity-50 text-[3.5vw] font-medium leading-none font-inter-tight">
          {product.categoryName}
        </div>

        <div className="flex items-center mt-1">
          <span className="text-[#5BDB41] text-[4.167vw] font-semibold leading-none font-inter-tight">
            {formatPrice(product.price)}₽
          </span>
          {product.originalPrice && (
            <span className="ml-[1.042vw] mb-[1.042vw] text-[3.125vw] font-semibold leading-none line-through opacity-50 font-inter-tight">
              {formatPrice(product.originalPrice)}₽
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;