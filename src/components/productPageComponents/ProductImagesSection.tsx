"use client";
import { UserContext } from "@/contexts/userContext";
import {
  addReview,
  isProductPurchased,
  isProductReviewed,
} from "@/serverActions/actions";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Loader2, MousePointerClick } from "lucide-react";
import FiveStarsInputReview from "./FiveStarsInputReview";

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
  const [reviewItem, setReviewItem] = useState({
    content: "",
    rating: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(UserContext);
  useEffect(() => {
    const isProductPurchasedAndDeliverd = async (productID: string) => {
      const isPurchased = await isProductPurchased(productID);
      if (isPurchased) {
        setPurchased(true);
      }
    };

    const isPrReviewed = async (productID: string) => {
      const isReviewed = await isProductReviewed(productID);
      if (isReviewed) {
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

  const handleAddReview = async () => {
    // Algo
    // set loading to true
    // do a fetch to add the review (dont give the user the possibility to update while it is on loading)
    // once done successfully => show that it is done successfully thank him - click anywhere to close - dont give the possibility to review again
    setIsLoading(true);
    if (reviewItem.content !== "") {
      // Function to add the review in the database
      const addingReview = await addReview(
        productID,
        reviewItem.content,
        reviewItem.rating
      );
      if (addingReview) {
        setIsLoading(false);
        setReviewed(true);
      }
    }
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
        {purchased && !reviewed && (
          // Insted of adding add review near add to cart I will use it in top of the impage
          <Dialog>
            <DialogTrigger className="bg-green-300 rounded-md hover:cursor-pointer hover:text-white text-black absolute left-0 top-4 px-2 -rotate-20 flex items-center">
              ADD REVIEW <MousePointerClick className="animate-bounce" />
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adding review</DialogTitle>
                <DialogDescription className="text-xs">
                  Thanks for purchasing from us. Now next step is to kindly give
                  us your feedback on the items purchased Dear client so we can
                  improve our services!
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-3">
                <div className="flex w-full items-center gap-2">
                  <Label htmlFor="content">Review</Label>
                  <Input
                    type="text"
                    id="content"
                    value={reviewItem.content}
                    onChange={(e) => {
                      setReviewItem({
                        ...reviewItem,
                        ["content"]: e.target.value,
                      });
                    }}
                    placeholder="Please provide your review..."
                  />
                </div>
                <div className="flex w-full items-center gap-2">
                  <Label>Rating</Label>
                  <FiveStarsInputReview
                    setReviewItem={setReviewItem}
                    reviewItem={reviewItem}
                  />
                </div>
              </div>

              <DialogFooter>
                {!reviewed && (
                  <Button
                    onClick={handleAddReview}
                    disabled={isLoading ? true : false}
                  >
                    {isLoading && <Loader2 className="animate-spin" />}
                    Add review
                  </Button>
                )}

                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
