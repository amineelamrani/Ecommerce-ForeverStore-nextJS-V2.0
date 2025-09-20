/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { BasketContentType } from "@/contexts/userContext";

interface cartItemsProps {
  item: BasketContentType;
  position?: number;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    position: number
  ) => void;
  handleDelete: (e: React.MouseEvent<SVGSVGElement>) => void;
}

export default function CartItemComponent({
  item,
  position = 0,
  handleChange,
  handleDelete,
}: cartItemsProps) {
  const [quantity, setQuantity] = useState<number>(item ? item.quantity : 0);
  return (
    <div>
      <div className="flex w-full border-b border-t py-5">
        <img src={item.image} alt="" className="h-18 w-15 md:h-25 md:w-20" />

        <div className="flex justify-between items-center w-full px-1 md:px-7">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-xs md:text-base">{item.title}</h1>

            <div className="flex gap-3">
              <h3 className="text-xs md:text-base">${item.price}</h3>
              <p className="border px-1 md:px-2 items-center text-xs md:text-base">
                {item.size}
              </p>
            </div>
          </div>

          <div>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => {
                handleChange(e, position);
                setQuantity(Number(e.target.value));
              }}
              className="w-8 md:w-15 border px-1 text-xs md:text-base"
            />
          </div>
          <Trash2
            className="hover:cursor-pointer z-10 w-6 h-6 sm:w-8 sm:h-8 md:h-9 md:w-9 ml-1"
            id={`item-${position}`}
            onClick={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}
