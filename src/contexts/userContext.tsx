"use client";

import React, { createContext, useState } from "react";
import mongoose from "mongoose";
import { FavouriteInterface } from "@/models/user";

interface currentUserInterface {
  name: string;
  email: string;
  orders: mongoose.Schema.Types.ObjectId[];
  favourites: FavouriteInterface[];
  admin: boolean;
}

type UserContextProviderType = {
  currentUser: currentUserInterface | null;
  setCurrentUser: (currentUser: currentUserInterface | null) => void;
};

export const UserContext = createContext<UserContextProviderType | null>(null);
// This context will be for the global states needed (like currentUser and others)

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentUser, setCurrentUser] = useState<currentUserInterface | null>(
    null
  );

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
}

// How to use it
// const context = useContext(UserContext);
// if (!context) {
//   throw new Error("HomePage must be wrapped in <AppProvider>");
// }
// const { currentUser } = context;
