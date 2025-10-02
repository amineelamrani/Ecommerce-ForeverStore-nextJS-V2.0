import React, { useState } from "react";
import { revalidateTagTest } from "@/serverActions/actions";

export default function RevalidateRoutes() {
  const [done, setDone] = useState(false);
  const handleClick = async () => {
    setDone(false);
    try {
      await revalidateTagTest();
      setDone(true);
    } catch (err) {
      setDone(false);
    }
  };

  return (
    <div className="p-6 flex flex-col gap-5">
      <h1>Revalidate Cached Queries</h1>
      <div
        onClick={handleClick}
        className=" w-fit rounded-md outline-2 outline-black py-2 px-3 shadow-[8px_8px] cursor-pointer transition-all duration-100 ease-out active:shadow-none active:translate-x-[8px] active:translate-y-[8px]"
      >
        <p className="text-sm text-gray-600 select-none">
          {done ? "Revalidated" : "Revalidate Products"}
        </p>
      </div>
    </div>
  );
}
