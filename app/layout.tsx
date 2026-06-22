import type { Metadata } from "next";
import localFont from "next/font/local";
import { Playfair_Display, Plus_Jakarta_Sans, Geist } from "next/font/google";
import "./globals.css";
import { AgentationProvider } from "@/components/AgentationProvider";
import { SandspirePageTransitions } from "@/components/sandspire/SandspirePageTransitions";
import { SiteLenis } from "@/components/sandspire/SiteLenis";
import { cn } from "@/lib/utils";
import { getSiteSettings } from "@/sanity/lib/queries/siteContent";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const colitezSerif = localFont({
  src: "./fonts/ColitezSerif-Italic.otf",
  variable: "--font-colitez",
  display: "swap",
  weight: "400",
  style: "italic",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();
  return {
    title: site.siteTitle,
    description: site.siteDescription,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        colitezSerif.variable,
        playfairDisplay.variable,
        plusJakartaSans.variable,
        "bg-[#0d0d0d] font-sans",
        geist.variable,
      )}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
      </head>
      <body className="bg-[#0d0d0d] font-[family-name:var(--font-body)] text-[#faf3e8] antialiased">
        <SandspirePageTransitions>
          <SiteLenis>{children}</SiteLenis>
        </SandspirePageTransitions>
        <AgentationProvider />
      </body>
    </html>
  );
}
