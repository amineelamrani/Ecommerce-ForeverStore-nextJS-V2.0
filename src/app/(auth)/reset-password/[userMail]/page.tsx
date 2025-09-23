"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserContext } from "@/contexts/userContext";
import {
  handleResetPasswordForm,
  InitialSignInInterface,
} from "@/serverActions/authActions";
import { useParams, useRouter } from "next/navigation";
import React, { useActionState, useContext } from "react";

const initialValue: InitialSignInInterface = {
  error: {
    error: false,
    message: "",
  },
  currentUser: null,
};

export default function ResetPasswordPage() {
  const { userMail } = useParams<{ userMail: string }>();
  const [state, formAction, isLoading] = useActionState(
    handleResetPasswordForm,
    initialValue
  );
  const context = useContext(UserContext);
  const router = useRouter();
  if (!context) {
    console.log("there is an error while uploading context");
    return <></>;
  }
  const { setCurrentUser } = context;

  if (!state.error.error && !isLoading && state.currentUser !== null) {
    console.log("Password reseted successfully...");
    setCurrentUser({
      name: state.currentUser.name,
      email: state.currentUser.email,
      orders: JSON.parse(state.currentUser.orders),
      favourites: JSON.parse(state.currentUser.favourites),
      admin: state.currentUser.admin,
    });
    setTimeout(() => {
      router.push("/orders");
    }, 100); // 100ms delay, adjust as needed
  }

  return (
    <div className="flex flex-col items-center my-14">
      <form action={formAction}>
        <div className="flex flex-col gap-6">
          <div className="grid gap-3">
            <Label htmlFor="resetToken">Reset Token</Label>
            <Input
              id="resetToken"
              type="name"
              placeholder="Reset Token"
              name="token"
              required
            />
          </div>

          <div className="grid gap-3">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input id="password" type="password" name="password" required />
          </div>

          <div className="grid gap-3">
            <div className="flex items-center">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
            </div>
            <Input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              required
            />
          </div>
          <label className="hidden input input-bordered items-center gap-2 w-full">
            <input
              type="text"
              className="grow"
              name="email"
              readOnly
              value={decodeURIComponent(userMail)}
              required
            />
          </label>

          <div className="flex flex-col gap-3">
            <Button type="submit" className="w-full hover:cursor-pointer">
              Reset password
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
