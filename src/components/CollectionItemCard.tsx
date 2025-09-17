import Image from "next/image";
import Link from "next/link";
import React from "react";

interface componentProps {
  title: string;
  price: number;
  image: string;
  id: string;
}

export default function CollectionItemCard({
  title,
  price,
  image,
  id,
}: componentProps) {
  return (
    <div className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 p-2">
      <div className="flex flex-col">
        <div className="overflow-hidden">
          <Link href={`/product/${id}`}>
            <Image
              src={image}
              alt={image}
              width={450}
              height={450}
              className="w-full hover:cursor-pointer hover:scale-110 transition-transform duration-200 ease-in-out"
            />
          </Link>
        </div>
        <h1 className="py-2">{title}</h1>
        <h2>${price}</h2>
      </div>
    </div>
  );
}
