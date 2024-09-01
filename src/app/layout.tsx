import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UIProvider } from "@/components/providers/UIProvider";
import { TopBar } from "@/components/Topbar/TopBar";
import { View } from "@/components/View/View";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DegenSpace",
  description: "A social community space for degens on solana ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-w-[350px] md:mx-[150px]  mx-[10px]`}
      >
        <UIProvider>
          <div className="flex flex-col gap-[2px] h-screen">
            {/* <TopBar /> */}
            <View>{children}</View>
          </div>
        </UIProvider>
      </body>
    </html>
  );
}
