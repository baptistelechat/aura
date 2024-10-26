import Menu from "@/components/menu/Menu";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import UmamiBanner from "@/components/UmamiBanner";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const TITLE = "Aura | Create, Share, Inspire";
const DESCRIPTION =
  "A web application that allows you to generate images with a variety of options.";
const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://aura-studio.vercel.app";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: APP_URL,
    siteName: TITLE,
    images: [
      {
        url: `${APP_URL}/api/og?homepage=1`,
        alt: TITLE,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [`${APP_URL}/api/og?homepage=1`],
    creator: "@baptistelechat",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const UMAMI_ID = process.env.NEXT_PUBLIC_UMAMI_ID;

  return (
    <html lang="en" className="h-full">
      <Script
        src="https://cloud.umami.is/script.js"
        data-website-id={UMAMI_ID}
        strategy="afterInteractive"
        data-domains="aura-studio.vercel.app"
      />
      <body
        className={cn(
          "bg-background font-sans antialiased h-full flex flex-col",
          inter.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          // enableSystem
          // disableTransitionOnChange
        >
          <TooltipProvider>
            <Menu />
            <main className="grow md:overflow-hidden">{children}</main>
            <UmamiBanner />
            <Toaster richColors expand={true} />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
