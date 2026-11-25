import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { MyFilesPage } from "@/components/files/my-files-page";

export const metadata: Metadata = {
  title: "My Files",
};

export default async function FilesRoute() {
  await auth.protect();

  return <MyFilesPage />;
}
