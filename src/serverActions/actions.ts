"use server";

import { Order, Product, Review, User } from "@/models/models";
import { revalidateTag } from "next/cache";
import { getUserId } from "./authActions";

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

export const isProductPurchased = async (productID: string) => {
  // This server function to get all the products purchased by the currentUser
  const userId = await getUserId();
  if (!userId) {
    return false;
  }

  const impactedUser = await User.findById(userId)
    .select("orders")
    .populate("orders", "products statusDelivery");
  // We have array of impactedUser.orders and inside each array a nest array of .products

  for (let i = 0; i < impactedUser.orders.length; i++) {
    const { statusDelivery } = impactedUser.orders[i];
    if (statusDelivery === "Delivered") {
      // console.log(impactedUser.orders[i]);
      for (let j = 0; j < impactedUser.orders[i].products.length; j++) {
        if (
          impactedUser.orders[i].products[j].productID.toString() === productID
        ) {
          return true;
        }
      }
    }
  }

  return false;
};

export const isProductReviewed = async (productID: string) => {
  // This given the currentUser and the productID will check whether the user has already reviewed that product
  const userId = await getUserId();
  if (!userId) {
    return false;
  }
  const userReviews = await Review.find({
    product: productID,
    owner: userId,
  });
  if (userReviews && userReviews.length > 0) {
    return true;
  }
  return false;
};

export const addReview = async (
  productID: string,
  reviewContent: string,
  reviewRating: number
) => {
  try {
    const userId = await getUserId();
    if (!userId) {
      return false;
    }
    const newReview = await Review.create({
      owner: userId,
      content: reviewContent,
      rating: reviewRating,
      product: productID,
    });
    if (!newReview) {
      return false;
    }
    const product = await Product.findById(productID);
    product.reviewsNumber++;
    if (product.reviewsNumber === 1) {
      product.reviewsMedian = reviewRating;
    } else {
      product.reviewsMedian = (product.reviewsMedian + reviewRating) / 2;
    }

    await product.save();
    return true;
  } catch (err) {
    return false;
  }
};

export const getOrder = async (orderID: string) => {
  const order = await Order.findById(orderID).populate("products.productID");
  if (!order) {
    return null;
  }
  return JSON.stringify(order);
};

export const revalidateTagTest = async () => {
  revalidateTag("productData");
};
