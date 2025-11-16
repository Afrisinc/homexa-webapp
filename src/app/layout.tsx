import Footer from "@/app/_components/footer";
import Navbar from "@/app/_components/navbar";
import Providers from "@/app/providers";
import { DynamicScreenDevTools } from "@/components/devtools/screen-devtools";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Marketplace - Shop from Trusted Sellers Worldwide",
  description: "Discover thousands of products from verified sellers. Electronics, fashion, home goods, and more. Chat with sellers, negotiate prices, and shop with confidence.",
  keywords: ["marketplace", "e-commerce", "online shopping", "buy and sell", "electronics", "fashion"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="scroll-smooth antialiased selection:bg-neutral-300 dark:selection:bg-neutral-600"
      suppressHydrationWarning
    >
      <body
        className={cn(
          geist.variable,
          geistMono.variable,
          "flex min-h-svh flex-col font-sans antialiased",
        )}
      >
        <Providers>
          <div className="flex flex-1 flex-col">
            <Navbar />
            <main className="isolate grid flex-1">{children}</main>
            <Footer />
          </div>

          <DynamicScreenDevTools />
        </Providers>
      </body>
    </html>
  );
}
