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
import { signOut } from "@/serverActions/authActions";

export default function NavMenuHeaderProfile() {
  const context = useContext(UserContext);
  if (!context) {
    console.log("there is an error while uploading context");
    return <></>;
  }
  const { currentUser, setCurrentUser, setBasketContent } = context;

  const handleLogoutClick = async () => {
    try {
      await signOut();
      setCurrentUser(null);
      localStorage.removeItem("eCommerceForeverNextJS");
      setBasketContent(null);
    } catch (err) {
      return;
    }
  };

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
              <NavigationMenuLink onClick={handleLogoutClick}>
                Logout
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
