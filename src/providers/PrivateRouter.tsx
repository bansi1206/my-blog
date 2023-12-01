"use client";

import { UserRole } from "@prisma/client";
import { Result, Spin } from "antd";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

type Props = {
  children: React.ReactNode;
  roles?: UserRole[];
};

export const PrivateRouter: React.FC<Props> = ({ children, roles }) => {
  const { data: user, status } = useSession();

  const noPermission = useMemo(
    () =>
      status === "authenticated" &&
      !roles?.includes(user?.user?.role as UserRole),
    [roles, status, user?.user?.role]
  );

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Spin />
      </div>
    );
  }

  if (noPermission) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Result
          status="403"
          title="403"
          subTitle="Sorry, you are not authorized to access this page."
        />
      </div>
    );
  }

  return <>{children}</>;
};
