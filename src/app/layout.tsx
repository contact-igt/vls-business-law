import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://drt.vlslawacademy.com";

const title = "DRT & SARFAESI Proceedings | Procedure & Practice | VLS Law Academy";
const description =
  "Learn DRT and SARFAESI proceedings from a practice-oriented perspective with VLS Law Academy, including the Debt Recovery Tribunal, appellate tribunal pathway, procedure and legal practice.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "VLS Law Academy",
    type: "website",
    images: ["/assets/vls/brand/vls-logo.png"],
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: ["/assets/vls/brand/vls-logo.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-vls-off-white text-vls-black">
        {children}
      </body>
    </html>
  );
}
