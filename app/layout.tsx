import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
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
      <body className="min-h-full font-sans">
        <ClerkProvider
          signInUrl="/sign-in"
          signUpUrl="/sign-up"
          afterSignOutUrl="/sign-in"
          appearance={{
            variables: { colorPrimary: "#2563eb" },
          }}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
