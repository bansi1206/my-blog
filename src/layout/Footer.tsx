"use client";

import Link from "next/link";

type Props = {};

export const Footer: React.FC<Props> = () => {
  return (
    <div className="bg-gray-200 py-9">
      <div className="container flex flex-col items-center gap-y-7 max-w-[1100px]">
        <div className="flex items-center gap-5">
          <Link
            href={"#!"}
            className="text-[#544B44] text-sm no-underline font-roboto"
          >
            About
          </Link>
          <Link
            href={"#!"}
            className="text-[#544B44] text-sm no-underline font-roboto"
          >
            Privacy Policy
          </Link>
          <Link
            href={"#!"}
            className="text-[#544B44] text-sm no-underline font-roboto"
          >
            Contact
          </Link>
        </div>
        <p className="text-sm text-[#3E3E3E] font-bold">
          Copyright © 2021 My Blog. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};
