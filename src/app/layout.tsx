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

export const metadata: Metadata = {
  title: "Aura | Create, Share, Inspire",
  description:
    "A web application that allows you to generate images with a variety of options.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <Script
        src="https://cloud.umami.is/script.js"
        data-website-id="569c4ee9-34b2-4980-af88-19a9af3b4f81"
        strategy="afterInteractive"
        // data-domains="aura-studio.vercel.app"
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
