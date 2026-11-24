import type { Metadata } from "next";
import { DesignSystemBoard } from "@/components/design-system/board";

export const metadata: Metadata = {
  title: "Design System",
};

export default function DesignSystemRoute() {
  return <DesignSystemBoard />;
}
