import type { Metadata } from "next";
import { wishlistTitle } from "@/src/lib/profile";
import "./globals.css";

export const metadata: Metadata = {
  title: wishlistTitle,
  description: "A private birthday wishlist with cute wish funding progress.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
