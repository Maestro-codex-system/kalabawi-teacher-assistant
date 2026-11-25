import { useId } from "react";
import type { FolderTone } from "./files-data";

type Gradient = { back: [string, string]; front: [string, string]; shine: string };

const palettes: Record<FolderTone, Gradient> = {
  slate: {
    back: ["#8d9bab", "#5b6b7e"],
    front: ["#e9eef4", "#a3b1c0"],
    shine: "#ffffff",
  },
  brand: {
    back: ["#3f83f8", "#1b46c8"],
    front: ["#79b6ff", "#2c6ce4"],
    shine: "#eaf3ff",
  },
  orange: {
    back: ["#fb923c", "#dc4f06"],
    front: ["#ffc68b", "#f97316"],
    shine: "#fff4e6",
  },
  emerald: {
    back: ["#34d399", "#04825d"],
    front: ["#8ff0c5", "#0fae7a"],
    shine: "#ecfdf5",
  },
};

export function FolderGlyph({
  tone,
  className = "",
}: {
  tone: FolderTone;
  className?: string;
}) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const palette = palettes[tone];
  const backId = `folder-back-${uid}`;
  const frontId = `folder-front-${uid}`;
  const glossId = `folder-gloss-${uid}`;
  const shadowId = `folder-shadow-${uid}`;

  return (
    <svg viewBox="0 0 96 92" aria-hidden="true" className={`h-auto ${className}`}>
      <defs>
        <linearGradient id={backId} x1="0.15" y1="0" x2="0.55" y2="1">
          <stop offset="0" stopColor={palette.back[0]} />
          <stop offset="1" stopColor={palette.back[1]} />
        </linearGradient>
        <linearGradient id={frontId} x1="0.08" y1="0" x2="0.72" y2="1">
          <stop offset="0" stopColor={palette.front[0]} />
          <stop offset="1" stopColor={palette.front[1]} />
        </linearGradient>
        <linearGradient id={glossId} x1="0" y1="0" x2="0.15" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="0.65" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <filter id={shadowId} x="-40%" y="-60%" width="180%" height="220%">
          <feGaussianBlur stdDeviation="3.4" />
        </filter>
      </defs>

      <ellipse
        cx="48"
        cy="82"
        rx="32"
        ry="5"
        fill="#0f172a"
        opacity="0.22"
        filter={`url(#${shadowId})`}
      />

      <path
        d="M8 20a10 10 0 0 1 10-10h12.6a10 10 0 0 1 7.4 3.3L42.7 19H78a10 10 0 0 1 10 10v40a10 10 0 0 1-10 10H18a10 10 0 0 1-10-10V20Z"
        fill={`url(#${backId})`}
      />

      <rect x="6" y="29" width="84" height="52" rx="10" fill={`url(#${frontId})`} />
      <path
        d="M16 29h64a10 10 0 0 1 10 10v9.5c-13.4-2.1-31.5-3.2-50-3.2S12.4 46.4 6 48.5V39a10 10 0 0 1 10-10Z"
        fill={`url(#${glossId})`}
      />
      <path
        d="M6 48.9c13.5-2.2 31.6-3.3 50-3.3s36.6 1.1 50 3.3"
        stroke={palette.shine}
        strokeOpacity="0.7"
        strokeWidth="1.3"
        fill="none"
      />
      <path
        d="M6 73.6c15.4 3.3 31.4 4.9 50 4.9s34.6-1.6 50-4.9"
        stroke="#0f172a"
        strokeOpacity="0.1"
        strokeWidth="1.4"
        fill="none"
      />
    </svg>
  );
}
