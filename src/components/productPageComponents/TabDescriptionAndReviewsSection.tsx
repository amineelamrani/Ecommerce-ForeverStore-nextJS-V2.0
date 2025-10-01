"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ReviewTabSectionItems from "./ReviewTabSectionItems";
import { fetchProductReviews } from "@/serverActions/actions";
import { ReviewInterface, userDoc } from "@/models/review";

export interface reviewNeededItems {
  ownerName: string;
  content: string;
  rating: number;
  createdAt: string;
  product: {
    title: string;
  };
}

export default function TabDescriptionAndReviewsSection({
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

  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="border">
        <TabsTrigger value="description" className=" hover:cursor-pointer">
          Description
        </TabsTrigger>
        <TabsTrigger value="reviews" className=" hover:cursor-pointer">
          Reviews
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="description"
        className="border p-3 text-xs sm:text-sm md:text-base"
      >
        An e-commerce website is an online platform that facilitates the buying
        and selling of products or services over the internet. It serves as a
        virtual marketplace where businesses and individuals can showcase their
        products, interact with customers, and conduct transactions without the
        need for a physical presence. E-commerce websites have gained immense
        popularity due to their convenience, accessibility, and the global reach
        they offer.
        <br />
        E-commerce websites typically display products or services along with
        detailed descriptions, images, prices, and any available variations
        (e.g., sizes, colors). Each product usually has its own dedicated page
        with relevant information.
      </TabsContent>
      <TabsContent value="reviews" className="border p-3 flex flex-col gap-3">
        {/* Here I should fetch for the reviews in the client side from an API (this
        decision is for the sake of enhancing the time to client) */}
        <ReviewTabSectionItems
          title={title}
          productID={productID}
          fetchedReviews={fetchedReviews}
        />
      </TabsContent>
    </Tabs>
  );
}
