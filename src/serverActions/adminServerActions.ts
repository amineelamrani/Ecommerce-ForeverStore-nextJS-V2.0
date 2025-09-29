"use server";

import dbConnect from "@/lib/database/dbConnect";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "@/models/models";

export const addProductServerAction = async (
  initialState,
  formData: FormData
) => {
  //This will add the product
  // Trigger a revalidateTagf for the home page and /products to recompile
  if (await checkAdmin()) {
    // If admin -> Do your work
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
