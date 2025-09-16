import React from "react";
import dbConnect from "@/lib/database/dbConnect";
// import { Order } from "@/models/models";

export default async function Home() {
  await dbConnect();

  // const users = await Order.find({}).populate("products").exec();
  // console.log(users);

  return <div>Home</div>;
}
