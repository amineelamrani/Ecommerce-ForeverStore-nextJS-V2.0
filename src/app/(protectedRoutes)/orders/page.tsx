"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { UserContext } from "@/contexts/userContext";
import {
  InitialOrderingInterface,
  orderServerAction,
} from "@/serverActions/stripeActions";
import { Check } from "lucide-react";
import React, { useActionState, useContext, useRef, useState } from "react";

const initialValue: InitialOrderingInterface = {
  redirectingUrl: null,
  message: "",
  paymentMethod: "card",
  error: {
    error: false,
    message: "",
  },
};

export default function Orders() {
  const submitRef = useRef<HTMLButtonElement | null>(null);

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentStripeSuccess, setPaymentStripeSuccess] = useState(false);
  const [paymentCODSuccess, setPaymentCODSuccess] = useState(false);
  const [state, formAction, isLoading] = useActionState(
    orderServerAction,
    initialValue
  );

  const context = useContext(UserContext);

  if (!context) {
    return <></>;
  }

  const { basketContent, setBasketContent } = context;

  let subTotal = 0,
    total = 0;
  if (basketContent !== null) {
    for (let i = 0; i < basketContent.length; i++) {
      subTotal += basketContent[i].quantity * basketContent[i].price;
    }
  }
  total = subTotal + 10;

  // Algorithm
  // when click on submit -> Call a server action (if succeed it will five a stripe url)
  // when the stripe window is opened and the user made the payment -> the checkout session will direct me to ?success=true&session_id
  // if ?success=true => clear the basket and localStorage and navigate to /cart (purchased)

  // /!\ Either redirect to this?success=true&session_id or use another route just for confirming => That route would do the following : check whether the user has done his payment really or just tricked the url - Then store it in the database in the backend as done

  return (
    <div className="flex flex-col md:flex-row w-full py-8 md:py-15 gap-5 relative">
      {(paymentStripeSuccess || paymentCODSuccess) && (
        <div className="absolute w-full h-full z-50 gap-10 flex flex-col items-center justify-center bg-white/30 backdrop-blur-md">
          <h1 className="text-xl md:text-3xl font-bold text-green-600">
            Payment Done successfully
          </h1>
          <p className="text-xs md:text-base text-center">
            We will redirect you to the cart section to complete your shopping
          </p>
          <Check
            color="#ffffff"
            size={30}
            className="bg-green-600 w-10 h-10 md:w-35 md:h-35 flex items-center justify-center rounded-full"
          />
          <LoadingSpinner className="h-8 w-8 mx-auto" />
        </div>
      )}

      <div className="w-full md:w-1/2">
        <h1 className="mb-4 relative text-xl md:text-2xl font-bold after:content-[''] after:absolute after:top-1/2 after:w-8 md:after:w-14 after:h-[2px] after:bg-black">
          <span className="text-slate-500">DELIVERY</span> INFORMATION
        </h1>

        <form className="w-full flex flex-wrap gap-x-4" action={formAction}>
          <Input
            type="text"
            placeholder="First name"
            name="firstName"
            className="flex-1"
            required
          />
          <Input
            type="text"
            placeholder="Last name"
            className="flex-1"
            name="lastName"
            required
          />
          <Input
            type="email"
            placeholder="Email adress"
            className="w-full my-2"
            name="email"
            required
          />
          <Input
            type="text"
            placeholder="Street"
            className="w-full"
            name="street"
            required
          />
          <Input
            type="text"
            placeholder="City"
            className="flex-1 my-2"
            name="city"
            required
          />
          <Input
            type="text"
            placeholder="State"
            className="flex-1 my-2"
            name="state"
            required
          />
          <div className="w-full h-0"></div>
          <Input
            type="number"
            placeholder="Zipcode"
            className="flex-1"
            name="zipCode"
            min={10}
            required
          />
          <Input
            type="text"
            placeholder="Country"
            className="flex-1"
            name="country"
            required
          />
          <Input
            type="number"
            placeholder="Phone"
            className="w-full my-2"
            name="phone"
            min={10}
            required
          />
          <label className="hidden input input-bordered items-center gap-2 w-full">
            <input
              type="text"
              className="grow"
              name="paymentMethod"
              readOnly
              value={paymentMethod}
              required
            />
          </label>
          <label className="hidden input input-bordered items-center gap-2 w-full">
            <input
              type="text"
              className="grow"
              name="productsToBuy"
              readOnly
              value={JSON.stringify(basketContent)}
              required
            />
          </label>

          <button
            className="text-[10px] mx-auto hidden"
            type="submit"
            ref={submitRef}
          >
            Use a ref for the other button so when you click it means like you
            clicked this one that will be hidden
          </button>
        </form>
      </div>

      <div className="flex flex-col items-start w-full md:w-1/2 text-xs md:text-base">
        <h1 className="mb-4 relative text-xl md:text-2xl font-bold after:content-[''] after:absolute after:top-1/2 after:w-8 md:after:w-14 after:h-[2px] after:bg-black">
          <span className="text-slate-500">CART</span> TOTALS
        </h1>
        <div className="flex flex-row w-full justify-between py-2">
          <h2>Subtotal</h2>
          <p>${subTotal}</p>
        </div>

        <div className="flex flex-row w-full justify-between border-t border-b py-2">
          <h2>Shipping Fee</h2>
          <p>$10</p>
        </div>

        <div className="flex flex-row w-full justify-between py-2 font-bold">
          <h2>Total</h2>
          <p>${total}</p>
        </div>

        <div className="my-5 w-full">
          <h1 className="mb-4 relative text-xl md:text-2xl font-bold after:content-[''] after:absolute after:top-1/2 after:w-8 md:after:w-14 after:h-[2px] after:bg-black">
            <span className="text-slate-500">PAYMENT</span> METHOD
          </h1>
          <ToggleGroup
            type="single"
            className="flex flex-row gap-2 py-2"
            onValueChange={(e) => {
              setPaymentMethod(e);
            }}
          >
            <ToggleGroupItem
              value="card"
              aria-label="Toggle"
              className={` rounded-sm px-5 py-2 hover:cursor-pointer ${
                paymentMethod === "card" ? "bg-slate-200" : "bg-white"
              }`}
            >
              By Card
            </ToggleGroupItem>
            <ToggleGroupItem
              value="cod"
              className={` rounded-sm px-5 py-2 hover:cursor-pointer ${
                paymentMethod === "cod" ? "bg-slate-200" : "bg-white"
              }`}
            >
              Cach on Delivery
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="w-full flex flex-col items-end pt-3">
          <Button
            className="px-8 "
            onClick={() => {
              submitRef.current?.click();
            }}
          >
            PLACE ORDER
          </Button>
        </div>
      </div>
    </div>
  );
}
