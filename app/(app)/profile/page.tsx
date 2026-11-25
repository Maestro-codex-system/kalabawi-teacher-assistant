import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { ProfilePage } from "@/components/profile/profile-page";

export const metadata: Metadata = {
  title: "Teacher Profile",
};

export default async function ProfileRoute() {
  await auth.protect();

  return <ProfilePage />;
}
