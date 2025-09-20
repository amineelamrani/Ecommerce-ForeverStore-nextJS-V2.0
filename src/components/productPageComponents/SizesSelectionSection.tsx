"use client";
import React, { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

export default function SizesSelectionSection({
  sizes,
  setSize,
}: {
  sizes: string[];
  setSize: (size: string) => void;
}) {
  return (
    <div className="flex flex-col">
      <h4>Select Size</h4>
      <ToggleGroup
        type="single"
        className="gap-2 rounded-none"
        onValueChange={(e) => setSize(e)}
      >
        {sizes.map((size, index) => (
          <ToggleGroupItem
            value={size}
            className="bg-slate-200 rounded-sm py-2 hover:cursor-pointer"
            aria-label="Toggle bold"
            key={index}
          >
            {size}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
