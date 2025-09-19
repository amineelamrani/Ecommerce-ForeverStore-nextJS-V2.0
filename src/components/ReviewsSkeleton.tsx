import { Skeleton } from "./ui/skeleton";
import { LoaderCircle } from "lucide-react";

export function ReviewsSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="flex items-center gap-2 text-gray-600">
        Loading Reviews <LoaderCircle className="animate-spin" size={15} />
      </h1>

      <div className="flex items-center space-x-4 ">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className="flex items-center space-x-4 ">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className="flex items-center space-x-4 ">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </div>
  );
}
