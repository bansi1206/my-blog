"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, Button, Dropdown } from "antd";

type Props = {};

export const Header: React.FC<Props> = () => {
  const { data: user } = useSession();
  return (
    <div className="mt-[64px]">
      <div className="container flex items-center justify-between">
        <Link href={"/"} className="no-underline">
          <h3 className="text-primary text-2xl font-black">My Blog</h3>
        </Link>
        <div className="flex items-center gap-5">
          <Link
            href={"#!"}
            className="text-[#605C59] text-lg no-underline font-roboto"
          >
            Blog
          </Link>
          <Link
            href={"#!"}
            className="text-[#605C59] text-lg no-underline font-roboto"
          >
            About
          </Link>
          <Link
            href={"#!"}
            className="text-[#605C59] text-lg no-underline font-roboto"
          >
            Contact
          </Link>
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
            <Button
              type="primary"
              className="bg-[#000638] rounded-[5px]"
              onClick={() => signIn("google", { callbackUrl: "/" })}
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
