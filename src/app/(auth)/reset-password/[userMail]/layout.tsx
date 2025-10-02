import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
};

export default function ResetPassLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
