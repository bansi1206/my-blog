"use client";

import { Footer, Header } from ".";

type Props = {
  children?: React.ReactNode;
};

export const Main: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="min-h-[calc(100vh-96px-140px)]">{children}</div>
      <Footer />
    </div>
  );
};
