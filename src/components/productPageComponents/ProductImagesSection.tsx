"use client";
import { UserContext } from "@/contexts/userContext";
import { isProductPurchased, isProductReviewed } from "@/serverActions/actions";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";

export default function ProductImagesSection({
  images,
  productID,
}: {
  images: string[];
  productID: string;
}) {
  const [highlightedImage, setHighlightedImage] = useState(images[0]);
  const [purchased, setPurchased] = useState(false);
  const [reviewed, setReviewed] = useState(false);
  const context = useContext(UserContext);
  useEffect(() => {
    const isProductPurchasedAndDeliverd = async (productID: string) => {
      const isPurchased = await isProductPurchased(productID);
      if (isPurchased) {
        console.log("purchased");
        setPurchased(true);
      }
    };

    const isPrReviewed = async (productID: string) => {
      const isReviewed = await isProductReviewed(productID);
      if (isReviewed) {
        console.log("reviewed");
        setReviewed(true);
      }
    };

    if (context?.currentUser) {
      // Check only when the currentUser is known
      isProductPurchasedAndDeliverd(productID);
      isPrReviewed(productID);
    }
  }, [context]);

  if (!context) {
    return <></>;
  }

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const url = new URL(e.currentTarget.currentSrc);
    const encoded = url.searchParams.get("url");

    setHighlightedImage(encoded ? encoded : images[0]);
  };

  return (
    <div className="w-full md:w-1/2 flex flex-col md:flex-row items-start justify-center gap-2 relative overflow-hidden">
      <div className="hidden md:flex flex-col gap-1 max-w-15 ">
        {images.map((image) => (
          <Image
            src={image}
            alt="Product- Image"
            key={image}
            className=" hover:cursor-pointer"
            width={1050}
            height={1050}
            onClick={handleImageClick}
          />
        ))}
      </div>
      <div className="w-full h-full relative">
        <Image
          src={highlightedImage}
          className="w-full h-full"
          alt="highlighted-image-selected-section"
          width={1050}
          height={1050}
        />
        {purchased && (
          <p className="absolute right-0 top-4 bg-yellow-500 px-2 rotate-20 rounded-sm">
            Purchased
          </p>
        )}
        {reviewed && (
          <p className="absolute left-0 top-4 bg-green-200 px-2 -rotate-20 rounded-sm">
            Reviewed
          </p>
        )}
      </div>

      <div className="flex md:hidden flex-row gap-1 max-w-15">
        {images.map((image) => (
          <Image
            src={image}
            alt="Product- Image"
            key={image}
            className=" hover:cursor-pointer"
            width={1050}
            height={1050}
            onClick={handleImageClick}
          />
        ))}
      </div>
    </div>
  );
}
