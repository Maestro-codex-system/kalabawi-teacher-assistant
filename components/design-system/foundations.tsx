import Image from "next/image";
import { Icon, type IconName } from "./icons";
import { Panel, SectionCard } from "./section";

const swatches = [
  { name: "Primary Blue", hex: "#2563EB" },
  { name: "Text Dark", hex: "#0F172A" },
  { name: "Text Muted", hex: "#64748B" },
  { name: "Background Gray", hex: "#F8FAFC" },
  { name: "Pure White", hex: "#FFFFFF" },
  { name: "Success Green", hex: "#10B981" },
  { name: "Error Red", hex: "#EF4444" },
  { name: "Warning Amber", hex: "#F59E0B" },
  { name: "Info Blue", hex: "#3B82F6" },
];

const navItems: { icon: IconName; label: string }[] = [
  { icon: "home", label: "Dashboard" },
  { icon: "file", label: "Create" },
  { icon: "file", label: "My Resources" },
  { icon: "settings", label: "Settings" },
  { icon: "help", label: "Help" },
];

const spacingSteps = [4, 8, 12, 16, 24, 32, 40, 48, 64];

const principles: { icon: IconName; label: string }[] = [
  { icon: "sparkle", label: "Clarity First" },
  { icon: "bolt", label: "Speed & Focus" },
  { icon: "gem", label: "SaaS Polish" },
  { icon: "shield", label: "DepEd Compliant" },
];

export function ColorsSection() {
  return (
    <SectionCard number={1} title="Colors" className="lg:min-h-[238px]">
      <ul className="grid grid-cols-4 gap-x-3 gap-y-5 min-[420px]:grid-cols-5 lg:grid-cols-9 lg:gap-x-2">
        {swatches.map((swatch) => (
          <li key={swatch.hex + swatch.name} className="min-w-0">
            <span
              className="block aspect-square w-full rounded-[9px] border border-black/5"
              style={{ backgroundColor: swatch.hex }}
            />
            <span className="mt-2 block text-[10px] font-semibold leading-[1.25] text-ink lg:text-[10.5px]">
              {swatch.name}
            </span>
            <span className="mt-0.5 block text-[9.5px] text-muted lg:text-[10px]">
              {swatch.hex}
            </span>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}

export function TypographySection() {
  return (
    <SectionCard number={2} title="Typography" className="lg:min-h-[238px]">
      <div className="flex items-center gap-4">
        <span className="shrink-0 text-[78px] font-extrabold leading-[0.85] tracking-[-0.065em] text-navy">
          Aa
        </span>
        <dl className="min-w-0 space-y-3">
          <div>
            <dt className="text-[10px] font-semibold text-muted">Primary Font</dt>
            <dd className="text-[14px] font-bold text-ink">Inter</dd>
            <dd className="text-[10.5px] text-muted">(Sans-serif)</dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold text-muted">Document Font</dt>
            <dd className="font-serif text-[14px] font-bold text-ink">
              Merriweather
            </dd>
            <dd className="text-[10.5px] text-muted">(Serif)</dd>
          </div>
        </dl>
      </div>

      <div className="mt-4 border-t border-line pt-3">
        <div className="grid grid-cols-[86px_1fr] gap-x-3 gap-y-1.5">
          <span className="row-span-3 text-[11px] font-semibold text-ink">
            Text Scale
          </span>
          {[
            ["Page Title", "32px Bold"],
            ["Toast Title", "14px Semi-Bold"],
            ["Toast Subtitle", "12px Regular"],
          ].map(([label, spec]) => (
            <div
              key={label}
              className="flex items-baseline justify-between gap-4 text-[11px]"
            >
              <span className="text-ink">{label}</span>
              <span className="text-muted">{spec}</span>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

export function SpacingSection() {
  return (
    <SectionCard number={3} title="Spacing & Layout" className="lg:min-h-[344px]">
      <div className="relative h-9">
        <span className="absolute left-0 top-0 w-1/3 text-center text-[11px] text-muted">
          260px
        </span>
        <span className="absolute left-1/3 right-0 top-0 text-center text-[11px] text-muted">
          Auto
        </span>
        <span className="absolute inset-x-0 top-[22px] h-px bg-[#7FA9D9]" />
        {["left-0", "left-1/3", "right-0"].map((position) => (
          <span
            key={position}
            className={`absolute ${position} top-[17px] h-[11px] w-px bg-[#7FA9D9]`}
          />
        ))}
      </div>

      <div className="mt-2 grid flex-1 grid-cols-[150px_minmax(0,1fr)] overflow-hidden rounded-[9px] border border-line sm:grid-cols-[168px_minmax(0,1fr)]">
        <div className="flex flex-col gap-1.5 border-r border-line bg-white px-3 py-3">
          <div className="mb-2 flex items-center gap-2">
            <Image
              src="/logo-mark.png"
              alt=""
              width={103}
              height={97}
              aria-hidden="true"
              className="h-[18px] w-auto"
            />
            <span className="text-[12px] font-extrabold text-navy">Kalabawi</span>
          </div>
          {navItems.map((item, index) => (
            <div
              key={item.label}
              className={`flex items-center gap-2 rounded-[6px] px-2 py-[5px] text-[11.5px] ${
                index === 0
                  ? "bg-[#E8F0FE] font-semibold text-brand"
                  : "text-muted"
              }`}
            >
              <Icon
                name={item.icon}
                size={13}
                strokeWidth={index === 0 ? 2 : 1.7}
              />
              <span>{item.label}</span>
            </div>
          ))}
          <span className="mt-auto pt-2 text-[9px] text-muted">v1.0.2</span>
        </div>
        <div className="grid place-items-center bg-[#F8FAFC] px-4 py-10 text-center">
          <p className="text-[13px] leading-relaxed text-muted">
            Main Content Area
            <br />
            (Soft Gray Background)
          </p>
        </div>
      </div>
    </SectionCard>
  );
}

export function RadiusSection() {
  return (
    <SectionCard
      number={4}
      title="Radius & Shadows"
      className="lg:min-h-[344px]"
    >
      <div className="grid flex-1 grid-cols-2 gap-3">
        {[
          { label: "Cards", token: "rounded-2xl", value: "(16px)", radius: "rounded-[16px]" },
          {
            label: "Toasts / Buttons",
            token: "rounded-xl",
            value: "(12px)",
            radius: "rounded-[12px]",
          },
        ].map((item) => (
          <div
            key={item.token}
            className={`flex h-full min-h-[120px] flex-col justify-between border border-line bg-white p-3 lg:min-h-[152px] ${item.radius}`}
          >
            <span className="text-[11.5px] font-medium text-ink">{item.label}</span>
            <span>
              <span className="block text-[11.5px] font-semibold text-ink">
                {item.token}
              </span>
              <span className="block text-[10.5px] text-muted">{item.value}</span>
            </span>
          </div>
        ))}
      </div>

      <div className="mt-3 shrink-0 rounded-[10px] border border-line bg-white p-3.5 shadow-soft">
        <span className="block text-[11.5px] font-semibold text-ink">Shadows</span>
        <span className="mt-1 block text-[10.5px] text-muted">
          Soft, diffused drop shadows.
        </span>
      </div>
    </SectionCard>
  );
}

export function SpacingSystemPanel() {
  return (
    <Panel title="Spacing System" meta="4px base unit" className="lg:min-h-[150px]">
      <div className="mt-4 flex flex-1 items-end justify-between gap-1.5 sm:gap-3">
        {spacingSteps.map((step) => {
          const size = Math.round(10 + step * 1.15);
          return (
            <div key={step} className="flex min-w-0 flex-1 flex-col items-center gap-2">
              <span
                className="block max-w-full rounded-[4px] bg-brand"
                style={{ width: Math.min(size, 84), height: size }}
              />
              <span className="text-[10.5px] text-muted">{step}</span>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}

export function PrinciplesPanel() {
  return (
    <Panel title="Footer & Principles" className="relative overflow-hidden lg:min-h-[150px]">
      <Image
        src="/logo-mark.png"
        alt=""
        width={103}
        height={97}
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-3 -right-3 w-[72px] opacity-[0.06]"
      />
      <p className="relative mt-3 text-[15px] font-bold tracking-[-0.01em] text-ink">
        Consistency breeds trust.
      </p>
      <ul className="relative mt-auto flex flex-wrap gap-x-3 gap-y-2 pt-4">
        {principles.map((item) => (
          <li
            key={item.label}
            className="flex items-center gap-1.5 text-[10px] text-muted"
          >
            <Icon name={item.icon} size={12} className="text-[#7C8CA1]" />
            {item.label}
          </li>
        ))}
      </ul>
    </Panel>
  );
}
