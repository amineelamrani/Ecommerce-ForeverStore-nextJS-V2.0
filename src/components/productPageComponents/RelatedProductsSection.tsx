"use client";
import { fetchRelatedProduct } from "@/serverActions/actions";
import React, { useEffect, useState } from "react";
import CollectionItemCard from "../CollectionItemCard";
import { ProductsInterface } from "@/models/product";
import ProductLoadingSkeleton from "../ProductLoadingSkeleton";
import { LoaderCircle } from "lucide-react";

// This would be client side rendered - as the goal for me is to ISR the other parts and try to lower the time to first render

export default function RelatedProductsSection({
  category,
  subCategory,
}: {
  category: string;
  subCategory: string;
}) {
  const [relatedProducts, setRelatedProducts] = useState<
    ProductsInterface[] | null
  >(null);
  // This function will call a server function to fetch for related products based on the category and subCategory with max length of 5
  // In loading display the ProductSkeleton 5 times in the places of the products

  useEffect(() => {
    const fetchRelatedClient = async () => {
      const res = await fetchRelatedProduct(category, subCategory);
      if (res.status === "success") {
        const result = JSON.parse(res.result!);
        setRelatedProducts(result);
      }
    };
    fetchRelatedClient();
  }, []);

  return (
    <div className="flex flex-col py-24 items-center">
      <h1 className="mb-4 relative text-xl md:text-2xl font-bold after:content-[''] after:absolute after:top-1/2 after:w-8 md:after:w-14 after:h-[2px] after:bg-black">
        <span className="text-slate-500">RELATED</span> PRODUCTS
      </h1>
      {!relatedProducts && (
        <h1 className="flex items-center gap-2 text-gray-600">
          Loading Related Products{" "}
          <LoaderCircle className="animate-spin" size={15} />
        </h1>
      )}
      <div className="w-full flex flex-wrap items-start">
        {relatedProducts &&
          relatedProducts.map((product) => (
            <CollectionItemCard
              title={product.title}
              price={product.price}
              image={product.images[0]}
              key={`productRelated-${product._id}`}
              id={product._id!.toString() as string}
            />
          ))}

        {!relatedProducts &&
          [...Array(5)].map((_, i) => (
            <ProductLoadingSkeleton
              key={`relatedProduct-empty-skeleton-loading-${i * 55}`}
            />
          ))}
      </div>
    </div>
  );
}
