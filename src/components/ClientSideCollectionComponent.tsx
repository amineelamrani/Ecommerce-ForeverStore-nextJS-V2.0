"use client";
import React, { useState } from "react";
import SearchField from "./SearchField";
import CollectionSideBar from "./CollectionSideBar";
import CollectionsResultDisplaySection from "./CollectionsResultDisplaySection";
import { ProductsInterface } from "@/models/product";
import CollectionSearchCard from "./CollectionSearchCard";

export default function ClientSideCollectionComponent({
  products,
}: {
  products: ProductsInterface[];
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

  let sortedProducts: ProductsInterface[] = [];
  let searchCardsContent: (React.JSX.Element | undefined)[] = [];

  function sortByPriceLowToHigh(items: ProductsInterface[]) {
    items.sort((a, b) => a.price - b.price);
  }
  function sortByPriceHighToLow(items: ProductsInterface[]) {
    items.sort((a, b) => b.price - a.price);
  }

  if (sorting === "relevant") {
    sortedProducts = [...products];
  } else if (sorting === "lowest") {
    sortedProducts = [...products];
    sortByPriceLowToHigh(sortedProducts);
  } else if (sorting === "highest") {
    sortedProducts = [...products];
    sortByPriceHighToLow(sortedProducts);
  }

  if (
    sortedProducts !== null &&
    searchValue !== null &&
    searchValue.length > 1
  ) {
    const lowerFormatSearch = searchValue.toLowerCase();
    const arr = sortedProducts.filter((item) =>
      item.title.toLowerCase().includes(lowerFormatSearch)
    );
    sortedProducts = [...arr];
  }

  const { Topwear, Bottomwear, Winterwear } = types;
  if (!Topwear && !Bottomwear && !Winterwear) {
    searchCardsContent = [
      <h1
        className="text-xl text-red-500 italic my-1 mx-auto"
        key={`Empty-no-result-empty`}
      >
        No Item Found!
      </h1>,
    ];
  } else {
    searchCardsContent = sortedProducts.map((product, index) => {
      for (const [key, value] of Object.entries(categories)) {
        if (value && product.category.includes(key)) {
          // check the types now
          if (Topwear && Bottomwear && Winterwear) {
            return (
              <CollectionSearchCard
                title={product.title}
                price={product.price}
                image={product.images[0]}
                key={`${product._id!.toString()}-${index}`}
                id={product._id!.toString()}
              />
            );
          } else {
            for (const [keyType, valueType] of Object.entries(types)) {
              if (valueType && product.subCategory.includes(keyType)) {
                return (
                  <CollectionSearchCard
                    title={product.title}
                    price={product.price}
                    image={product.images[0]}
                    id={product._id!.toString()}
                    key={`${product._id!.toString()}-${index}`}
                  />
                );
              }
            }
          }
        }
      }
    });

    if (searchCardsContent.filter((item) => item !== undefined).length === 0) {
      searchCardsContent = [
        <h1
          className="text-xl text-red-500 italic my-1 mx-auto"
          key={`not-found-empty`}
        >
          No Item Found!
        </h1>,
      ];
    }
  }

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
          setSorting={setSorting}
          searchCardsContent={searchCardsContent}
        />
      </div>
    </>
  );
}
