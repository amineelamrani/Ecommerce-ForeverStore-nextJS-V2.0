import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Confirm Your Account",
};

export default function ConfirmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
