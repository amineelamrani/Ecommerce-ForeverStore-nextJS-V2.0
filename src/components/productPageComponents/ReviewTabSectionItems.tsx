"use client";
import { ReviewInterface } from "@/models/review";
import { fetchProductReviews } from "@/serverActions/actions";
import React, { useEffect, useState } from "react";

interface reviewNeededItems {
  ownerName: string;
  content: string;
  rating: number;
  createdAt: string;
  product: {
    title: string;
  };
}

export default function ReviewTabSectionItems({
  productID,
  title,
}: {
  productID: string;
  title: string;
}) {
  const [fetchedReviews, setFetchedReviews] = useState<
    reviewNeededItems[] | null
  >(null);

  useEffect(() => {
    const fetchingReviews = async () => {
      const getReviews = await fetchProductReviews(productID);

      if (getReviews.status === "success") {
        const newReviewsArray = JSON.parse(getReviews.result!).map(
          (review: ReviewInterface) => ({
            ownerName: review.owner.name,
            content: review.content,
            rating: review.rating,
            createdAt: review.createdAt,
            product: {
              title: title,
            },
          })
        );

        setFetchedReviews(newReviewsArray);
      }
    };
    fetchingReviews();
  }, []);

  // Now fetchedReviews are ready to be integrated in the reviews tab section + Need to have loading effect when fetching or when opening the tab first time

  return <div>ReviewTabSectionItems</div>;
}
