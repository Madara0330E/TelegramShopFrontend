"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

type Review = {
  id: string;
  name: string;
  avatarUrl: string;
  comment: string;
  rating: number;
  createdAtUtc: string;
};

interface ProductReviewsProps {
  reviews: Review[];
  productRating: number;
  productId: string;
  showAllReviews?: boolean;
  isLoading?: boolean;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({
  reviews,
  productRating,
  productId,
  showAllReviews = false,
  isLoading = false,
}) => {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigateToAllReviews = () => {
    router.push(`/product/${productId}/reviews`);
  };

  const displayedReviews = showAllReviews
    ? reviews
    : reviews.length > 3
    ? reviews.slice(0, 3)
    : reviews;

  const formatRating = (rating: number) => {
    const formattedRating = rating.toFixed(1);
    return formattedRating === "0.0" ? "-.-" : formattedRating;
  };

  return (
    <div className={`${showAllReviews ? "" : "mt-3"} p-2 mb-0`}>
      {/* Заголовок отображается только на странице товара */}
      {!showAllReviews && (
        <div className="div">
          {isLoading ? (
            <div className="w-full flex mb-[3.125vw] items-center justify-between">
              <div className="flex items-center">
                <div className="h-[6.25vw] w-[20vw] bg-[#3A383E] rounded animate-pulse"></div>
              </div>
              <div className="flex items-center gap-[3.125vw]">
                <div className="flex items-center gap-[1.042vw]">
                  <div className="h-[5.208vw] w-[8vw] bg-[#3A383E] rounded animate-pulse"></div>
                  <div className="w-[3.646vw] h-[3.385vw] bg-[#3A383E] rounded animate-pulse"></div>
                </div>
                <div className="w-[4.17vw] h-[3.646vw] bg-[#3A383E] rounded animate-pulse"></div>
              </div>
            </div>
          ) : (
            <div className="w-full flex mb-[3.125vw] items-center justify-between">
              <div className="flex items-center">
                <span className="text-[#EFEDF6] text-[6.25vw] font-semibold leading-normal [font-feature-settings:'salt'_on,'ss03'_on,'cv01'_on] font-inter-tight">
                  Отзывы
                </span>
                <sup className="text-[#EFEDF6] text-[4.167vw] ml-[1.042vw] font-semibold leading-normal [font-feature-settings:'salt'_on,'ss03'_on,'cv01'_on] font-inter-tight">
                  {reviews.length}
                </sup>
              </div>

              <div className="flex items-center gap-[3.125vw]">
                <div className="flex items-center gap-[1.042vw]">
                  <p className="text-[#EFEDF6] text-[5.208vw] font-semibold leading-normal [font-feature-settings:'salt'_on,'ss03'_on,'cv01'_on] font-inter-tight">
                    {formatRating(productRating)}
                  </p>
                  <img
                    src="../img/ProductReviews/Star.svg"
                    alt="Рейтинг товара"
                    className="w-[3.646vw] h-[3.385vw]"
                    width={20}
                    height={20}
                  />
                </div>
                {reviews.length > 0 && (
                  <button
                    onClick={navigateToAllReviews}
                    className="flex items-center"
                    aria-label="Показать все отзывы"
                  >
                    <img
                      src="../img/ProductReviews/Arrow.svg"
                      alt=""
                      className="w-[4.17vw] h-[3.646vw] cursor-pointer"
                      width={20}
                      height={20}
                    />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Блок с отзывами */}
      {isLoading ? (
        <div className="w-full p-3 rounded-[12px] bg-gray-700  animate-pulse">
          <div className="flex items-center justify-between w-full mb-[2vw]">
            <div className="flex items-center gap-[2.083vw]">
              <div className="w-[8.333vw] h-[8.333vw] rounded-full bg-gray-700 "></div>
              <div className="h-[4.167vw] w-[30vw] bg-gray-700  rounded"></div>
            </div>
            <div className="flex items-center gap-[1.042vw]">
              <div className="h-[5.208vw] w-[8vw] bg-gray-700  rounded"></div>
              <div className="w-[3.646vw] h-[3.385vw] bg-gray-700  rounded"></div>
            </div>
          </div>
          <div className="mb-[1.5vw]">
            <div className="h-[4.167vw] w-full bg-gray-700  rounded mb-1"></div>
            <div className="h-[4.167vw] w-[80%] bg-gray-700  rounded"></div>
          </div>
        </div>
      ) : displayedReviews.length > 0 ? (
        <div className="flex flex-col gap-[2.083vw]">
          {displayedReviews.map((review) => (
            <div
              key={review.id}
              className="w-full p-3 rounded-[12px] bg-[#2A282E]"
            >
              <div className="flex items-center justify-between w-full mb-[2vw]">
                <div className="flex items-center gap-[2.083vw]">
                  <div className="w-[8.333vw] h-[8.333vw] rounded-full overflow-hidden bg-[#3A383E] flex items-center justify-center">
                    {review.avatarUrl ? (
                      <img
                        src={review.avatarUrl}
                        alt={`Аватар ${review.name}`}
                        className="w-full h-full object-cover"
                        width={32}
                        height={32}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "../img/placeholder-avatar.svg";
                          target.onerror = null;
                        }}
                      />
                    ) : (
                      <img
                        src="../img/placeholder-avatar.svg"
                        alt="Аватар по умолчанию"
                        className="w-full h-full object-cover"
                        width={32}
                        height={32}
                      />
                    )}
                  </div>
                  <p className="text-[#EFEDF6] text-[4.167vw] font-semibold leading-normal [font-feature-settings:'salt'_on,'ss03'_on,'cv01'_on] font-inter-tight">
                    {review.name}
                  </p>
                </div>

                <div className="flex items-center gap-[1.042vw]">
                  <p className="text-[#EFEDF6] text-[5.208vw] font-semibold leading-normal [font-feature-settings:'salt'_on,'ss03'_on,'cv01'_on] font-inter-tight">
                    {formatRating(review.rating)}
                  </p>
                  <img
                    src="/../img/ProductReviews/Star.svg"
                    alt={`Оценка ${review.rating}`}
                    className="w-[3.646vw] h-[3.385vw]"
                    width={20}
                    height={20}
                  />
                </div>
              </div>

              <div className="mb-[1.5vw]">
                <p className="text-[#EFEDF6] text-[4.167vw] font-medium leading-normal [font-feature-settings:'salt'_on,'ss03'_on,'cv01'_on] font-inter-tight">
                  {review.comment}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full p-3 rounded-[12px] bg-[#2A282E] text-center">
          <p className="text-[#7E7D83] text-[4.167vw]">
            Пока нет отзывов. Будьте первым!
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
