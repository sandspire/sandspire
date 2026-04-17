import type { Metadata } from "next";
import { Alexandria, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AgentationProvider } from "@/components/AgentationProvider";

const alexandria = Alexandria({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sandspire",
  description: "We create brands, experiences, and workflows that work without friction.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${alexandria.variable} ${plusJakartaSans.variable}`}
      suppressHydrationWarning
    >
      <body className="font-[family-name:var(--font-body)] antialiased">
        {children}
        <AgentationProvider />
      </body>
    </html>
  );
}
