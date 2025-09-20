"use client";
import React, { useContext } from "react";
import Image from "next/image";
import { UserContext } from "@/contexts/userContext";

export default function BasketIconHeader() {
  const context = useContext(UserContext);
  if (!context) {
    console.log("there is an error while uploading context");
    return <></>;
  }
  const { basketContent } = context;

  const calculateOrdersNumber = () => {
    let counter = 0;
    for (let i = 0; i < basketContent!.length; i++) {
      counter += basketContent![i].quantity;
    }
    return counter;
  };

  return (
    <div className="relative flex items-center justify-center">
      <p className="absolute flex items-center justify-center rounded-full bg-black text-white text-center text-[6px] w-3 h-3 bottom-0 right-0">
        {basketContent ? `${calculateOrdersNumber()}` : "0"}
      </p>
      <Image
        src="/cart-icon.svg"
        alt="Icon"
        width={24}
        height={24}
        className="w-6 h-6"
      />
    </div>
  );
}
