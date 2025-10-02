import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MY CART",
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
