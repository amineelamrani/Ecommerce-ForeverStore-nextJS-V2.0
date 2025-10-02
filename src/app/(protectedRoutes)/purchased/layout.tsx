import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MY PURCHASES",
};

export default function PurchasesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
