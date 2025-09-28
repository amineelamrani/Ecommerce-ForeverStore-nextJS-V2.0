import ClientSideCollectionComponent from "@/components/ClientSideCollectionComponent";
import dbConnect from "@/lib/database/dbConnect";
import { Product } from "@/models/models";
import { ProductsInterface } from "@/models/product";
import { unstable_cache } from "next/cache";
import React from "react";

const fetchProducts = unstable_cache(
  async () => {
    // fetched for the allproducts and store them in a variable
    // Data will be fetched one time and the other could be client sided for interactivity and ...etc

    try {
      await dbConnect();
      const products = await Product.find();
      if (!products) {
        return null;
      }
      return products;
    } catch (err) {
      console.log(
        "Error while getting products in the /collection route : ",
        err
      );
      return null;
    }
  },
  ["fetchAllProduct"],
  {
    tags: ["fetchAllProduct"],
  }
);

export default async function CollectionRoute() {
  // No need for searchParams in the url, I will display the search input by default
  // and then when typing it will be a real time change on the client side
  const fetchedProducts: ProductsInterface[] | null = await fetchProducts();

  return (
    <div className="flex flex-col w-full py-5 items-center">
      <ClientSideCollectionComponent products={fetchedProducts} />
    </div>
  );
}
