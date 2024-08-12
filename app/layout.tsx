import type { Metadata, Viewport } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import Provider from "./utils/Provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/Footer";
import { cookies } from "next/headers";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: "UramIT System",
  description: "System for UramIT",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@200..1000&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          " bg-[url('../public/assets/Rainbow_lightbulb_by_Daniel_Micallef.png')] bg-cover font-sans antialiased flex flex-col items-start h-[100dvh] backdrop-blur-xl",
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
