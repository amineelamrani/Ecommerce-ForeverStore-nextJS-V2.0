"use client";

import { getAuthenticatedUser } from "@/serverActions/authActions";
import React, { createContext, useEffect, useState } from "react";

interface currentUserInterface {
  name: string;
  email: string;
  orders: string[];
  favourites: string[];
  admin: boolean;
}

type UserContextProviderType = {
  currentUser: currentUserInterface | null;
  setCurrentUser: (currentUser: currentUserInterface | null) => void;
  addProductToBasket: (productInfos: {
    id: string;
    title: string;
    size: string;
    image: string;
    price: number;
  }) => void;
  basketContent: BasketContentType[] | null;
  setBasketContent: (basketContent: BasketContentType[] | null) => void;
  getCurrentUserServer: () => void;
};

export interface BasketContentType {
  id: string;
  title: string;
  size: string;
  image: string;
  price: number;
  quantity: number;
}

export const UserContext = createContext<UserContextProviderType | undefined>(
  undefined
);

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentUser, setCurrentUser] = useState<currentUserInterface | null>(
    null
  ); //State that holds infos about the currentUser

  const [basketContent, setBasketContent] = useState<
    BasketContentType[] | null
  >(null); //Here I would store the content of the localstorage in order to have the basket in one place and centralised and whenever we click on add to cart (I would trigger a function that will store the product data in this global state and also in the local storage)

  useEffect(() => {
    // This would be useful to check the content of the localstorage if anything is available then we store it in the basketContent
    if (localStorage.eCommerceForeverNextJS) {
      setBasketContent(JSON.parse(localStorage.eCommerceForeverNextJS));
    }
  }, []);

  const getCurrentUserServer = async () => {
    const res = await getAuthenticatedUser();
    if (res) {
      setCurrentUser({
        name: res.name,
        email: res.email,
        orders: JSON.parse(res.orders),
        favourites: JSON.parse(res.favourites),
        admin: res.admin,
      });
    } else {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    // This would be useful to fill the currentUser
    // This would be called the first time this website is open and will call the server to check for the currentUser infos from the server and will be called juste one time to not store it in localStorage

    getCurrentUserServer();
  }, []);

  const addProductToBasket = (productInfos: {
    id: string;
    title: string;
    size: string;
    image: string;
    price: number;
  }) => {
    // This function I am assuming that everything is OK and given - So need to check the availability of all items before calling this function
    const storedItems = localStorage.eCommerceForeverNextJS;
    // if nothing in localStorage & basketContent => store the infos in localStorage and also set them in setBasket
    // If already some in localStorage & basketContent => if same content add the product to localstorage and setBasket - IF not give priority to localStorage content
    if (!storedItems) {
      localStorage.eCommerceForeverNextJS = JSON.stringify([
        {
          ...productInfos,
          quantity: 1,
        },
      ]);
      setBasketContent([{ ...productInfos, quantity: 1 }]);
    } else {
      const storedProductsArray = JSON.parse(storedItems);
      for (let i = 0; i < storedProductsArray.length; i++) {
        // To check if that product is already in the basket then add in quantity if not add a new element in the array
        if (
          storedProductsArray[i].title === productInfos.title &&
          storedProductsArray[i].size === productInfos.size &&
          storedProductsArray[i].id === productInfos.id
        ) {
          let quant = storedProductsArray[i].quantity;
          quant++;
          storedProductsArray[i] = {
            ...productInfos,
            quantity: quant,
          };
          localStorage.eCommerceForeverNextJS =
            JSON.stringify(storedProductsArray);
          setBasketContent(storedProductsArray);
          return;
        }
      }

      storedProductsArray.push({
        ...productInfos,
        quantity: 1,
      });
      localStorage.eCommerceForeverNextJS = JSON.stringify(storedProductsArray);
      setBasketContent(storedProductsArray);
    }
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        addProductToBasket,
        basketContent,
        setBasketContent,
        getCurrentUserServer,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
