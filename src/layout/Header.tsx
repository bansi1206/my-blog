"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, Button, Dropdown } from "antd";
import { useRouter } from "next/navigation";

type Props = {};

export const Header: React.FC<Props> = () => {
  const { data: user } = useSession();
  const router = useRouter();
  console.log(user);
  return (
    <div className="mt-[64px]">
      <div className="container flex items-center justify-between max-w-[1100px]">
        <Link href={"/"} className="no-underline">
          <h3 className="text-primary text-2xl font-black">My Blog</h3>
        </Link>
        <div className="flex gap-6">
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
          {user &&
          (user?.user?.role === "Admin" ||
            user?.user?.role === "SuperAdmin") ? (
            <Dropdown
              menu={{
                items: [
                  {
                    key: "1",
                    label: "Add Post",
                    onClick: () => router.push("/admin/manage-post"),
                  },
                  {
                    key: "2",
                    label: "Add Category",
                    onClick: () => router.push("/admin/manage-category"),
                  },
                ],
              }}
            >
              <div className="cursor-pointer flex items-center gap-1">Add</div>
            </Dropdown>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};
