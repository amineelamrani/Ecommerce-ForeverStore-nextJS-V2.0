"use client";
import React, { useContext, useEffect, useState } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import LoadingSpinner from "./ui/LoadingSpinner";
import { accountConfirmationServerAction } from "@/serverActions/authActions";
import { UserContext } from "@/contexts/userContext";
import { useRouter } from "next/navigation";
import { Toaster } from "./ui/sonner";
import { toast } from "sonner";

export default function ConfirmingAccountSectionOTP({
  mail,
}: {
  mail: string;
}) {
  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ error: false, message: "" });
  const context = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (error.error) {
      toast.error(`Error : ${error.message}`, {
        duration: 3000,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error.error]);

  if (!context) {
    console.log("there is an error while uploading context");
    return <></>;
  }
  const { setCurrentUser } = context;

  const verifyAccountFetch = async (val: string) => {
    // call the server Action to verify the account using the mail + val(uniqueString)
    // if verified then push to '/' while storing the cookies
    const isVerified = await accountConfirmationServerAction(
      decodeURIComponent(mail),
      val
    );
    if (isVerified !== null) {
      setCurrentUser({
        name: isVerified.name,
        email: isVerified.email,
        orders: JSON.parse(isVerified.orders),
        favourites: JSON.parse(isVerified.favourites),
        admin: isVerified.admin,
      });
      setLoading(false);
      router.push("/orders");
    } else {
      setError({
        error: true,
        message:
          "Cannot validate your account, Give the Unique String sent to you via mail!",
      });
    }
  };

  return (
    <div className="space-y-2">
      <Toaster
        position="top-center"
        expand={true}
        richColors
        visibleToasts={1}
      />
      <div className="text-center text-sm">
        {value === "" ? (
          <>Enter your one-time password.</>
        ) : (
          <>You entered: {value}</>
        )}
      </div>
      <InputOTP
        maxLength={12}
        value={value}
        onChange={(value) => {
          if (value.length < 12) {
            setError({
              error: false,
              message: "",
            });
            setValue(value);
            setLoading(false);
          } else if (value.length === 12) {
            setLoading(true);
            setValue(value);
            verifyAccountFetch(value);
          }
        }}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
          <InputOTPSlot index={6} />
          <InputOTPSlot index={7} />
          <InputOTPSlot index={8} />
          <InputOTPSlot index={9} />
          <InputOTPSlot index={10} />
          <InputOTPSlot index={11} />
        </InputOTPGroup>
      </InputOTP>
      {loading && <LoadingSpinner className="my-5 mx-auto" />}
    </div>
  );
}
