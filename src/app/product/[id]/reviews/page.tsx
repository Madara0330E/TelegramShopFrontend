"use client";

import React, { useState, useEffect, use } from "react";
import { notFound } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Review = {
  id: string;
  name: string;
  avatarUrl: string;
  comment: string;
  rating: number;
  createdAtUtc: string;
};

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number | null;
  discountPercent: number;
  imgUrls: string[];
  inStock: boolean;
  rating: number;
  reviews: Review[];
}

const ProductReviews: React.FC<{
  reviews: Review[];
  productRating: number;
  productId: string;
  showAllReviews?: boolean;
  isLoading?: boolean;
}> = ({ reviews, productRating, productId, showAllReviews = false, isLoading = false }) => {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigateToAllReviews = () => {
    router.push(`/product/${productId}/reviews`);
  };

  const displayedReviews = showAllReviews ? reviews : reviews.length > 3 ? reviews.slice(0, 3) : reviews;

  const formatRating = (rating: number) => {
    const formattedRating = rating.toFixed(1);
    return formattedRating === "0.0" ? "-.-" : formattedRating;
  };

  return (
    <div className={`${showAllReviews ? '' : 'mt-3'} p-2 mb-0`}>
      {!showAllReviews && (
        <div className="div">
          {isLoading ? (
            <div className="w-full flex mb-[3.125vw] items-center justify-between p-2">
              <div className="flex items-center">
                <div className="h-[6.25vw] w-[20vw] bg-[#2A282E] rounded animate-pulse"></div>
              </div>
              <div className="flex items-center gap-[3.125vw]">
                <div className="flex items-center gap-[1.042vw]">
                  <div className="h-[5.208vw] w-[8vw] bg-[#2A282E] rounded animate-pulse"></div>
                  <div className="w-[3.646vw] h-[3.385vw] bg-[#2A282E] rounded animate-pulse"></div>
                </div>
                <div className="w-[4.17vw] h-[3.646vw] bg-[#2A282E] rounded animate-pulse"></div>
              </div>
            </div>
          ) : (
            <div className="w-full flex mb-[3.125vw] items-center justify-between p-2">
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

      {isLoading ? (
        <div className="flex flex-col gap-[2.083vw]">
          {[...Array(showAllReviews ? 5 : 3)].map((_, index) => (
            <div key={`skeleton-review-${index}`} className="w-full p-3 rounded-[12px]  animate-pulse">
              <div className="flex items-center justify-between w-full mb-[2vw]">
                <div className="flex items-center gap-[2.083vw]">
                  <div className="w-[8.333vw] h-[8.333vw] rounded-full bg-[#2A282E]"></div>
                  <div className="h-[4.167vw] w-[30vw] bg-[#2A282E] rounded"></div>
                </div>
                <div className="flex items-center gap-[1.042vw]">
                  <div className="h-[5.208vw] w-[8vw] bg-[#2A282E] rounded"></div>
                  <div className="w-[3.646vw] h-[3.385vw] bg-[#2A282E] rounded"></div>
                </div>
              </div>
              <div className="mb-[1.5vw]">
                <div className="h-[4.167vw] w-full bg-[#2A282E] rounded mb-1"></div>
                <div className="h-[4.167vw] w-[80%] bg-[#2A282E] rounded"></div>
              </div>
            </div>
          ))}
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

const AllReviewsPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const unwrappedParams = use(params);
  const productId = unwrappedParams.id;

  useEffect(() => {
    if (!productId) {
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `https://shop.chasman.engineer/api/v1/products/item/${productId}`
        );
        
        if (!res.ok) {
          if (res.status === 404) {
            setProduct(null);
          } else {
            throw new Error("Ошибка при загрузке товара");
          }
        } else {
          const productData = await res.json();
          
          if (!productData.reviews || !Array.isArray(productData.reviews)) {
            productData.reviews = [];
          }
          
          setProduct(productData);
        }
      } catch (error) {
        console.error("Ошибка при получении товара:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === "newest" ? "oldest" : "newest");
  };

  if (!productId) {
    return notFound();
  }

  if (loading) {
    return (
      <main className="min-h-screen ">
        <div className="w-full flex justify-between items-center p-4 pl-2 pr-2">
          <div className="w-[4.167vw] h-[3.646vw] bg-[#2A282E] rounded animate-pulse"></div>
          <div className="flex items-center gap-[1.563vw]">
            <div className="flex items-center">
              <div className="h-[6.25vw] w-[20vw] bg-[#2A282E] rounded animate-pulse"></div>
            </div>
            <div className="div">
              <div className="w-[1.302vw] h-[1.302vw] bg-[#2A282E] rounded-full animate-pulse"></div>
            </div>
            <div className="flex items-center gap-[1.042vw]">
              <div className="h-[5.208vw] w-[8vw] bg-[#2A282E] rounded animate-pulse"></div>
              <div className="w-[4.167vw] h-[3.906vw] bg-[#2A282E] rounded animate-pulse"></div>
            </div>
          </div>
          <div className="w-[4.167vw] h-[4.167vw] bg-[#2A282E] rounded animate-pulse"></div>
        </div>

        <div className="p-4">
          <div className="flex flex-col gap-[2.083vw]">
            {[...Array(5)].map((_, index) => (
              <div key={`skeleton-${index}`} className="w-full p-3 rounded-[12px] bg-[#2A282E] animate-pulse">
                <div className="flex items-center justify-between w-full mb-[2vw]">
                  <div className="flex items-center gap-[2.083vw]">
                    <div className="w-[8.333vw] h-[8.333vw] rounded-full bg-[#2A282E]"></div>
                    <div className="h-[4.167vw] w-[30vw] bg-[#2A282E] rounded"></div>
                  </div>
                  <div className="flex items-center gap-[1.042vw]">
                    <div className="h-[5.208vw] w-[8vw] bg-[#2A282E] rounded"></div>
                    <div className="w-[3.646vw] h-[3.385vw] bg-[#2A282E] rounded"></div>
                  </div>
                </div>
                <div className="mb-[1.5vw]">
                  <div className="h-[4.167vw] w-full bg-[#2A282E] rounded mb-1"></div>
                  <div className="h-[4.167vw] w-[80%] bg-[#2A282E] rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return notFound();
  }

  const sortedReviews = [...product.reviews].sort((a, b) => {
    const dateA = new Date(a.createdAtUtc).getTime();
    const dateB = new Date(b.createdAtUtc).getTime();
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  return (
    <main className="">
      <div className="w-full flex justify-between items-center p-4 pl-2 pr-2">
        <Link href={`/product/${productId}`} className="flex items-center">
          <img
            src="../../../img/CategoryCard/ArrowLeft.svg"
            alt="Назад"
            className="w-[4.167vw] h-[3.646vw] cursor-pointer"
          />
        </Link>
        <div className="flex items-center gap-[1.563vw]">
          <div className="flex items-center">
            <span className="text-[#EFEDF6] text-[6.25vw] font-semibold leading-normal [font-feature-settings:'salt'_on,'ss03'_on,'cv01'_on] font-inter-tight">
              Отзывы
            </span>
            <sup className="text-[#EFEDF6] text-[4.167vw] ml-[1.042vw] font-semibold leading-normal [font-feature-settings:'salt'_on,'ss03'_on,'cv01'_on] font-inter-tight">
              {product.reviews.length}
            </sup>
          </div>
          <div className="div">
            <div className="w-[1.302vw] h-[1.302vw] bg-[#EFEDF6] rounded-full"></div>
          </div>
          <div className="flex items-center gap-[1.042vw]">
            <p className="text-[#EFEDF6] text-[5.208vw] font-semibold leading-normal [font-feature-settings:'salt'_on,'ss03'_on,'cv01'_on] font-inter-tight">
              {product.rating.toFixed(1)}
            </p>
            <img
              src="/../../../img/ProductReviews/Star.svg"
              alt={`Оценка ${product.rating.toFixed(1)}`}
              className="w-[4.167vw] h-[3.906vw]"
              width={20}
              height={20}
            />
          </div>
        </div>
        <div className="div">
          <img
            src="/../../../img/ProductReviews/Sorting.svg"
            alt={`Сортировка ${sortOrder === "newest" ? "новые сначала" : "старые сначала"}`}
            className="w-[4.167vw] h-[4.167vw] cursor-pointer"
            width={20}
            height={20}
            onClick={toggleSortOrder}
          />
        </div>
      </div>

      <div className="div">
        <ProductReviews
          reviews={sortedReviews}
          productRating={product.rating}
          productId={productId}
          showAllReviews
          isLoading={false}
        />
      </div>
    </main>
  );
};

export default AllReviewsPage;