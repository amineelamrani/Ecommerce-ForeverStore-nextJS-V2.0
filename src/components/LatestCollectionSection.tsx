import { ProductsInterface } from "@/models/product";
import React from "react";
import CollectionItemCard from "./CollectionItemCard";

interface latestSectionProps {
  collections: ProductsInterface[] | null;
}

export default function LatestCollectionSection({
  collections,
}: latestSectionProps) {
  return (
    <div className="w-full flex flex-col gap-5 items-center">
      <h1 className="relative text-xl md:text-2xl font-bold after:content-[''] after:absolute after:top-1/2 after:w-8 md:after:w-14 after:h-[2px] after:bg-black">
        <span className="text-slate-500">LATEST</span> COLLECTIONS
      </h1>
      <p className="text-center text-xs md:text-sm">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the.
      </p>
      {
        <div className="w-full flex flex-wrap">
          {collections &&
            collections.map((product, index) => (
              <CollectionItemCard
                title={product.title}
                price={product.price}
                image={product.images[0]}
                key={index}
                id={product._id!.toString()}
              />
            ))}
        </div>
      }
    </div>
  );
}
