import React, { useState } from "react";
import { Button } from "../ui/button";
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
    <div className="p-6">
      <h1>Revalidate Cached Queries</h1>
      <Button onClick={handleClick}>
        {done ? "Revalidated" : "Revalidate Products"}
      </Button>
    </div>
  );
}
