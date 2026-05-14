import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "SOLAR MOSS | Sunlit botanical accord",
  description:
    "太陽の余韻、苔とアンバーのぬくもり。肌に静かに残る、架空のボタニカルフレグランスLP。"
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
