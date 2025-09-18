import React from "react";
import FiveStarsFeedback from "../FiveStarsFeedback";
import SizesSelectionSection from "./SizesSelectionSection";
import SizeAndBuySection from "./SizeAndBuySection";

interface ProductInfosProps {
  title: string;
  reviewsMedian: number;
  reviewsNumber: number;
  ordersNumber: number;
  description: string;
  price: number;
  sizes: string[];
}

export default function ProductInfosSection({
  title,
  reviewsMedian,
  reviewsNumber,
  ordersNumber,
  description,
  price,
  sizes,
}: ProductInfosProps) {
  return (
    <div className="w-full md:w-1/2 flex flex-col gap-3">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">{title}</h1>
      <div className="flex items-center gap-2 text-sm">
        <FiveStarsFeedback rating={reviewsMedian} />
        <p>{reviewsNumber}</p>
        <p>{ordersNumber} orders</p>
      </div>
      <h3 className="text-3xl font-bold">${price}</h3>
      <p className="text-slate-600 text-xs sm:text-sm md:text-base">
        {description}
      </p>
      <SizeAndBuySection sizes={sizes} />
      <div className="w-full border-t py-5 text-xs font-mono text-slate-500 flex flex-col gap-1">
        <p>100% Original product.</p>
        <p>Cash on delivery is available on this product.</p>
        <p>Easy return and exchange policy within 7 days.</p>
      </div>
    </div>
  );
}
