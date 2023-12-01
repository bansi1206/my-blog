import { PrivateRouter } from "@/providers";
import { UserRole } from "@prisma/client";

export default async function LayoutManagePost({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrivateRouter roles={[UserRole.SuperAdmin, UserRole.Admin]}>
      {children}
    </PrivateRouter>
  );
}
