import React from "react";
import dbConnect from "@/lib/database/dbConnect";

export default async function Home() {
  await dbConnect();
  return <div>Home</div>;
}
