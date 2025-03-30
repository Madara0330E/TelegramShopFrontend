import React from "react";
import ProductDetails from "../../components/ProductDetails";
import { notFound } from "next/navigation";
import ProductReviews from '../../components/ProductReviews';
import ForYouList from "../../components/ForYouList";

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
    const res = await fetch(`https://shop.chasman.engineer/api/v1/products/item/${id}`, {
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error('Ошибка при загрузке товара');
    }

    const product = await res.json();

    // Обеспечиваем правильную структуру данных, если они отсутствуют
    if (!product.imgUrls || !Array.isArray(product.imgUrls)) {
      product.imgUrls = [];
    }

    if (!product.reviews || !Array.isArray(product.reviews)) {
      product.reviews = [];
    }

    return product;
  } catch (error) {
    console.error('Ошибка при получении товара:', error);
    return null;
  }
}

export default async function ProductPage({ params }: { params?: { id?: string } }) {
  if (!params || !params.id) {
    return notFound();
  }

  const product = await getProduct(params.id);

  if (!product) {
    return notFound();
  }

  return (
    <main className="min-h-screen">
      <ProductDetails product={product} />
      <ProductReviews 
        reviews={product.reviews} 
        productRating={product.rating} 
      />
      <ForYouList />
    </main>
  );
}