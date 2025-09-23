"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserContext } from "@/contexts/userContext";
import {
  handleForgotPasswordForm,
  InitialForgotPassInterface,
} from "@/serverActions/authActions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useActionState, useContext } from "react";

const initialValue: InitialForgotPassInterface = {
  error: {
    error: false,
    message: "",
  },
  handled: false,
  email: "",
};

export default function ForgotPasswordPage() {
  const [state, formAction, loading] = useActionState(
    handleForgotPasswordForm,
    initialValue
  );
  const context = useContext(UserContext);
  const router = useRouter();
  if (!context) {
    console.log("there is an error while uploading context");
    return <></>;
  }
  const { setCurrentUser } = context;

  if (
    !state.error.error &&
    !loading &&
    state.handled === true &&
    state.email !== ""
  ) {
    console.log("Forgot password received and an email is sent to the user");
    setCurrentUser(null);
    setTimeout(() => {
      router.push(`/reset-password/${state.email}`);
    }, 100); // 100ms delay, adjust as needed
  }

  if (state.error.error) {
    console.log("An error happened : ", state.error.message);
  }

  return (
    <div className="flex flex-col items-center my-14">
      <form action={formAction}>
        <div className="flex flex-col gap-6">
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              name="email"
              required
            />
          </div>

          <div className="flex flex-col gap-3">
            <Button type="submit" className="w-full hover:cursor-pointer">
              Forgot password
            </Button>
          </div>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="underline">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}
