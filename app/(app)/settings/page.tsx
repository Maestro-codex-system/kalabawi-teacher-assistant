import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { SettingsPage } from "@/components/settings/settings-page";

export const metadata: Metadata = {
  title: "Settings & Preferences",
};

export default async function SettingsRoute() {
  await auth.protect();

  return <SettingsPage />;
}
