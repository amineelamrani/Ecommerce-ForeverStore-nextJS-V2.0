import { addProductServerAction } from "@/serverActions/adminServerActions";
import React, { useActionState, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Toaster } from "../ui/sonner";
import { toast } from "sonner";

const initialStateInputData: inputDataInterface = {
  title: "",
  description: "",
  price: 0,
  sizes: ["S", "M", "L", "XL", "XXL"],
  images: [""],
  category: [""],
  subCategory: [""],
};

export interface inputDataInterface {
  title: string;
  description: string;
  price: number;
  sizes: string[];
  images: string[];
  category: string[];
  subCategory: string[];
}

export default function AddingProduct() {
  const [text, setText] = useState<string>("");
  const [inputData, setInputData] = useState<inputDataInterface>({
    ...initialStateInputData,
  });
  const [loading, setLoading] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      if (!text || text.length < 2) {
        return;
      }
      e.preventDefault();

      const newValue = text + "\n";
      setInputData({ ...inputData, ["images"]: text.split("\n") });
      setText(newValue); // insert newline after adding to array
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLoading(false);
    setText(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const callServer = await addProductServerAction(inputData);
    if (callServer) {
      setInputData({ ...initialStateInputData });
      setText("");
      setLoading(false);
      toast.success("Product added to the store...", {
        duration: 1500,
      });
    } else {
      toast.error(
        "An error happened while trying to store the new product...",
        {
          duration: 1000,
        }
      );
    }
  };

  return (
    <div className="py-5 px-10">
      <Toaster
        position="top-right"
        expand={true}
        richColors
        visibleToasts={1}
      />
      <h1 className="text-lg text-blue-950 font-bold my-5">
        Add a Product to the store
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 w-full max-w-115"
      >
        <div className="flex flex-col w-full gap-2">
          <Label htmlFor="title">Product Title</Label>
          <Input
            type="title"
            id="title"
            placeholder="Enter the title"
            value={inputData.title}
            onChange={(e) => {
              setInputData({ ...inputData, ["title"]: e.target.value });
            }}
            required
          />
        </div>
        <div className="flex flex-col w-full gap-2">
          <Label htmlFor="description">Product Description</Label>
          <Textarea
            placeholder="Enter the description"
            id="description"
            name="description"
            value={inputData.description}
            onChange={(e) =>
              setInputData({ ...inputData, ["description"]: e.target.value })
            }
            required
          />
        </div>

        <div className="w-full flex">
          <div className="w-1/3  flex flex-col items-center">
            <Label>Product Category</Label>
            <Select
              required
              onValueChange={(e) =>
                setInputData({ ...inputData, ["category"]: [e] })
              }
            >
              <SelectTrigger className="max-w-24 mx-5">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  <SelectItem value="Men">Men</SelectItem>
                  <SelectItem value="Women">Women</SelectItem>
                  <SelectItem value="Kids">Kids</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="w-1/3 flex flex-col items-center">
            <Label>Sub Category</Label>
            <Select
              required
              onValueChange={(e) =>
                setInputData({ ...inputData, ["subCategory"]: [e] })
              }
            >
              <SelectTrigger className="max-w-35 mx-5">
                <SelectValue placeholder="Select SubCategory" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>SubCategories</SelectLabel>
                  <SelectItem value="Topwear">Topwear</SelectItem>
                  <SelectItem value="Bottomwear">Bottomwear</SelectItem>
                  <SelectItem value="Winterwear">Winterwear</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="w-1/3  flex flex-col items-center">
            <Label htmlFor="price">Product Price</Label>
            <Input
              type="number"
              className="w-20"
              id="price"
              placeholder="Enter the price"
              value={inputData.price}
              onChange={(e) =>
                setInputData({
                  ...inputData,
                  ["price"]: Number(e.target.value),
                })
              }
              required
            />
          </div>
        </div>

        <div>
          <h1>Product images</h1>
          <div>
            <Textarea
              value={text}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Type the url of the images and press Enter"
              className="w-full"
              required
            />
            <ul className="flex gap-2 flex-wrap w-full ">
              {inputData.images[0].length > 0 &&
                inputData.images.map((item, index) => (
                  <img
                    src={item}
                    key={`Image-display-admin-preview-${index}`}
                    className="h-15"
                    alt=""
                  />
                ))}
            </ul>
          </div>
        </div>
        <Button type="submit" disabled={loading ? true : false}>
          Oh riah
        </Button>
      </form>
    </div>
  );
}
