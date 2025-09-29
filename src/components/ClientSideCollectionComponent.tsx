"use client";
import React, { useState } from "react";
import SearchField from "./SearchField";
import CollectionSideBar from "./CollectionSideBar";
import CollectionsResultDisplaySection from "./CollectionsResultDisplaySection";
import { ProductsInterface } from "@/models/product";

export default function ClientSideCollectionComponent({
  products,
}: {
  products: ProductsInterface[] | null;
}) {
  const [searchValue, setSearchValue] = useState<string>(""); //State that holds the content in the search input
  const [categories, setCategories] = useState({
    Men: true,
    Women: true,
    Kids: true,
  });
  const [types, setTypes] = useState({
    Topwear: true,
    Bottomwear: true,
    Winterwear: true,
  });
  const [sorting, setSorting] = useState<string>("relevant");

  const handleCheckboxCatChange = (checked: boolean | string, id: string) => {
    setCategories({ ...categories, [id]: checked });
  };
  const handleCheckboxTypeChange = (checked: boolean | string, id: string) => {
    setTypes({ ...types, [id]: checked });
  };

  return (
    <>
      <SearchField searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="flex flex-col md:flex-row w-full py-5">
        <CollectionSideBar
          categories={categories}
          types={types}
          handleCheckboxCatChange={handleCheckboxCatChange}
          handleCheckboxTypeChange={handleCheckboxTypeChange}
        />
        <CollectionsResultDisplaySection
          sorting={sorting}
          setSorting={setSorting}
        />
      </div>
    </>
  );
}
