import React from "react";
import { Skeleton } from "./ui/skeleton";

export default function ProductLoadingSkeleton() {
  return (
    <div className="flex flex-col space-y-3 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 p-2">
      <Skeleton className="h-[125px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-3/5" />
      </div>
    </div>
  );
}
