"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { SignOutButton, useClerk, useUser } from "@clerk/nextjs";
import {
  Boxes,
  ClipboardCheck,
  CreditCard,
  FileText,
  Folder,
  LayoutGrid,
  LogOut,
  MessageSquare,
  PanelLeftClose,
  Presentation,
  Search,
  Settings,
  User,
  type LucideIcon,
} from "lucide-react";

type SidebarProps = {
  onCollapse: () => void;
  onClose: () => void;
};

const individualTools: { icon: LucideIcon; label: string }[] = [
  { icon: FileText, label: "ILAW Lesson Plan" },
  { icon: Presentation, label: "PPT from Lesson Plan" },
  { icon: ClipboardCheck, label: "TOS & Exam" },
];

const accountItems: { icon: LucideIcon; label: string }[] = [
  { icon: CreditCard, label: "Subscription" },
  { icon: User, label: "Profile" },
  { icon: Settings, label: "Settings" },
  { icon: MessageSquare, label: "Contact Us" },
];

function SectionLabel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`px-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#93a6bd] ${className}`}
    >
      {children}
    </p>
  );
}

type NavRowProps = {
  icon: LucideIcon;
  label: string;
  href?: string;
  active?: boolean;
};

function NavRow({ icon: Icon, label, href, active = false }: NavRowProps) {
  const className = `group flex h-10 w-full items-center gap-3 rounded-[8px] px-3 text-left text-[13.5px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 ${
    active
      ? "border border-[#e3eaf3] bg-[#eef3f9] font-semibold text-ink"
      : "font-medium text-[#475569] hover:bg-[#f5f8fc] hover:text-ink"
  }`;

  const content = (
    <>
      <Icon
        size={17}
        strokeWidth={1.8}
        className={`shrink-0 transition-colors ${
          active ? "text-[#334155]" : "text-[#64748b] group-hover:text-ink"
        }`}
      />
      <span className="truncate">{label}</span>
    </>
  );

  return (
    <li>
      {href ? (
        <Link
          href={href}
          aria-current={active ? "page" : undefined}
          className={className}
        >
          {content}
        </Link>
      ) : (
        <button type="button" className={className}>
          {content}
        </button>
      )}
    </li>
  );
}

export function Sidebar({ onCollapse, onClose }: SidebarProps) {
  const { user } = useUser();
  const { openUserProfile } = useClerk();
  const pathname = usePathname();
  const dashboardActive = pathname === "/" || pathname === "/dashboard";

  const displayName =
    user?.fullName ||
    user?.username ||
    user?.primaryEmailAddress?.emailAddress ||
    "Teacher";

  return (
    <div className="flex h-dvh w-[260px] flex-col border-r border-line bg-white">
      <div className="flex items-center gap-2.5 px-4 pb-4 pt-4">
        <Image
          src="/logo-mark.png"
          alt=""
          width={64}
          height={60}
          priority
          className="h-8 w-8 shrink-0 rounded-[9px]"
        />
        <span className="text-[15px] font-extrabold tracking-[-0.02em] text-navy">
          Kalabawi
        </span>

        <button
          type="button"
          onClick={onCollapse}
          aria-label="Collapse sidebar"
          className="ml-auto hidden h-8 w-8 place-items-center rounded-[7px] text-[#94a3b8] transition-colors hover:bg-canvas hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 lg:grid"
        >
          <PanelLeftClose size={18} strokeWidth={1.8} />
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close navigation"
          className="ml-auto grid h-8 w-8 place-items-center rounded-[7px] text-[#94a3b8] transition-colors hover:bg-canvas hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 lg:hidden"
        >
          <PanelLeftClose size={18} strokeWidth={1.8} />
        </button>
      </div>

      <div className="px-3">
        <label className="flex h-9 items-center gap-2.5 rounded-[10px] bg-[#f4f7fa] px-3 ring-1 ring-inset ring-transparent transition focus-within:bg-white focus-within:ring-brand/30">
          <Search size={16} strokeWidth={1.9} className="shrink-0 text-[#94a3b8]" />
          <span className="sr-only">Search Kalabawi</span>
          <input
            type="search"
            placeholder="Search Kalabawi..."
            className="h-full min-w-0 flex-1 bg-transparent text-[13px] text-ink outline-none placeholder:text-[#94a3b8]"
          />
          <kbd className="shrink-0 rounded-[6px] border border-line bg-white px-1.5 py-0.5 text-[10px] font-medium leading-[1.35] text-[#94a3b8]">
            &#8984;K
          </kbd>
        </label>
      </div>

      <nav
        aria-label="Kalabawi"
        className="mt-4 flex-1 overflow-y-auto px-3 pb-2"
      >
        <Link
          href="/dashboard"
          aria-current={dashboardActive ? "page" : undefined}
          className={`flex h-11 items-center gap-3 rounded-[10px] border px-3 text-[13.5px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 ${
            dashboardActive
              ? "border-[#e3eaf3] bg-[#eef3f9] font-semibold text-ink hover:bg-[#e9eff7]"
              : "border-transparent font-medium text-[#475569] hover:bg-[#f5f8fc] hover:text-ink"
          }`}
        >
          <LayoutGrid
            size={17}
            strokeWidth={2}
            className={`shrink-0 ${
              dashboardActive ? "text-[#334155]" : "text-[#64748b]"
            }`}
          />
          Dashboard
        </Link>

        <SectionLabel className="mt-5">Workspace</SectionLabel>

        <button
          type="button"
          className="mt-2 w-full rounded-[10px] border border-wash-line bg-wash px-3 py-2.5 text-left transition-colors hover:bg-[#e8f1fe] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
        >
          <span className="flex items-center gap-2.5">
            <Boxes size={18} strokeWidth={1.9} className="shrink-0 text-brand" />
            <span className="whitespace-nowrap text-[13.5px] font-semibold text-brand">
              Lesson Bundle
            </span>
            <span className="ml-auto shrink-0 rounded-full border border-[#d3e3fa] bg-white px-2 py-[3px] text-[9px] font-bold leading-none text-brand">
              All-in-One
            </span>
          </span>
          <span className="mt-1 block pl-[28px] text-[10.5px] leading-none text-[#879ab2]">
            Plan + 5 PPTs + Exam
          </span>
        </button>

        <SectionLabel className="mt-5">Individual Tools</SectionLabel>
        <ul className="mt-2 space-y-0.5">
          {individualTools.map((item) => (
            <NavRow key={item.label} {...item} />
          ))}
        </ul>

        <div className="mt-3">
          <ul>
            <NavRow
              icon={Folder}
              label="My Files"
              href="/files"
              active={pathname === "/files"}
            />
          </ul>
        </div>

        <SectionLabel className="mt-5">Account</SectionLabel>
        <ul className="mt-2 space-y-0.5">
          {accountItems.map((item) => (
            <NavRow key={item.label} {...item} />
          ))}
        </ul>

        <div className="mt-2 border-t border-line pt-2">
          <SignOutButton redirectUrl="/sign-in">
            <button
              type="button"
              className="group flex h-10 w-full items-center gap-3 rounded-[8px] px-3 text-left text-[13.5px] font-medium text-[#475569] transition-colors hover:bg-[#fef2f2] hover:text-[#b91c1c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
            >
              <LogOut
                size={17}
                strokeWidth={1.8}
                className="shrink-0 text-[#64748b] transition-colors group-hover:text-[#b91c1c]"
              />
              <span className="truncate">Sign out</span>
            </button>
          </SignOutButton>
        </div>
      </nav>

      <div className="mt-auto px-4 pb-4 pt-3">
        <button
          type="button"
          onClick={() => openUserProfile()}
          aria-label="Open account settings"
          className="flex w-full items-center gap-2.5 rounded-[10px] text-left transition-colors hover:bg-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
        >
          {user?.imageUrl ? (
            <Image
              src={user.imageUrl}
              alt=""
              width={72}
              height={72}
              className="h-9 w-9 shrink-0 rounded-full object-cover"
            />
          ) : (
            <Image
              src="/mascot-empty.png"
              alt=""
              width={72}
              height={66}
              className="h-9 w-9 shrink-0 rounded-full bg-[#eef2f7] object-cover"
            />
          )}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="truncate text-[12.5px] font-bold text-ink">
                {displayName}
              </span>
              <span className="shrink-0 rounded-[5px] bg-[#eef2f6] px-1.5 py-0.5 text-[9px] font-bold leading-none text-[#475569]">
                Pro
              </span>
            </div>
            <p className="mt-1 truncate text-[10.5px] leading-none text-[#94a3b8]">
              0/30 batches &middot; 79/80 individual
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}
