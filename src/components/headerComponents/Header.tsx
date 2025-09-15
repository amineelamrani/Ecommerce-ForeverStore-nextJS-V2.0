import React from "react";
import Link from "next/link";
import { Button } from "../ui/buttonHeader";
import { Search, Menu } from "lucide-react";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import NavMenuHeaderProfile from "./NavMenuHeaderProfile";

export default function Header() {
  return (
    <div className="w-full flex justify-between items-center py-3 border-b-[1px]">
      <h1>
        <Link href="/">FOREVER.</Link>
      </h1>

      <div className="hidden md:flex items-center justify-between gap-5">
        <Link href="/">
          <Button className="relative w-full after:content-[''] after:absolute after:top-7 after:mx-auto after:w-1/2 after:h-[2px] after:bg-black">
            HOME
          </Button>
        </Link>
        <Link href="/collection">
          <Button className="relative w-full after:content-[''] after:absolute after:top-7 after:mx-auto after:w-1/2 after:h-[2px] after:bg-black">
            COLLECTION
          </Button>
        </Link>
        <Link href="/about">
          <Button className="relative w-full after:content-[''] after:absolute after:top-7 after:mx-auto after:w-1/2 after:h-[2px] after:bg-black">
            ABOUT
          </Button>
        </Link>
        <Link href="/contact">
          <Button className="relative w-full after:content-[''] after:absolute after:top-7 after:mx-auto after:w-1/2 after:h-[2px] after:bg-black">
            CONTACT
          </Button>
        </Link>
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

        <NavigationMenu className="flex md:hidden" orientation="vertical">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Menu className="h-6 w-6 hover:scale-110" />
              </NavigationMenuTrigger>

              <NavigationMenuContent>
                <NavigationMenuLink asChild>
                  <Link href="/">HOME</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/collection">COLLECTION</Link>
                </NavigationMenuLink>

                <NavigationMenuLink asChild>
                  <Link href="/about">ABOUT</Link>
                </NavigationMenuLink>

                <NavigationMenuLink asChild>
                  <Link href="/contact">CONTACT</Link>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
