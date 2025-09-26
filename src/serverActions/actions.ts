"use server";

import { Product, Review } from "@/models/models";
import { revalidateTag } from "next/cache";

export const fetchProductReviews = async (productID: string | null) => {
  if (!productID) {
    return {
      status: "fail",
      result: null,
    };
  }
  const reviews = await Review.find({ product: productID }).populate(
    "owner",
    "name"
  );
  if (!reviews) {
    return {
      status: "fail",
      result: null,
    };
  }

  return {
    status: "success",
    result: JSON.stringify(reviews),
  };
};

export const fetchRelatedProduct = async (
  category: string,
  subCategory: string
) => {
  // This server function is for fetching the related based on the category and subCategory of the product
  const relatedProducts = await Product.find({
    category: category,
    subCategory: subCategory,
  }).limit(5);
  if (!relatedProducts) {
    return {
      status: "fail",
      result: null,
    };
  }

  return {
    status: "success",
    result: JSON.stringify(relatedProducts),
  };
};

export const revalidateTagTest = async () => {
  revalidateTag("productData");
};
