"use client";
import React, { useRef } from "react";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { GalleryHorizontal } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";

interface collectionInterface {
  title: string;
  _id: string;
  images: string[];
}

interface BetterCarouselProps {
  collections: collectionInterface[] | null;
}

export default function HomePageCarousel({ collections }: BetterCarouselProps) {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <>
      {collections && (
        <Carousel
          plugins={[plugin.current]}
          className="w-full  relative border"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="h-full w-full">
            {collections.map((product, index) => (
              <CarouselItem
                key={index}
                className="h-full flex flex-col md:flex-row w-full items-center justify-between"
              >
                <div className="w-full md:w-3/5  md:h-full flex flex-col items-center justify-center text-center py-3 px-2 md:py-1 md:px-1">
                  <h1 className="italic font-bold text-center">
                    OUR BESTSELLERS
                  </h1>
                  <h1 className="text-2xl text-wrap font-bold py-5 text-center">
                    {product.title}
                  </h1>
                  <h1 className="text-sm italic font-serif">
                    Swip Left or right
                  </h1>
                  <GalleryHorizontal />
                </div>
                <div className="h-full w-full md:w-2/5 flex justify-center md:justify-end overflow-hidden">
                  <Link href={`/product/${product._id}`}>
                    <Image
                      src={product.images[0]}
                      alt={product.images[0]}
                      width={1050}
                      height={1050}
                      className="h-full md:max-h-125 w-full md:w-fit hover:cursor-pointer hover:scale-110  overflow-hidden transition delay-150 duration-300 ease-in-out"
                    />
                  </Link>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}
    </>
  );
}
