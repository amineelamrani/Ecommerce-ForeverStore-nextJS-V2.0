"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import {
  InitialSignUpInterface,
  signUpServerAction,
} from "@/serverActions/authActions";
import Link from "next/link";
import React, { useActionState } from "react";
// This will be a client component that will call a server action using the useActionState hook

const initialSignUpState: InitialSignUpInterface = {
  error: {
    error: false,
    message: "",
  },
  userMail: null,
};

export default function SignUp() {
  const [state, formAction, isLoading] = useActionState(
    signUpServerAction,
    initialSignUpState
  );
  console.log(state);

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
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      name="name"
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
                  <div className="flex flex-col gap-3">
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading ? true : false}
                    >
                      {isLoading ? "Loading..." : "Sign Up"}
                    </Button>
                  </div>
                </div>
                <div className="mt-4 text-center text-sm">
                  Have an account?{" "}
                  <Link href="/login" className="underline">
                    Login
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
