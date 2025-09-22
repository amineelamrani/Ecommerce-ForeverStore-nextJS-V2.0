"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Toaster } from "@/components/ui/sonner";
import { UserContext } from "@/contexts/userContext";
import {
  InitialSignInInterface,
  signInServerAction,
} from "@/serverActions/authActions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useActionState, useContext } from "react";

const initialSignInState: InitialSignInInterface = {
  error: {
    error: false,
    message: "",
  },
  currentUser: null,
};

export default function Login() {
  const [state, formAction, isLoading] = useActionState(
    signInServerAction,
    initialSignInState
  );
  const router = useRouter();
  const context = useContext(UserContext);
  if (!context) {
    console.log("there is an error while uploading context");
    return <></>;
  }
  const { setCurrentUser } = context;

  if (!state.error.error && !isLoading && state.currentUser !== null) {
    console.log("Logged In successfully");
    setCurrentUser({
      name: state.currentUser.name,
      email: state.currentUser.email,
      orders: JSON.parse(state.currentUser.orders),
      favourites: JSON.parse(state.currentUser.favourites),
      admin: state.currentUser.admin,
    });

    setTimeout(() => {
      router.push("/");
    }, 100); // 100ms delay, adjust as needed
  }

  return (
    <div className="flex my-10 w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Toaster
            position="top-right"
            expand={true}
            richColors
            visibleToasts={1}
          />
          <Card>
            <h1 className="relative font-serif italic text-2xl after:content-[''] after:absolute after:top-1/2 after:w-14 after:h-[2px] after:bg-black mx-auto">
              Sign Up
            </h1>
            <CardContent>
              <form action={formAction}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="name">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      name="email"
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <p className="ml-auto inline-block text-xs md:text-sm underline-offset-4 hover:underline">
                        <Link href="/forgot-password">
                          Forgot your password?
                        </Link>
                      </p>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      name="password"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    {!isLoading && (
                      <Button type="submit" className="w-full">
                        Login
                      </Button>
                    )}
                    {isLoading && <LoadingSpinner className="mx-auto" />}
                  </div>
                </div>
                <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link href="/sign-up" className="underline">
                    Sign Up
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
