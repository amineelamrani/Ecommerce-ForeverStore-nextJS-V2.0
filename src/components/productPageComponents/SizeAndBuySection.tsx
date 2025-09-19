"use client";
import React, { useState } from "react";
import SizesSelectionSection from "./SizesSelectionSection";
import { Button } from "../ui/button";

export default function SizeAndBuySection({ sizes }: { sizes: string[] }) {
  const [productSizeSelected, setProductSizeSelected] = useState<string>("");
  // Will have an onClick in the ADD TO Cart button : when clicked will check the size and if all is good need to add it in the basket and store it in localStorage
  // And use a setBasket to store the products selected in the basket

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
