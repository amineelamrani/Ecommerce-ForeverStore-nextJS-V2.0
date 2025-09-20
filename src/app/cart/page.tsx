"use client";
import React, { useContext } from "react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { UserContext } from "@/contexts/userContext";
import CartItemComponent from "@/components/cartComponents/CartItemComponent";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

// This page would be purely client side (as there is a need for accessing localstorage ... and No need for the  SEO for this specific route)

export default function Cart() {
  const context = useContext(UserContext);
  const router = useRouter();

  if (!context) {
    console.log("there is an error while uploading context");
    return <></>;
  }
  const { basketContent, currentUser, setBasketContent } = context;

  let cartContentItems = [
    <h1
      className="flex items-center gap-2 text-gray-600"
      key="starting-cart-content-empty"
    >
      Loading Cart Items <LoaderCircle className="animate-spin" size={15} />
    </h1>,
    <div
      key="second-items-starting-cart-content-empty"
      className="flex items-center space-x-4 "
    >
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>,
  ];
  let subTotal = 0;
  if (basketContent !== null) {
    for (let i = 0; i < basketContent.length; i++) {
      subTotal += basketContent[i].quantity * basketContent[i].price;
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    position: number
  ) => {
    // need to update the content in the localStorage after clicking on the increase quantity input field
    const cartCopy = [...basketContent!];
    cartCopy[position].quantity = Number(e.target.value);
    // we need to change the quantity and we set it in basketContent and then we add it in localStorage
    setBasketContent(cartCopy);
    localStorage.eCommerceForeverNextJS = JSON.stringify(cartCopy);
  };

  const handleDelete = (e: React.MouseEvent<SVGSVGElement>) => {
    const position = Number(e.currentTarget.id.split("-")[1]);
    if (position === undefined) return;
    const cartCopy = basketContent!.filter(
      (_, index) => index !== position * 1
    );
    setBasketContent(cartCopy);
    localStorage.eCommerceForeverNextJS = JSON.stringify(cartCopy);
  };

  const handleCheckoutClick = () => {
    if (!currentUser) {
      toast("You must be logged in to checkout!", {
        duration: 2000,
        action: {
          label: "Login",
          onClick: () => router.push("/login"),
        },
      });
    }
  };

  if (basketContent !== null) {
    cartContentItems = basketContent.map((item, index) => {
      return (
        <CartItemComponent
          item={item}
          position={index}
          key={`${item.size}-${index}-${item.title}`}
          handleChange={handleChange}
          handleDelete={handleDelete}
        />
      );
    });
  }

  return (
    <div className="pt-18 flex flex-col gap-2">
      <Toaster
        position="top-right"
        expand={true}
        richColors
        visibleToasts={1}
      />
      <h1 className="mb-4 relative text-xl md:text-2xl font-bold after:content-[''] after:absolute after:top-1/2 after:w-8 md:after:w-14 after:h-[2px] after:bg-black">
        <span className="text-slate-500">YOUR</span> CART
      </h1>
      <div>{cartContentItems}</div>

      {basketContent !== null && basketContent.length > 0 && (
        <div className="mt-15 w-full flex flex-col items-end ">
          <div className="flex flex-col items-start w-2/3 md:w-1/2">
            <h1 className="mr-14 relative text-xl md:text-2xl font-bold after:content-[''] after:absolute after:top-1/2 after:w-8 md:after:w-14 after:h-[2px] after:bg-black">
              <span className="text-slate-500">CART</span> TOTALS
            </h1>
            <div className="flex flex-row w-full justify-between py-2 text-xs md:text-base">
              <h2>Subtotal</h2>
              <p>${subTotal}</p>
            </div>
            <div className="flex flex-row w-full justify-between border-t border-b py-2 text-xs md:text-base">
              <h2>Shipping Fee</h2>
              <p>$10</p>
            </div>
            <div className="flex flex-row w-full justify-between py-2 font-bold text-xs md:text-base">
              <h2>Total</h2>
              <p>${subTotal + 10 * 1}</p>
            </div>
            <div className="w-full flex flex-col items-end pt-3">
              <Button
                className="px-2 md:px-5 text-xs md:text-base"
                onClick={handleCheckoutClick}
              >
                PROCEED TO CHECKOUT
              </Button>
            </div>
          </div>
        </div>
      )}
      {!basketContent ||
        (basketContent.length === 0 && <h1>Cart Is Empty...</h1>)}
    </div>
  );
}
