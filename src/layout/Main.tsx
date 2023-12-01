"use client";

import { Footer, Header } from ".";

type Props = {
  children?: React.ReactNode;
};

export const Main: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};
