"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/buttonHeader";

interface ButtonProps {
  to: string;
  page: string;
}

export default function ButtonPathnamePerson({ to, page }: ButtonProps) {
  // This is a component for personalising the navigation buttons in the Header following the current page
  const pathname = usePathname();
  return (
    <Link href={to}>
      <Button
        className={`${
          pathname === to &&
          "relative w-full after:content-[''] after:absolute after:top-7 after:mx-auto after:w-1/2 after:h-[2px] after:bg-black"
        }`}
      >
        {page}
      </Button>
    </Link>
  );
}
