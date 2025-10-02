import ProductImagesSection from "@/components/productPageComponents/ProductImagesSection";
import ProductInfosSection from "@/components/productPageComponents/ProductInfosSection";
import RelatedProductsSection from "@/components/productPageComponents/RelatedProductsSection";
import TabDescriptionAndReviewsSection from "@/components/productPageComponents/TabDescriptionAndReviewsSection";
import dbConnect from "@/lib/database/dbConnect";
import { Product } from "@/models/models";
import { ProductsInterface } from "@/models/product";
import { unstable_cache } from "next/cache";
import React from "react";
import type { Metadata } from "next";

const fetchCachedProduct = unstable_cache(
  async (product_id) => {
    if (!product_id) {
      return null;
    }
    const pageProduct = await Product.findById(product_id);
    if (!pageProduct) {
      return null;
    }
    return pageProduct;
  },
  ["productData"],
  {
    tags: ["productData"],
  }
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ productID: string }>;
}): Promise<Metadata> {
  const { productID } = await params;
  await dbConnect();
  const fetchedProduct: ProductsInterface | null = await fetchCachedProduct(
    productID
  );

  return {
    title: fetchedProduct ? fetchedProduct.title : "PRODUCT", // <title>{product.title}</title>
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productID: string }>;
}) {
  const { productID } = await params;
  await dbConnect();
  const fetchedProduct: ProductsInterface | null = await fetchCachedProduct(
    productID
  );

  return (
    <div className="">
      {fetchedProduct && (
        <div className="w-full">
          <div className="py-14 flex flex-col md:flex-row w-full justify-around items-start md:gap-10 mx-auto">
            <ProductImagesSection
              productID={productID}
              images={fetchedProduct.images}
            />
            <ProductInfosSection
              title={fetchedProduct.title}
              reviewsMedian={fetchedProduct.reviewsMedian}
              reviewsNumber={fetchedProduct.reviewsNumber}
              ordersNumber={fetchedProduct.ordersNumber}
              description={fetchedProduct.description}
              price={fetchedProduct.price}
              sizes={fetchedProduct.sizes}
              id={productID}
              image={fetchedProduct.images[0]}
            />
          </div>

          <TabDescriptionAndReviewsSection
            productID={productID}
            title={fetchedProduct.title}
          />
          <RelatedProductsSection
            category={fetchedProduct.category[0]}
            subCategory={fetchedProduct.subCategory[0]}
          />
        </div>
      )}
    </div>
  );
}
