import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AgentationProvider } from "@/components/AgentationProvider";
import { cn } from "@/lib/utils";
import { getSiteSettings } from "@/sanity/lib/queries/siteContent";

// Plus Jakarta Sans powers everything — body copy AND headlines
// (--font-display points at --font-body in globals.css). No Geist.
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
      className={cn(plusJakartaSans.variable, "font-sans")}
      suppressHydrationWarning
    >
      <body className="font-[family-name:var(--font-body)] antialiased">
        {children}
        <AgentationProvider />
      </body>
    </html>
  );
}
