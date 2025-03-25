"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import ProductItem from "./ForYou";

const ForYouList: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const getData = async () => {
      try {
        setLoading(true);
        
        const productsResponse = await fetch('https://shop.chasman.engineer/api/v1/products');

        if (!productsResponse.ok) {
          throw new Error('Failed to fetch products');
        }

        const productsData = await productsResponse.json();
        setProducts(productsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-2">
      <div className="w-full flex mb-[3.125vw] items-center justify-between">
        <p className="text-[#EFEDF6] text-[6.25vw] font-montserrat font-semibold leading-normal">
          Для вас
        </p>
        
        <Link href="/all-products">
          <img
            src="img/CategoryCard/Arrow.svg"
            alt="Перейти"
            className="w-[4.17vw] cursor-pointer"
          />
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-[2.08vw]">
          {[...Array(8)].map((_, index) => (
            <ProductItem key={`skeleton-${index}`}  />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-8">Товары не найдены</div>
      ) : (
        <div className="grid grid-cols-2 gap-[2.08vw]">
          {products.slice(0, 8).map((product) => (
            <ProductItem 
              key={product.id} 
              product={product} 
             
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ForYouList;