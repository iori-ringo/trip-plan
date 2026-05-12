import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "BAL D'AFRIQUE | Sun-warmed memory",
  description:
    "太陽の余韻、アンバーのぬくもり。肌に静かに残る、旅の記憶をたどるインタラクティブLP。"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="bg-brownDeep font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
