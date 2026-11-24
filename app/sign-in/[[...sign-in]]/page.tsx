import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { SignIn } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function SignInPage() {
  return (
    <main className="grid min-h-dvh place-items-center bg-shell px-4 py-10">
      <div className="w-full max-w-[420px]">
        <div className="mb-6 flex items-center justify-center gap-2.5">
          <Image
            src="/logo-mark.png"
            alt=""
            width={64}
            height={60}
            priority
            className="h-9 w-9 rounded-[10px]"
          />
          <span className="text-[17px] font-extrabold tracking-[-0.02em] text-navy">
            Kalabawi
          </span>
        </div>

        <Suspense fallback={<AuthFallback />}>
          <SignIn
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "w-full rounded-[16px] border border-line bg-white shadow-soft",
                headerTitle: "text-navy",
                formButtonPrimary:
                  "bg-brand text-white text-[13.5px] font-semibold normal-case hover:bg-[#1d4ed8]",
                footerActionLink: "text-brand font-semibold",
              },
            }}
          />
        </Suspense>

        <p className="mt-6 text-center text-[11px] leading-relaxed text-[#94a3b8]">
          Kalabawi generates DepEd-compliant ILAW lesson plans, decks, and
          assessments.
        </p>
      </div>
    </main>
  );
}

function AuthFallback() {
  return (
    <div
      aria-hidden
      className="h-[420px] w-full animate-pulse rounded-[16px] border border-line bg-white shadow-soft"
    />
  );
}
