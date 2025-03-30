"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

interface ProductDetailsProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice: number | null;
    discountPercent: number;
    imgUrls: string[];
    inStock: boolean;
    rating: number;
    reviews: any[];
  };
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU").format(price);
  };

  const handleBuyClick = () => {
    setIsLoading(true);
    console.log("Buying product:", product.id);
    setTimeout(() => setIsLoading(false), 1000);
  };

  useEffect(() => {
    const checkTextOverflow = () => {
      if (descriptionRef.current) {
        const element = descriptionRef.current;
        const lineHeight = parseInt(getComputedStyle(element).lineHeight) || 24;
        const maxHeight = lineHeight * 2;

        setShowReadMore(element.scrollHeight > maxHeight);
      }
    };

    checkTextOverflow();
    window.addEventListener("resize", checkTextOverflow);
    return () => window.removeEventListener("resize", checkTextOverflow);
  }, [product.description]);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Верхняя панель с кнопками "Назад" и "Поиск" */}
      <div className="w-full flex mb-[3.125vw] items-center justify-between p-2">
        <img
          src="../img/CategoryCard/ArrowLeft.svg"
          alt="Назад"
          onClick={() => router.back()}
          className="w-[4.17vw] cursor-pointer"
        />
        <p className="text-[#EFEDF6] text-[6.25vw] font-semibold leading-normal [font-feature-settings:'salt'_on,'ss03'_on,'cv01'_on] font-inter-tight">
          {product.name}
        </p>
        <img
          src="../img/CategoryCard/Lupa.svg"
          alt="Поиск"
          className="w-[4.17vw] h-[4.17vw] cursor-pointer"
        />
      </div>

      {/* Основной контент страницы товара */}
      <div className="grid">
        {/* Изображение товара */}
        <div className="w-full max-w-[100vw] h-[100vw]">
          <img
            src={product.imgUrls[0] || "/placeholder-product.png"}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder-product.png";
            }}
          />
        </div>

        {/* Описание товара */}
        <div className="flex flex-col">
          <div className="p-2 pt-3 pb-0">
            <p className="text-[#EFEDF6] text-[6.25vw] font-bold leading-none font-inter-tight line-clamp-2">
              {product.name}
            </p>
          </div>

          {/* Цена и рейтинг */}
          <div className="flex justify-between items-center p-2 pb-0">
            <span
              className={`text-[${
                product.originalPrice ? "#5BDB41" : "#EFEDF6"
              }] text-[5.208vw] font-semibold leading-none font-inter-tight`}
            >
              {formatPrice(product.price)} ₽
            </span>
            <div className="flex items-center gap-[1.042vw] reiting">
              <p className="text-[#EFEDF6] text-[5.208vwvw] leading-normal [font-feature-settings:'salt'_on,'ss03'_on,'cv01'_on] font-inter-tight font-medium">
                {product.rating.toFixed(1)}
              </p>
              <img
                className="w-[3.646vw] h-[3.385vw]"
                src="../img/ProductDetails/Star.svg"
                alt="Рейтинг"
              />
            </div>
          </div>

          {/* Описание с кнопкой "Читать..." */}
          <div className="p-2 w-full max-w-[95.833vw] relative pt-3 pb-3">
            <p
              ref={descriptionRef}
              className={`break-all transition-all duration-200 text-[#EFEDF6] text-[3.6458vw] leading-normal [font-feature-settings:'salt'_on,'ss03'_on,'cv01'_on] font-inter-tight font-semibold ${
                !isExpanded && showReadMore ? "line-clamp-2" : ""
              }`}
              style={{
                lineHeight: "1.5",
                wordWrap: "break-word",
                overflowWrap: "break-word",
              }}
            >
              {product.description || "Описание отсутствует"}
            </p>
            {showReadMore && (
              <div className="text-right ">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="focus:outline-none text-[#7E7D83] text-[3.6458vw] leading-normal font-inter-tight font-semibold"
                >
                  {isExpanded ? "Свернуть" : "Читать..."}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
   
    </div>
  );
};

export default ProductDetails;
