import { ProductsInterface } from "@/models/product";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Pencil, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  deleteProductServerAction,
  getAllProductAdmin,
  updateProductServerAction,
} from "@/serverActions/adminServerActions";

export default function ViewingProducts() {
  const [inputData, setInputData] = useState({
    title: "",
    price: 0,
  });
  const [fetchedProducts, setFetchedProducts] = useState<
    ProductsInterface[] | null
  >(null);
  const [updateFlag, setUpdateFlag] = useState(false);

  useEffect(() => {
    // Here fetch all products from the server and set them in setFetchedProducts
    const fetchAllProduct = async () => {
      const rawProducts = await getAllProductAdmin();
      const products = JSON.parse(rawProducts);
      if (products) {
        setFetchedProducts(products);
      }
    };
    fetchAllProduct();
  }, [updateFlag]);

  const handleDeleteProduct = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const productID = e.currentTarget.id.split(" ")[1];
    if (productID) {
      const deletingProductQuery = await deleteProductServerAction(productID);
      if (deletingProductQuery) {
        return setUpdateFlag((st) => !st);
      }
    }
  };

  const handleUpdateProduct = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const productID = e.currentTarget.id.split(" ")[1];
    if (productID) {
      const updatingProductQuery = await updateProductServerAction(
        productID,
        inputData.title,
        inputData.price
      );
      if (updatingProductQuery) {
        setUpdateFlag((st) => !st);
      }
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-sm">All product List</h1>
      {fetchedProducts !== null && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fetchedProducts.map((product, index) => (
              <TableRow key={index} id={product._id!.toString()}>
                <TableCell>
                  <img src={product.images[0]} className="w-12" alt="" />
                </TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.category[0]}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell className="text-right flex justify-end py-5">
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Trash className="hover:cursor-pointer hover:scale-125" />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the product and remove the data from the
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          id={`alert ${product._id}`}
                          onClick={handleDeleteProduct}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Pencil
                        onClick={() =>
                          setInputData({
                            title: product.title,
                            price: product.price,
                          })
                        }
                        className="hover:cursor-pointer hover:scale-125"
                      />
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit Product</DialogTitle>
                        <DialogDescription>
                          Make changes to the selected product.
                        </DialogDescription>
                      </DialogHeader>

                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="title" className="text-right">
                            Title
                          </Label>
                          <Input
                            id="title"
                            value={inputData.title}
                            className="col-span-3"
                            onChange={(e) =>
                              setInputData({
                                ...inputData,
                                ["title"]: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="price" className="text-right">
                            Price
                          </Label>
                          <Input
                            id="price"
                            value={inputData.price}
                            className="col-span-3"
                            type="number"
                            onChange={(e) =>
                              setInputData({
                                ...inputData,
                                ["price"]: Number(e.target.value),
                              })
                            }
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          id={`dialog ${product._id}`}
                          type="submit"
                          onClick={handleUpdateProduct}
                        >
                          Save changes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
