"use client";

import { Main } from "@/layout";
import { QueryClient, QueryClientProvider } from "react-query";
import { SessionProvider } from "next-auth/react";

type Props = {
  children: React.ReactNode;
};

const queryclient = new QueryClient();

export const AppProvider: React.FC<Props> = ({ children }) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryclient}>
        <Main>{children}</Main>
      </QueryClientProvider>
    </SessionProvider>
  );
};
