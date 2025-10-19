import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ユニーポ - 管理システム",
  description: "ユニーポ 次世代型広告プラットフォームサービス",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.className} antialiased`}>
        {children}
        <Script id="ethereum-fix" strategy="beforeInteractive">
          {`
            if (typeof window !== 'undefined' && window.ethereum) {
              const originalDefineProperty = Object.defineProperty;
              Object.defineProperty = function(obj, prop, descriptor) {
                if (obj === window.ethereum && prop === 'selectedAddress') {
                  return obj;
                }
                return originalDefineProperty.call(this, obj, prop, descriptor);
              };
            }
          `}
        </Script>
      </body>
    </html>
  );
}
