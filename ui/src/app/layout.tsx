import Provider from "@/components/provider";
import Providers from "@/components/providers";
import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth";

const roboto = Roboto({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_RESOURCE_NAME,
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(roboto.className)}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </Provider>
  );
}
