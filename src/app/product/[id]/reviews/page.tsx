import React from "react";
import { notFound } from "next/navigation";
import ProductReviews from "../../../components/ProductReviews";
import Link from "next/link";

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
  reviews: {
    id: string;
    name: string;
    avatarUrl: string;
    comment: string;
    rating: number;
    createdAtUtc: string;
  }[];
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(
      `https://shop.chasman.engineer/api/v1/products/item/${id}`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error("Ошибка при загрузке товара");
    }

    const product = await res.json();

    if (!product.imgUrls || !Array.isArray(product.imgUrls)) {
      product.imgUrls = [];
    }

    if (!product.reviews || !Array.isArray(product.reviews)) {
      product.reviews = [];
    }

    return product;
  } catch (error) {
    console.error("Ошибка при получении товара:", error);
    return null;
  }
}

export default async function AllReviewsPage({
  params,
}: {
  params?: { id?: string };
}) {
  if (!params || !params.id) {
    return notFound();
  }

  const product = await getProduct(params.id);

  if (!product) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-[#1C1B20]">
      {/* Заголовок страницы */}
      <div className="w-full flex justify-between items-center p-4 border-b border-[#2A282E]">
        <Link href={`/product/${params.id}`} className="flex items-center">
          <img
            src="../../../img/CategoryCard/ArrowLeft.svg"
            alt="Назад"
            className="w-[4.17vw] cursor-pointer"
          />
          <div className="flex items-center">
            <span className="text-[#EFEDF6] text-[6.25vw] font-semibold leading-normal [font-feature-settings:'salt'_on,'ss03'_on,'cv01'_on] font-inter-tight">
              Отзывы
            </span>
            <sup className="text-[#EFEDF6] text-[4.167vw] ml-[1.042vw] font-semibold leading-normal [font-feature-settings:'salt'_on,'ss03'_on,'cv01'_on] font-inter-tight">
              {product.reviews.length}
            </sup>
          </div>
        </Link>
        <div className="flex items-center">
          <p className="text-[#EFEDF6] text-[5.208vw] font-semibold leading-normal [font-feature-settings:'salt'_on,'ss03'_on,'cv01'_on] font-inter-tight">
            {product.rating.toFixed(1)}
          </p>
          <img
            src="/../../../img/ProductReviews/Star.svg"
            alt={`Оценка ${product.rating.toFixed(1)}`}
            className="w-[3.646vw] h-[3.385vw]"
            width={20}
            height={20}
          />
        </div>
      </div>

      {/* Компонент отзывов */}
      <div className="p-4">
        <ProductReviews
          reviews={product.reviews}
          productRating={product.rating}
          productId={params.id}
          showAllReviews
        />
      </div>
    </main>
  );
}