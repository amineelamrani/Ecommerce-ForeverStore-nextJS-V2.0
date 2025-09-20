"use client";
import React, { useContext, useState } from "react";
import SizesSelectionSection from "./SizesSelectionSection";
import { Button } from "../ui/button";
import { Toaster } from "../ui/sonner";
import { toast } from "sonner";
import { UserContext } from "@/contexts/userContext";

interface sizeAndBuyProps {
  id: string;
  title: string;
  image: string;
  price: number;
}

export default function SizeAndBuySection({
  sizes,
  productInfos,
}: {
  sizes: string[];
  productInfos: sizeAndBuyProps;
}) {
  const [productSizeSelected, setProductSizeSelected] = useState<string>("");
  const context = useContext(UserContext);
  if (!context) {
    console.log("there is an error while uploading context");
    return <></>;
  }
  const { addProductToBasket } = context;
  // Will have an onClick in the ADD TO Cart button : when clicked will check the size and if all is good need to add it in the basket and store it in localStorage
  // And use a setBasket to store the products selected in the basket

  const handleAddCart = () => {
    // When clikcing on the Add to cart button
    // check if size given -> If not display an error using Toaster
    if (productSizeSelected.length === 0) {
      toast.error("Please choose the size", {
        duration: 3000,
      });
    } else {
      // if all are given then call 'addProductToBasket' using productInfos and size selected
      // After calling it display a toast.success that product is added to the basket (optimistic display it before calling the function)
      toast.success("Product added to the basket", {
        duration: 1500,
      });
      addProductToBasket({ ...productInfos, size: productSizeSelected });
    }
  };

  return (
    <>
      <Toaster
        position="top-right"
        expand={true}
        richColors
        visibleToasts={1}
      />
      <SizesSelectionSection sizes={sizes} setSize={setProductSizeSelected} />
      <div className="flex gap-2" id="add-to-cart-section">
        <Button className="w-38 hover:cursor-pointer" onClick={handleAddCart}>
          ADD TO CART
        </Button>
        {/* Section for only verified purchasers  */}
      </div>
    </>
  );
}
