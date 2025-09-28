import ClientSideCollectionComponent from "@/components/ClientSideCollectionComponent";
import { unstable_cache } from "next/cache";
import React from "react";

export default function CollectionRoute() {
  // No need for searchParams in the url, I will display the search input by default
  // and then when typing it will be a real time change on the client side
  const fetchProduct = unstable_cache(
    async () => {
      // fetched for the allproducts and store them in a variable
      // Data will be fetched one time and the other could be client sided for interactivity and ...etc
    },
    ["fetchAllProduct"],
    {
      tags: ["fetchAllProduct"],
    }
  );

  return (
    <div className="flex flex-col w-full py-5 items-center">
      <ClientSideCollectionComponent products={fetchedProducts} />
    </div>
  );
}
