import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { SubscriptionPage } from "@/components/subscription/subscription-page";

export const metadata: Metadata = {
  title: "Subscription & Plan",
};

export default async function SubscriptionRoute() {
  await auth.protect();

  return <SubscriptionPage />;
}
