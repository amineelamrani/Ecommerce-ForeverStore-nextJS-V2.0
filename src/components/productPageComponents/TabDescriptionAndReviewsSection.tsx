import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export default function TabDescriptionAndReviewsSection({
  productID,
}: {
  productID: string;
}) {
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="border">
        <TabsTrigger value="description" className=" hover:cursor-pointer">
          Description
        </TabsTrigger>
        <TabsTrigger value="reviews" className=" hover:cursor-pointer">
          Reviews
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="description"
        className="border p-3 text-xs sm:text-sm md:text-base"
      >
        An e-commerce website is an online platform that facilitates the buying
        and selling of products or services over the internet. It serves as a
        virtual marketplace where businesses and individuals can showcase their
        products, interact with customers, and conduct transactions without the
        need for a physical presence. E-commerce websites have gained immense
        popularity due to their convenience, accessibility, and the global reach
        they offer.
        <br />
        E-commerce websites typically display products or services along with
        detailed descriptions, images, prices, and any available variations
        (e.g., sizes, colors). Each product usually has its own dedicated page
        with relevant information.
      </TabsContent>
      <TabsContent value="reviews" className="border p-3 flex flex-col gap-3">
        Here I should fetch for the reviews in the client side from an API (this
        decision is for the sake of enhancing the time to client)
      </TabsContent>
    </Tabs>
  );
}
