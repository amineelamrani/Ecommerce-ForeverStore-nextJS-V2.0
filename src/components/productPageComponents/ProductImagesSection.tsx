"use client";
import Image from "next/image";
import React, { useState } from "react";

export default function ProductImagesSection({ images }: { images: string[] }) {
  const [highlightedImage, setHighlightedImage] = useState(images[0]);

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const url = new URL(e.currentTarget.currentSrc);
    const encoded = url.searchParams.get("url");

    setHighlightedImage(encoded ? encoded : images[0]);
  };

  return (
    <div className="w-full md:w-1/2 flex flex-col md:flex-row items-start justify-center gap-2 relative overflow-hidden">
      <div className="hidden md:flex flex-col gap-1 max-w-15 ">
        {images.map((image) => (
          <Image
            src={image}
            alt="Product- Image"
            key={image}
            className=" hover:cursor-pointer"
            width={1050}
            height={1050}
            onClick={handleImageClick}
          />
        ))}
      </div>
      <div className="w-full h-full relative">
        <Image
          src={highlightedImage}
          className="w-full h-full"
          alt="highlighted-image-selected-section"
          width={1050}
          height={1050}
        />
      </div>

      <div className="flex md:hidden flex-row gap-1 max-w-15">
        {images.map((image) => (
          <Image
            src={image}
            alt="Product- Image"
            key={image}
            className=" hover:cursor-pointer"
            width={1050}
            height={1050}
            onClick={handleImageClick}
          />
        ))}
      </div>
    </div>
  );
}
