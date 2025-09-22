"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { Button } from "../ui/buttonHeader";
import { UserContext } from "@/contexts/userContext";

export default function AdminPanelHeaderSection() {
  const context = useContext(UserContext);
  if (!context) {
    console.log("there is an error while uploading context");
    return <></>;
  }
  const { currentUser } = context;

  return (
    <>
      {currentUser && currentUser.admin && (
        <Link href="/admin">
          <Button variant="outline" className="px-5 rounded-full">
            AdminPanel
          </Button>
        </Link>
      )}
    </>
  );
}
