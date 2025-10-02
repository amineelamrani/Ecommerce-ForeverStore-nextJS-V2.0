"use client";
import AddingProduct from "@/components/adminComponents/AddingProduct";
import RevalidateRoutes from "@/components/adminComponents/RevalidateRoutes";
import ViewingOrders from "@/components/adminComponents/ViewingOrders";
import ViewingProducts from "@/components/adminComponents/ViewingProducts";
import { UserContext } from "@/contexts/userContext";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

export default function AdminRoute() {
  const context = useContext(UserContext);
  const router = useRouter();
  const [tabSelected, setTabSelected] = useState("adding"); //values : adding, update, orders
  useEffect(() => {
    if (context) {
      if (context.currentUser && !context.currentUser.admin) {
        router.push("/login");
      }
    }
  }, [context]);

  if (!context) {
    return <h1>Checking if You have admin rights...</h1>;
  }
  const { currentUser } = context;

  const handleSelectClick = (e: React.MouseEvent<HTMLLIElement>) => {
    setTabSelected(e.currentTarget.id);
  };

  return (
    <>
      {currentUser && currentUser.admin && (
        <div className="flex flex-col md:flex-row relative">
          <div className="w-full md:w-1/5 sticky backdrop-blur-3xl top-0 md:relative border-b-2 md:border-none">
            <ul className="sticky top-0 right-0 pl-5 py-5 flex flex-col gap-3">
              <li
                onClick={handleSelectClick}
                id="adding"
                className={`rounded-l-sm border-t-2 border-l-2 border-b-2 p-2 hover:cursor-pointer hover:bg-gray-200 ${
                  tabSelected === "adding" ? "bg-gray-200" : "bg-white"
                }`}
              >
                Add Products
              </li>
              <li
                onClick={handleSelectClick}
                id="update"
                className={`rounded-l-sm border-t-2 border-l-2 border-b-2 p-2 hover:cursor-pointer hover:bg-gray-200 ${
                  tabSelected === "update" ? "bg-gray-200" : "bg-white"
                }`}
              >
                View Products
              </li>
              <li
                onClick={handleSelectClick}
                id="orders"
                className={`rounded-l-sm border-t-2 border-l-2 border-b-2 p-2 hover:cursor-pointer hover:bg-gray-200 ${
                  tabSelected === "orders" ? "bg-gray-200" : "bg-white"
                }`}
              >
                Orders
              </li>
              <li
                onClick={handleSelectClick}
                id="revalidate"
                className={`rounded-l-sm border-t-2 border-l-2 border-b-2 p-2 hover:cursor-pointer hover:bg-gray-200 ${
                  tabSelected === "revalidate" ? "bg-gray-200" : "bg-white"
                }`}
              >
                Revalidate
              </li>
            </ul>
          </div>

          <div className="w-full md:w-4/5 border-l-2">
            {tabSelected === "adding" && <AddingProduct />}
            {tabSelected === "update" && <ViewingProducts />}
            {tabSelected === "orders" && <ViewingOrders />}
            {tabSelected === "revalidate" && <RevalidateRoutes />}
          </div>
        </div>
      )}
    </>
  );
}
