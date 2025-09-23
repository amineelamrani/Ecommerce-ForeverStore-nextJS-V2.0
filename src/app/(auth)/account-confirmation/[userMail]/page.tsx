import ConfirmingAccountSectionOTP from "@/components/ConfirmingAccountSectionOTP";
import React from "react";

export default async function AccountConfirmation({
  params,
}: {
  params: Promise<{ userMail: string }>;
}) {
  const { userMail } = await params;

  return (
    <div className="flex flex-col items-center my-14">
      <h1 className="text-2xl font-bold">Verify your account</h1>
      <p className="italic text-sm pb-8">
        Check your mailbox and paste the code given in the mail
      </p>
      <ConfirmingAccountSectionOTP mail={userMail} />
    </div>
  );
}
