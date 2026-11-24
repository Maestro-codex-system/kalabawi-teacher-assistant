import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Kalabawi — The DepEd Teacher Assistant",
    template: "%s — Kalabawi",
  },
  description:
    "Kalabawi helps Filipino public school teachers generate DepEd-compliant ILAW lesson plans, presentations, and assessments.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${merriweather.variable}`}>
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
