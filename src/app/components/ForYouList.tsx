"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import ProductItem from "./ForYou";

const ForYouList: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleProducts, setVisibleProducts] = useState<number>(4); // Начальное количество видимых товаров
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

  useEffect(() => {
    if (loading || products.length === 0) return;

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Увеличиваем количество видимых товаров
          setVisibleProducts((prev) => {
            const newValue = prev + 4;
            return newValue > products.length ? products.length : newValue;
          });
        }
      });
    }, options);

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loading, products]);

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
          {[...Array(4)].map((_, index) => (
            <ProductItem key={`skeleton-${index}`} />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-8">Товары не найдены</div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-[2.08vw]">
            {products.slice(0, visibleProducts).map((product) => (
              <ProductItem 
                key={product.id} 
                product={product} 
              />
            ))}
          </div>
          {/* Элемент для отслеживания видимости */}
          <div ref={loadMoreRef} style={{ height: "1px" }} />
          {visibleProducts < products.length && (
            <div className="grid grid-cols-2 gap-[2.08vw]">
              {[...Array(Math.min(4, products.length - visibleProducts))].map((_, index) => (
                <ProductItem key={`skeleton-${index}`} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ForYouList;