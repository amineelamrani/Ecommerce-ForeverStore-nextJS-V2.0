import React from "react";
import dbConnect from "@/lib/database/dbConnect";
import { Product } from "@/models/models";
import { unstable_cache } from "next/cache";
import HomePageCarousel from "@/components/HomePageCarousel";
import LatestCollectionSection from "@/components/LatestCollectionSection";
import BestSellersSection from "@/components/BestSellersSection";
import { ProductsInterface } from "@/models/product";
import { BadgeCheck, Headset, RefreshCcwDot } from "lucide-react";
import HighlightItem from "@/components/HighlightItem";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Build the static version of the home page
// it will be a Static generated page and it will rebuilt when the admin adds a new product
// The rating and orders (and other high dynamic vars) will be client sided so when the page get to the user, the browser will fetch for that data in order to lower the time to response (it is more important in this case as I dont need them for SEO - only indexing the product infos)

const fetchCachedLatestCollections = unstable_cache(
  async () => {
    const collections = await Product.find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .exec();
    if (!collections || collections.length < 9) {
      return null;
    }

    return collections;
  },
  ["latestCollections"],
  {
    tags: ["latestCollections", "homePageCollections"],
  }
);

const fetchCachedBestSellerCollections = unstable_cache(
  async () => {
    const collections = await Product.find({})
      .sort({ ordersNumber: -1 })
      .limit(5)
      .exec();
    if (!collections || collections.length < 4) {
      return null;
    }
    return collections;
  },
  ["bestSellers"],
  {
    tags: ["bestSellers", "homePageCollections"],
  }
);

export default async function Home() {
  await dbConnect();
  const latestCollections: ProductsInterface[] | null =
    await fetchCachedLatestCollections();
  const bestSellersCollections: ProductsInterface[] | null =
    await fetchCachedBestSellerCollections();

  let carouselCollection = null;
  if (bestSellersCollections) {
    carouselCollection = bestSellersCollections.map(
      ({ _id, title, images }) => ({
        _id: _id!.toString() as string,
        title,
        images,
      })
    );
  }

  return (
    <div className="w-full h-full flex items-center flex-col gap-14 py-10">
      {/* When one of the fetched variables in unstable_cache returned a null then display the toast error : but to keep in mind as those would be ISR so maybe a revalidatepath that would help better than a refresh */}
      <HomePageCarousel collections={carouselCollection} />
      <LatestCollectionSection collections={latestCollections} />
      <BestSellersSection collections={bestSellersCollections} />

      <div className="flex flex-wrap justify-between items-center w-full">
        <HighlightItem
          title="Easy Exchange Policy"
          desc="We offer hassle free exchange policy"
        >
          <RefreshCcwDot size={35} />
        </HighlightItem>

        <HighlightItem
          title="7 Days Return Policy"
          desc="We provide 7 days free return policy"
        >
          <BadgeCheck size={35} />
        </HighlightItem>

        <HighlightItem
          title="Best customer support"
          desc="we provide 24/7 customer support"
        >
          <Headset size={35} />
        </HighlightItem>
      </div>

      <div
        className="w-full flex flex-col items-center gap-2 text-center py-5"
        id="Subscribe-section-HomePage"
      >
        <h1 className="text-xl font-bold">Subscribe now & get 20% off</h1>
        <p className="text-md text-slate-500">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
        <div className="flex w-full max-w-sm items-center">
          <Input
            type="email"
            placeholder="Enter your email"
            className="rounded-none"
          />
          <Button type="submit" className="rounded-none">
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
}
