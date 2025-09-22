"use client";
import React, { useContext } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { UserRound } from "lucide-react";
import Link from "next/link";
import { UserContext } from "@/contexts/userContext";

export default function NavMenuHeaderProfile() {
  const context = useContext(UserContext);
  if (!context) {
    console.log("there is an error while uploading context");
    return <></>;
  }
  const { currentUser } = context;

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
            {currentUser && (
              <NavigationMenuLink asChild>
                <Link href="/">Logout</Link>
              </NavigationMenuLink>
            )}

            {!currentUser && (
              <NavigationMenuLink asChild>
                <Link href="/login">Login</Link>
              </NavigationMenuLink>
            )}
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
