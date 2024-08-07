import type { Metadata, Viewport } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import Provider from "./utils/Provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/Footer";
import { cookie } from "./data/Data";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: "UramIT System",
  description: "System for UramIT ",
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie =
    cookies().get("manager") || cookies().get("admin") || cookies().get("user");
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta name="description" content="System for UramIT" />
      </head>
      <body
        className={cn(
          "bg-[url('../public/assets/Rainbow_lightbulb_by_Daniel_Micallef.png')] bg-cover font-sans antialiased flex flex-col items-start h-[100dvh]",
          fontSans.variable
        )}
      >
        <Provider>
          {children}
          {cookie ? <Footer /> : ""}
          <Toaster />
          <SpeedInsights />
        </Provider>
      </body>
    </html>
  );
}
