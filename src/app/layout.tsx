import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "SPE | Towards the future",
  description: "創業42年の信頼と最新AI技術で、あなたのビジネスのデジタル変革を支援します。愛知県豊橋市のシステム開発・AI活用コンサルティング会社。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full" data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
