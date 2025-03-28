import React from "react";
import ProductDetails from "../../components/ProductDetails";
import { notFound } from "next/navigation";

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
  reviews: any[];
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`https://shop.chasman.engineer/api/v1/products/item/${id}`, {
      next: { revalidate: 60 }
    });
    
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error('Failed to fetch product');
    }
    
    const product = await res.json();
    
    // Ensure imgUrls is always an array
    if (!product.imgUrls || !Array.isArray(product.imgUrls)) {
      product.imgUrls = [];
    }
    
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export default async function ProductPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  // First await the params
  const { id } = await params;
  
  // Then fetch the product
  const product = await getProduct(id);

  if (!product) {
    return notFound();
  }

  return (
    <main className="min-h-screen">
      <ProductDetails product={product} />
    </main>
  );
}