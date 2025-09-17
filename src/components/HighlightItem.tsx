import React from "react";
interface HighlightItemProps {
  title: string;
  desc: string;
  children: React.ReactNode;
}

export default function HighlightItem({
  title,
  desc,
  children,
}: HighlightItemProps) {
  return (
    <div className="w-full lg:w-1/3 py-5">
      <div className="flex px-5 flex-col items-center justify-center text-center">
        {children}
        {/* <Icon size={35} /> */}
        <h1 className="font-bold pt-3">{title}</h1>
        <p className="text-sm text-slate-500">{desc}</p>
      </div>
    </div>
  );
}
