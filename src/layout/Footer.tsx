"use client";

import Link from "next/link";

type Props = {};

export const Footer: React.FC<Props> = () => {
  return (
    <div className="bg-gray-200 py-9">
      <div className="container flex flex-col items-center gap-y-7">
        <div className="flex items-center gap-5">
          <Link href={"#!"} className="text-gray-700 no-underline">
            About
          </Link>
          <Link href={"#!"} className="text-gray-700 no-underline">
            Privacy Policy
          </Link>
          <Link href={"#!"} className="text-gray-700 no-underline">
            Contact
          </Link>
        </div>
        <p className="font-bold">
          Copyright © 2021 My Blog. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};
