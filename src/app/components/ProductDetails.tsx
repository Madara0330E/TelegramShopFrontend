"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Link from 'next/link';

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
  isLoading?: boolean;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, isLoading = false }) => {
  const router = useRouter();
  const [isBuyLoading, setIsBuyLoading] = useState(false);
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
    setIsBuyLoading(true);
    console.log("Buying product:", product.id);
    setTimeout(() => setIsBuyLoading(false), 1000);
  };

  useEffect(() => {
    const checkTextOverflow = () => {
      if (descriptionRef.current) {
        const element = descriptionRef.current;
        const lineHeight = parseInt(getComputedStyle(element).lineHeight) || 24;
        const maxHeight = lineHeight * 3;

        setShowReadMore(element.scrollHeight > maxHeight);
      }
    };

    checkTextOverflow();
    window.addEventListener("resize", checkTextOverflow);
    return () => window.removeEventListener("resize", checkTextOverflow);
  }, [product?.description]);

  if (isLoading) {
    return (
      <div className="div">
        {/* Скелетон верхней панели */}
        <div className="w-full flex mb-[3.125vw] items-center justify-between p-2">
          <div className="w-[4.17vw] h-[4.17vw] bg-gray-700 rounded animate-pulse"></div>
          <div className="h-[6.25vw] w-[40vw] bg-gray-700 rounded animate-pulse"></div>
          <div className="w-[4.17vw] h-[4.17vw] bg-gray-700 rounded animate-pulse"></div>
        </div>

        {/* Скелетон карусели изображений */}
        <div className="w-full max-w-[100vw] h-[100vw] relative bg-gray-700 animate-pulse"></div>

        {/* Скелетон описания товара */}
        <div className="flex flex-col p-2 pt-3">
          <div className="h-[6.25vw] w-[80vw] bg-gray-700 rounded animate-pulse mb-3"></div>
          <div className="h-[5.208vw] w-[30vw] bg-gray-700 rounded animate-pulse mb-4"></div>
          
          <div className="space-y-2">
            <div className="h-[3.6458vw] w-full bg-gray-700 rounded animate-pulse"></div>
            <div className="h-[3.6458vw] w-[90%] bg-gray-700 rounded animate-pulse"></div>
            <div className="h-[3.6458vw] w-[80%] bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return <div className="text-center py-8">Товар не найден</div>;
  }

  return (
    <div className="div">
      {/* Верхняя панель с кнопками "Назад" и "Поиск" */}
      <div className="w-full flex mb-[3.125vw] items-center justify-between p-2">
        <Link href="/">
          <img
            src="../img/CategoryCard/ArrowLeft.svg"
            alt="Назад"
            className="w-[4.17vw] cursor-pointer"
          />
        </Link>
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
                  src={imgUrl || "/../img/ProductDetails/EroroIcon.svg"}
                  alt={`${product.name} - ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/../img/ProductDetails/EroroIcon.svg";
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