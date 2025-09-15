"use client";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu } from "lucide-react";
import Link from "next/link";

export default function NavMenuHeaderHidden() {
  return (
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
  );
}
