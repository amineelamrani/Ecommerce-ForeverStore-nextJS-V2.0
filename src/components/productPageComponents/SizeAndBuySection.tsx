"use client";
import React from "react";
import SizesSelectionSection from "./SizesSelectionSection";
import { Button } from "../ui/button";

export default function SizeAndBuySection({ sizes }: { sizes: string[] }) {
  return (
    <>
      <SizesSelectionSection sizes={sizes} />
      <div className="flex gap-2" id="add-to-cart-section">
        <Button
          className="w-38"
          onClick={() => console.log("Item added to the cart")}
        >
          ADD TO CART
        </Button>
        {/* Section for only verified purchasers  */}
      </div>
    </>
  );
}
