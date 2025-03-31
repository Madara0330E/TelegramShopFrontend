"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

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

  const truncateText = (text: string, maxLength: number = 20) => {
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
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
          {truncateText(product.name)}
        </p>
        <img
          src="../img/CategoryCard/Lupa.svg"
          alt="Поиск"
          className="w-[4.17vw] h-[4.17vw] cursor-pointer"
        />
      </div>

      {/* Основной контент страницы товара */}
      <div className="div">
        {/* Карусель изображений товара */}
        <div className="w-full max-w-[100vw] h-[100vw] relative">
          <Swiper
            modules={[Pagination]}
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet bg-white opacity-50",
              bulletActiveClass: "swiper-pagination-bullet-active !opacity-100",
            }}
            spaceBetween={0}
            slidesPerView={1}
            className="h-full w-full"
          >
            {product.imgUrls.map((imgUrl, index) => (
              <SwiperSlide key={index}>
                <img
                  src={imgUrl || "/placeholder-product.png"}
                  alt={`${product.name} - ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder-product.png";
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Описание товара */}
        <div className="flex flex-col">
          <div className="p-2 pt-3 pb-0">
            <p className="text-[#EFEDF6] text-[6.25vw] font-bold leading-none font-inter-tight line-clamp-2">
              {product.name}
            </p>
          </div>

          <div className="flex justify-between items-center p-2 pb-0">
            <div className="flex items-center mt-1">
              <span className="text-[#5BDB41] text-[5.208vw] font-semibold leading-none font-inter-tight">
                {formatPrice(product.price)}₽
              </span>
              {product.originalPrice && (
                <span className="ml-[1.042vw] mb-[1.042vw] text-[3.646vw] font-semibold leading-none line-through opacity-50 font-inter-tight">
                  {formatPrice(product.originalPrice)}₽
                </span>
              )}
            </div>
          </div>

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

      {/* Стили для кастомных точек пагинации */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          width: 2.5vw;
          height: 2.5vw;
          margin: 0 1vw !important;
          background: white;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
};

export default ProductDetails;