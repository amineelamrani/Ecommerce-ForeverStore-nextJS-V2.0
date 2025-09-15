import React from "react";
import Link from "next/link";
import { Button } from "../ui/buttonHeader";
import { Search } from "lucide-react";
import Image from "next/image";
import NavMenuHeaderProfile from "./NavMenuHeaderProfile";
import NavMenuHeaderHidden from "./NavMenuHeaderHidden";
import ButtonPathnamePerson from "./ButtonPathnamePerson";

export default function Header() {
  return (
    <div className="w-full flex justify-between items-center py-3 border-b-[1px]">
      <h1>
        <Link href="/">FOREVER.</Link>
      </h1>

      <div className="hidden md:flex items-center justify-between gap-5">
        <ButtonPathnamePerson to="/" page="HOME" />
        <ButtonPathnamePerson to="/collection" page="COLLECTION" />
        <ButtonPathnamePerson to="/about" page="ABOUT" />
        <ButtonPathnamePerson to="/contact" page="CONTACT" />

        <Link href="/admin">
          <Button variant="outline" className="px-5 rounded-full">
            AdminPanel
          </Button>
        </Link>
      </div>

      <div className="flex items-center">
        <Link href="/collection?search=">
          <Search className="h-6 w-6" />
        </Link>

        <NavMenuHeaderProfile />

        <Link href="/cart">
          <div className="relative flex items-center justify-center">
            <p className="absolute flex items-center justify-center rounded-full bg-black text-white text-center text-[6px] w-3 h-3 bottom-0 right-0">
              0
            </p>
            <Image
              src="/cart-icon.svg"
              alt="Icon"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </div>
        </Link>

        <NavMenuHeaderHidden />
      </div>
    </div>
  );
}
