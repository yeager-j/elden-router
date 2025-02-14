import { EB_Garamond, Geist, Geist_Mono } from "next/font/google";

import "@workspace/ui/globals.css";

import { Providers } from "@/components/providers";
import { Metadata } from "next";

import { Toaster } from "@workspace/ui/components/sonner";

const fontSerif = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
});

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Guidance of Grace – Elden Ring Route Planner",
  description:
    "Let the Guidance of Grace lead you. A powerful tool to chart your path through the Lands Between and find the best route to any item you seek.",
  keywords: [
    "Elden Ring",
    "Elden Ring map",
    "item finder",
    "best route",
    "Guidance of Grace",
    "Elden Ring guide",
    "Elden Ring tools",
  ],
  openGraph: {
    type: "website",
    url: "https://guidanceofgrace.com",
    title: "Guidance of Grace – Elden Ring Route Planner",
    description:
      "Let the Guidance of Grace lead you. A powerful tool to chart your path through the Lands Between and find the best route to any item you seek.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSerif.variable} ${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
      >
        <Providers>
          <main className="max-w-screen-lg mx-auto min-h-svh p-8 flex md:mt-48">
            {children}

            <Toaster />
          </main>
        </Providers>
      </body>
    </html>
  );
}
