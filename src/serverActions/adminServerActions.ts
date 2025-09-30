"use server";

import dbConnect from "@/lib/database/dbConnect";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Order, Product, User } from "@/models/models";
import { inputDataInterface } from "@/components/adminComponents/AddingProduct";
import { revalidateTag } from "next/cache";

export const addProductServerAction = async (data: inputDataInterface) => {
  //This will add the product
  // Trigger a revalidateTagf for the home page and /products to recompile
  if (await checkAdmin()) {
    // If admin -> Do your work
    if (
      !data.title ||
      !data.description ||
      !data.price ||
      !data.sizes ||
      !data.images ||
      !data.category ||
      !data.subCategory
    ) {
      return false;
    }
    const newProduct = await Product.create({
      title: data.title,
      description: data.description,
      price: data.price,
      sizes: data.sizes,
      images: data.images,
      category: data.category,
      subCategory: data.subCategory,
    });
    if (!newProduct) return false;
    revalidateTag("productData");
    revalidateTag("homePageCollections");
    return true;
  }
  return false;
};

export const deleteProductServerAction = async (productID: string) => {
  if (await checkAdmin()) {
    if (productID != "") {
      const deletedProduct = await Product.findByIdAndDelete(productID);
      if (!deletedProduct) return false;
      return true;
    }
    return false;
  }
  return false;
};

export const updateProductServerAction = async (
  productID: string,
  title: string,
  price: number
) => {
  if (await checkAdmin()) {
    const updates: { title?: string; price?: number } = {};
    if (title !== undefined) updates.title = title;
    if (price !== undefined) updates.price = price;

    const updatedProduct = await Product.findByIdAndUpdate(
      productID,
      { $set: updates },
      { new: true }
    );

    if (!updatedProduct) return false;
    return true;
  }
  return false;
};

export const getAllProductAdmin = async () => {
  if (await checkAdmin()) {
    const products = await Product.find();
    if (products) {
      return JSON.stringify(products);
    }
    return JSON.stringify(null);
  }
  return JSON.stringify(null);
};

export const updateOrderStatus = async (
  orderID: string,
  statusDelivery: string
) => {
  if (await checkAdmin()) {
    const updatedOrder = await Order.findById(orderID);
    if (!updatedOrder) {
      return;
    }
    if (
      updatedOrder.payment.method === "cod" &&
      updatedOrder.payment.status === "pending" &&
      updatedOrder.statusDelivery === "Shipping" &&
      statusDelivery === "Delivered"
    ) {
      updatedOrder.payment = { ...updatedOrder.payment, ["status"]: "payed" };
    }
    if (statusDelivery !== undefined) {
      updatedOrder.statusDelivery = statusDelivery;
    }
    await updatedOrder.save();
    return;
  }
};

export const checkAdmin = async () => {
  try {
    await dbConnect();
    const tokenCookies = await cookies();
    const token = tokenCookies.get("foreverEcommNext_2.0")
      ? tokenCookies.get("foreverEcommNext_2.0")?.value
      : null;
    if (!token || token === "loggedout") return null;
    const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY!);
    if (typeof decoded === "string") {
      return null;
    }

    const id = (decoded as JwtPayload).id;
    const checkUser = await User.findById(id);
    if (
      checkUser &&
      checkUser.name &&
      checkUser.name !== "" &&
      checkUser.admin
    ) {
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
};
