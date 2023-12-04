import type { Metadata } from "next";
import { Merriweather, Roboto } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/providers";

// const inter = Inter({ subsets: ["latin"] });

export const merriweather = Merriweather({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-merriweather",
});

export const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "My Blog",
  description: "Just a personal blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={merriweather.className}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
