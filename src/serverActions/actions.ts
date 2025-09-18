"use server";

import { Review } from "@/models/models";

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
