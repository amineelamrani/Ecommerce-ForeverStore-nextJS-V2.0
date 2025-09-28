"use client";
import React from "react";
import SearchField from "./SearchField";
import CollectionSideBar from "./CollectionSideBar";
import CollectionsResultDisplaySection from "./CollectionsResultDisplaySection";
import { ProductsInterface } from "@/models/product";

export default function ClientSideCollectionComponent({
  products,
}: {
  products: ProductsInterface[] | null;
}) {
  return (
    <>
      <SearchField />
      <div className="flex flex-col md:flex-row w-full py-5">
        <CollectionSideBar />
        <CollectionsResultDisplaySection />
      </div>
    </>
  );
}
