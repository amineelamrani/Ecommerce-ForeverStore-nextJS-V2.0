import Image from "next/image";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ABOUT",
};

export default function AboutPage() {
  return (
    <div className="py-15 flex flex-col gap-7">
      <h1 className="mb-4 text-center relative text-xl md:text-2xl font-bold after:content-[''] after:absolute after:top-1/2 after:w-8 md:after:w-14 after:h-[2px] after:bg-black">
        <span className="text-slate-500">ABOUT</span> US
      </h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <Image
            src={"/about_img-BAJyTXw9.png"}
            alt=""
            className="w-full"
            width={450}
            height={550}
          />
        </div>
        <div className="w-full md:w-1/2 flex gap-7 flex-col">
          <p className="text-sm md:text-base ">
            Forever was born out of a passion for innovation and a desire to
            revolutionize the way people shop online. Our journey began with a
            simple idea: to provide a platform where customers can easily
            discover, explore, and purchase a wide range of products from the
            comfort of their homes.
          </p>
          <p className="text-sm md:text-base ">
            Since our inception, we&apos;ve worked tirelessly to curate a
            diverse selection of high-quality products that cater to every taste
            and preference. From fashion and beauty to electronics and home
            essentials, we offer an extensive collection sourced from trusted
            brands and suppliers.
          </p>
          <h2 className="text-base md:text-xl font-bold">Our Mission</h2>
          <p className="text-sm md:text-base ">
            Our mission at Forever is to empower customers with choice,
            convenience, and confidence. We&apos;re dedicated to providing a
            seamless shopping experience that exceeds expectations, from
            browsing and ordering to delivery and beyond.
          </p>
        </div>
      </div>
    </div>
  );
}
