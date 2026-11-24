import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { DashboardPage } from "@/components/dashboard/dashboard-page";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardRoute() {
  await auth.protect();

  return <DashboardPage />;
}
