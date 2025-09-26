"use client";
import { Button } from "@/components/ui/button";
import { revalidateTagTest } from "@/serverActions/actions";
import React from "react";

export default function Test() {
  //   await revalidateTagTest();

  const handleClick = async () => {
    await revalidateTagTest();
  };

  return (
    <div>
      <h1>Test</h1>
      <Button onClick={handleClick}>Revalidate Products</Button>
    </div>
  );
}
