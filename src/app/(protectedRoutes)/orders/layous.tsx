import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MY ORDERS",
};

export default function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
