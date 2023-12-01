"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, Dropdown } from "antd";

type Props = {};

export const Header: React.FC<Props> = () => {
  const { data: user } = useSession();
  return (
    <div className="mt-[64px]">
      <div className="container flex items-center justify-between">
        <Link href={"/"} className="no-underline">
          <h3 className="text-primary text-lg font-black">My Blog</h3>
        </Link>
        <div>
          {user ? (
            <Dropdown
              menu={{
                items: [
                  {
                    key: "1",
                    label: "Sign out",
                    onClick: () =>
                      signOut({
                        callbackUrl: "/",
                      }),
                  },
                ],
              }}
            >
              <div className="cursor-pointer flex items-center gap-1">
                <Avatar src={user?.user?.image} />
                {user?.user?.name}
              </div>
            </Dropdown>
          ) : (
            <div
              className="cursor-pointer"
              onClick={() => signIn("google", { callbackUrl: "/" })}
            >
              Login
            </div>
          )}
        </div>
        <div className="flex items-center gap-5">
          <Link href={"#!"} className="text-gray-700 no-underline">
            Blog
          </Link>
          <Link href={"#!"} className="text-gray-700 no-underline">
            About
          </Link>
          <Link href={"#!"} className="text-gray-700 no-underline">
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
};
