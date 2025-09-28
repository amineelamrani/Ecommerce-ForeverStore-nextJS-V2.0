"use client";
import React from "react";
import SearchField from "./SearchField";
import CollectionSideBar from "./CollectionSideBar";
import CollectionsResultDisplaySection from "./CollectionsResultDisplaySection";

export default function ClientSideCollectionComponent({
  products,
}: {
  products: string;
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
