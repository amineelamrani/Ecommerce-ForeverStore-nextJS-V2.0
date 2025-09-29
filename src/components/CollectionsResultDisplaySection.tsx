import React, { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "./ui/select";

export default function CollectionsResultDisplaySection({
  sorting,
  setSorting,
}: {
  sorting: string;
  setSorting: (sorting: string) => void;
}) {
  return (
    <div className="w-full md:3/4 pl-5">
      <div className="py-5 flex flex-col sm:flex-row justify-between items-end sm:items-center px-3">
        <h1 className="font-bold text-xl relative self-start after:content-[''] after:absolute after:-right-11 after:top-1/2 after:w-10 after:h-[2px] after:bg-black">
          <span className="text-slate-500">ALL</span> COLLECTIONS
        </h1>
        <Select onValueChange={(e) => setSorting(e)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort By: Relevant" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort By :</SelectLabel>
              <SelectItem value="relevant">Sort By: Relevant</SelectItem>
              <SelectItem value="lowest">Sort By: Low to High</SelectItem>
              <SelectItem value="highest">Sort By: High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
