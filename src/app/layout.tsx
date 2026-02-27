import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "CarbonIQ — Carbon Accounting & CBAM Compliance for EU Businesses",
    template: "%s | CarbonIQ",
  },
  description:
    "The all-in-one carbon accounting platform for EU businesses. CBAM compliance, GHG Scope 1-2-3 reporting, and IFRS S1/S2 disclosures — starting at €79/month.",
  keywords: [
    "CBAM", "carbon accounting", "GHG reporting", "IFRS S2", "carbon footprint",
    "ESG reporting", "Scope 1 2 3", "EU ETS", "carbon compliance", "Romania",
  ],
  authors: [{ name: "CarbonIQ" }],
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  );
}
