import { EB_Garamond, Geist, Geist_Mono } from "next/font/google";

import "@workspace/ui/globals.css";

import { Providers } from "@/components/providers";
import Head from "next/head";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <title>Guidance of Grace</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="keywords"
          content="Elden Ring, Elden Ring map, item finder, best route, Guidance of Grace, Elden Ring guide, Elden Ring tools"
        />

        <meta property="og:type" content="website" key="type" />
        <meta property="og:title" content="Guidance of Grace" key="title" />
        <meta
          property="og:description"
          content="Let the Guidance of Grace lead you. A powerful tool to chart your path through the Lands Between and find the best route to any item you seek."
          key="description"
        />
        <meta
          property="og:url"
          content="https://guidanceofgrace.com"
          key="url"
        />
      </Head>

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
