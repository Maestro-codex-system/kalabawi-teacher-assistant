"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { Menu, PanelLeftOpen } from "lucide-react";
import { Sidebar } from "./sidebar";

export function AppShell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    const previousOverflow = document.body.style.overflow;

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  return (
    <div className="min-h-dvh bg-shell">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-line bg-white px-3 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation"
          aria-expanded={mobileOpen}
          aria-controls="app-sidebar"
          className="grid h-9 w-9 place-items-center rounded-[9px] text-[#475569] transition-colors hover:bg-canvas hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
        >
          <Menu size={20} strokeWidth={1.9} />
        </button>
        <Image
          src="/logo-mark.png"
          alt=""
          width={56}
          height={52}
          priority
          className="h-7 w-7 rounded-[8px]"
        />
        <span className="text-[14px] font-extrabold tracking-[-0.02em] text-navy">
          Kalabawi
        </span>
        <div className="ml-auto">
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "h-8 w-8",
                userButtonTrigger:
                  "rounded-full focus:shadow-none focus-visible:ring-2 focus-visible:ring-brand/30",
              },
            }}
          />
        </div>
      </header>

      <button
        type="button"
        aria-label="Close navigation"
        aria-hidden={!mobileOpen}
        tabIndex={mobileOpen ? 0 : -1}
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 z-40 bg-[#0f172a]/30 transition-opacity duration-200 lg:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        id="app-sidebar"
        className={`fixed inset-y-0 left-0 z-50 transition-transform duration-200 ease-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } ${collapsed ? "lg:-translate-x-full" : "lg:translate-x-0"}`}
      >
        <Sidebar
          onCollapse={() => setCollapsed(true)}
          onClose={() => setMobileOpen(false)}
        />
      </aside>

      {collapsed ? (
        <button
          type="button"
          onClick={() => setCollapsed(false)}
          aria-label="Expand sidebar"
          className="fixed left-4 top-4 z-40 hidden h-9 w-9 place-items-center rounded-[10px] border border-line bg-white text-[#64748b] shadow-soft transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 lg:grid"
        >
          <PanelLeftOpen size={18} strokeWidth={1.8} />
        </button>
      ) : null}

      <div
        className={`min-h-dvh transition-[padding] duration-200 ${
          collapsed ? "lg:pl-0" : "lg:pl-[260px]"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
