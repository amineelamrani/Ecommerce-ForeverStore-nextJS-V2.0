import React, { useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

export default function SearchField() {
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="text"
        placeholder="Search..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.currentTarget.value)}
      />
      <Search
        size={25}
        strokeWidth={2}
        className="hover:cursor-pointer hover:scale-110"
      />
    </div>
  );
}
