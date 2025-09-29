import Image from "next/image";
import Link from "next/link";

export default function CollectionSearchCard({
  title,
  price,
  image,
  id,
}: {
  title: string;
  price: number;
  image: string;
  id: string;
}) {
  return (
    <div className="w-1/2 md:w-1/3 lg:w-1/4 p-2">
      <div className="flex flex-col">
        <div className="overflow-hidden">
          <Link href={`/product/${id}`}>
            <Image
              src={image}
              alt=""
              width={450}
              height={550}
              className="w-full hover:cursor-pointer hover:scale-110 transition-transform duration-200"
            />
          </Link>
        </div>
        <h1 className="py-2">{title}</h1>
        <h2>${price}</h2>
      </div>
    </div>
  );
}
