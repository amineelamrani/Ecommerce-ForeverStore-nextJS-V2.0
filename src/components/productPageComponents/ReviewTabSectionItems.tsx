"use client";
import { ReviewInterface, userDoc } from "@/models/review";
import { fetchProductReviews } from "@/serverActions/actions";
import React, { useEffect, useState } from "react";
import FiveStarsFeedback from "../FiveStarsFeedback";
import { ReviewsSkeleton } from "../ReviewsSkeleton";

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
            ownerName: (review.owner as userDoc).name,
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

  return (
    <>
      {fetchedReviews &&
        fetchedReviews.length > 0 &&
        fetchedReviews.map((review) => (
          <div
            className="w-full px-3 py-2 bg-slate-100 rounded-lg"
            key={`review-${review.createdAt}`}
          >
            <div className="flex flex-row justify-between items-center pb-2">
              <div className="flex flex-col">
                <h1 className="font-bold text-xs sm:text-sm md:text-base">
                  {review.ownerName}
                </h1>
                <FiveStarsFeedback size={10} rating={review.rating} />
              </div>
              <h3 className="text-xs sm:text-sm md:text-base">
                {review.createdAt.split("T")[0]}
              </h3>
            </div>
            <h2 className="font-bold text-xs md:text-base">{title}</h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-500">
              {review.content}
            </p>
          </div>
        ))}
      {!fetchedReviews && (
        <div className="w-full px-3 py-2 rounded-lg">
          <ReviewsSkeleton />
        </div>
      )}
    </>
  );
}
