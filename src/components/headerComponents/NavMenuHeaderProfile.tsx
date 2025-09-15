"use client";
import React from "react";
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
import { UserRound } from "lucide-react";
import Link from "next/link";

export default function NavMenuHeaderProfile() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <UserRound className="h-6 w-6" />
          </NavigationMenuTrigger>

          <NavigationMenuContent>
            <NavigationMenuLink asChild>
              <Link href="/purchased">Purchases</Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link href="/">Logout</Link>
            </NavigationMenuLink>

            <NavigationMenuLink asChild>
              <Link href="/login">Login</Link>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
