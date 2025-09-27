"use client";
import PurchasesElements from "@/components/PurchasesElements";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserContext } from "@/contexts/userContext";
import { OrdersInterface } from "@/models/order";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";

export interface OrderClientInterface {
  _id: string;
  products: {
    productID: ProductClientInterface;
    size: string;
    quantity: number;
    title: string;
  }[];
  owner: string;
  payment: {
    method: string;
    status: string;
    money: number;
  };
  statusDelivery: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductClientInterface {
  _id: string;
  title: string;
  description: string;
  price: number;
  sizes: string[];
  images: string[];
  category: string[];
  subCategory: string[];
  reviewsNumber: number;
  reviewsMedian: number;
  ordersNumber: number;
  createdAt?: string;
  updatedAt?: string;
}

export default function Purchased() {
  const [orderHighlights, setOrderHighlights] =
    useState<OrderClientInterface | null>(null);
  const context = useContext(UserContext);
  const router = useRouter();
  if (!context) {
    return <></>;
  }
  const { currentUser } = context;

  return (
    <div className="pt-10 flex flex-col w-full gap-2">
      {orderHighlights !== null && (
        <div className="absolute w-full h-full z-50 gap-2 flex flex-col items-center justify-center bg-white/30 backdrop-blur-md px-2 md:px-15">
          <div className="w-full">
            <h1 className="text-center text-base md:text-3xl font-bold">
              Your Order {orderHighlights._id} Infos
            </h1>
            <h2 className="text-base md:text-xl">Products Requested</h2>
            {orderHighlights.products.map((item, index) => (
              <div
                className="flex w-full gap-2 hover:cursor-pointer hover:bg-gray-100 bg-transparent transition duration-400 ease-in-out"
                key={`product-key-${index}`}
                onClick={() => {
                  setOrderHighlights(null);
                  router.push(`/product/${item.productID._id}`);
                }}
              >
                <Image
                  src={item.productID.images[0]}
                  alt=""
                  className="w-10 h-13 md:w-15 md:h-18 hover:cursor-pointer hover:scale-110 transition duration-200 ease-in-out"
                  width={15}
                  height={18}
                  onClick={() => {
                    setOrderHighlights(null);
                    router.push(`/product/${item.productID._id}`);
                  }}
                />
                <div className="text-xs md:text-base">
                  <h1
                    className="font-bold"
                    onClick={() => {
                      setOrderHighlights(null);
                      router.push(`/product/${item.productID._id}`);
                    }}
                  >
                    {item.productID.title}
                  </h1>
                  <p>
                    {item.size} x {item.quantity} | Price : $
                    {item.productID.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}
            <div className="w-full flex justify-end py-5 px-10">
              <Button onClick={() => setOrderHighlights(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}

      <h1 className="mr-14 relative text-xl md:text-2xl font-bold after:content-[''] after:absolute after:top-1/2 after:w-8 md:after:w-14 after:h-[2px] after:bg-black">
        <span className="text-slate-500">YOUR</span> PURCHASES
      </h1>
      <Table className="text-xs md:text-base">
        <TableCaption>Table of all of your purchases</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead> </TableHead>
            <TableHead>Order ID</TableHead>
            <TableHead>Delivery Status</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Payment Status</TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentUser?.orders.map((item, index) => (
            <PurchasesElements
              setOrderHighlights={setOrderHighlights}
              orderID={item}
              index={index}
              key={index}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
