import React, { useState } from "react";
import { Checkbox } from "./ui/checkbox";

export default function CollectionSideBar() {
  const [categories, setCategories] = useState({
    Men: true,
    Women: true,
    Kids: true,
  });
  const [types, setTypes] = useState({
    Topwear: true,
    Bottomwear: true,
    Winterwear: true,
  });

  const handleCheckboxCatChange = (checked: boolean | string, id: string) => {
    setCategories({ ...categories, [id]: checked });
  };
  const handleCheckboxTypeChange = (checked: boolean | string, id: string) => {
    setTypes({ ...types, [id]: checked });
  };

  return (
    <div className="w-full md:w-1/4 pr-5">
      <h1 className="py-5 font-bold text-xl">FILTERS</h1>
      <div className="w-full border rounded-md p-3 flex flex-col mb-5">
        <h2 className="pb-2 font-bold">CATEGORIES</h2>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="Men"
            checked={categories.Men}
            onCheckedChange={(checked) =>
              handleCheckboxCatChange(checked, "Men")
            }
          />
          <label
            htmlFor="Men"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            MEN
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="Women"
            checked={categories.Women}
            onCheckedChange={(checked) =>
              handleCheckboxCatChange(checked, "Women")
            }
          />
          <label
            htmlFor="Women"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            WOMEN
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="Kids"
            checked={categories.Kids}
            onCheckedChange={(checked) =>
              handleCheckboxCatChange(checked, "Kids")
            }
          />
          <label
            htmlFor="Kids"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            KIDS
          </label>
        </div>
      </div>

      <div className="w-full border rounded-md p-3 flex flex-col">
        <h2 className="pb-2 font-bold">TYPE</h2>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="Topwear"
            checked={types.Topwear}
            onCheckedChange={(checked) =>
              handleCheckboxTypeChange(checked, "Topwear")
            }
          />
          <label
            htmlFor="Topwear"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            TopWear
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="Bottomwear"
            checked={types.Bottomwear}
            onCheckedChange={(checked) =>
              handleCheckboxTypeChange(checked, "Bottomwear")
            }
          />
          <label
            htmlFor="Bottomwear"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            BottomWear
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="Winterwear"
            checked={types.Winterwear}
            onCheckedChange={(checked) =>
              handleCheckboxTypeChange(checked, "Winterwear")
            }
          />
          <label
            htmlFor="Winterwear"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            WinterWear
          </label>
        </div>
      </div>
    </div>
  );
}
