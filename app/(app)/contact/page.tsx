import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { ContactPage } from "@/components/contact/contact-page";

export const metadata: Metadata = {
  title: "Help & Support",
};

export default async function ContactRoute() {
  await auth.protect();

  return <ContactPage />;
}
