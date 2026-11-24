import type { ReactNode, SVGProps } from "react";

export type IconName =
  | "home"
  | "file"
  | "calendar"
  | "settings"
  | "search"
  | "bell"
  | "help"
  | "logout"
  | "close"
  | "check"
  | "chevron-left"
  | "chevron-right"
  | "zoom-in"
  | "zoom-out"
  | "download"
  | "crown"
  | "gem"
  | "bolt"
  | "shield"
  | "sparkle";

const paths: Record<IconName, ReactNode> = {
  home: (
    <>
      <path d="M3 10.6 12 3.4l9 7.2" />
      <path d="M5.4 9.4v11.2h13.2V9.4" />
      <path d="M9.6 20.6v-6.4h4.8v6.4" />
    </>
  ),
  file: (
    <>
      <path d="M14 3H6.6v18h10.8V7.4L14 3Z" />
      <path d="M14 3v4.4h3.4" />
      <path d="M9.2 12.6h5.6M9.2 16h5.6" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.2" y="5.2" width="17.6" height="15.6" rx="2.2" />
      <path d="M16 3.2v4M8 3.2v4M3.2 10.2h17.6" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-2.6V20a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L8.1 17l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H6.7v-2.5h.2a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L8.1 7.5 9.9 5.7l.1.1A1.7 1.7 0 0 0 12 6.1a1.7 1.7 0 0 0 1-1.6V4h2.5v.5a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2V13h-.2a1.7 1.7 0 0 0-1.1.6Z" />
    </>
  ),
  search: (
    <>
      <circle cx="10.8" cy="10.8" r="6.2" />
      <path d="m15.4 15.4 5 5" />
    </>
  ),
  bell: (
    <>
      <path d="M18 8.6a6 6 0 1 0-12 0c0 6.4-2.6 6.6-2.6 8.4h17.2c0-1.8-2.6-2-2.6-8.4Z" />
      <path d="M10 20.2h4" />
    </>
  ),
  help: (
    <>
      <circle cx="12" cy="12" r="8.8" />
      <path d="M9.8 9.4a2.4 2.4 0 1 1 3.4 2.2c-.8.4-1.2 1-1.2 2" />
      <path d="M12 16.9h.01" />
    </>
  ),
  logout: (
    <>
      <path d="M9.6 4.4H4.4v15.2h5.2" />
      <path d="m14.4 8 4 4-4 4M18.4 12H8.8" />
    </>
  ),
  close: <path d="M6 6l12 12M18 6 6 18" />,
  check: <path d="m4.8 12.6 4.6 4.6L19.2 6.8" />,
  "chevron-left": <path d="m14.6 5.4-6.4 6.6 6.4 6.6" />,
  "chevron-right": <path d="m9.4 5.4 6.4 6.6-6.4 6.6" />,
  "zoom-in": (
    <>
      <circle cx="10.8" cy="10.8" r="6.2" />
      <path d="m15.4 15.4 5 5M10.8 8v5.6M8 10.8h5.6" />
    </>
  ),
  "zoom-out": (
    <>
      <circle cx="10.8" cy="10.8" r="6.2" />
      <path d="m15.4 15.4 5 5M8 10.8h5.6" />
    </>
  ),
  download: (
    <>
      <path d="M12 3.6v11.2M7.4 10.4 12 15l4.6-4.6" />
      <path d="M4.6 20.4h14.8" />
    </>
  ),
  crown: (
    <>
      <path d="M4 17.6h16" />
      <path d="m3.4 7 5 3.8L12 4l3.6 6.8 5-3.8-1.2 8.8H4.6L3.4 7Z" />
    </>
  ),
  gem: (
    <>
      <path d="M7 4.2h10l4 6.2-9 9.4-9-9.4 4-6.2Z" />
      <path d="M3 10.4h18M9.4 4.2 8 10.4l4 9.4 4-9.4-1.4-6.2" />
    </>
  ),
  bolt: <path d="M13.2 2.8 4.8 13.6h6L9.6 21.2l9.6-11.2h-6.4l.4-7.2Z" />,
  shield: (
    <>
      <path d="M12 3 4.8 5.8v6c0 4.4 3 7.8 7.2 9.2 4.2-1.4 7.2-4.8 7.2-9.2v-6L12 3Z" />
      <path d="m8.8 11.8 2.2 2.2 4.2-4.4" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 3.4 13.8 9l5.6 1.8-5.6 1.8L12 18.2l-1.8-5.6L4.6 10.8 10.2 9 12 3.4Z" />
      <path d="M18.4 16.6 19.2 19l2.4.8-2.4.8-.8 2.4-.8-2.4-2.4-.8 2.4-.8.8-2.4Z" />
    </>
  ),
};

export function Icon({
  name,
  size = 20,
  strokeWidth = 1.7,
  ...props
}: { name: IconName; size?: number; strokeWidth?: number } & Omit<
  SVGProps<SVGSVGElement>,
  "name" | "strokeWidth"
>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
