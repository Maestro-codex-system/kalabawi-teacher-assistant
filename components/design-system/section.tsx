import type { ReactNode } from "react";

type SectionCardProps = {
  number: number;
  title: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
};

export function SectionCard({
  number,
  title,
  children,
  className = "",
  bodyClassName = "",
}: SectionCardProps) {
  return (
    <section className={`ds-card flex min-w-0 flex-col ${className}`}>
      <h2 className="px-5 pt-4 text-[13px] font-bold uppercase tracking-[0.04em] text-navy">
        <span className="mr-1.5 font-extrabold">{number}.</span>
        {title}
      </h2>
      <div className={`flex flex-1 flex-col px-5 pb-5 pt-4 ${bodyClassName}`}>
        {children}
      </div>
    </section>
  );
}

type PanelProps = {
  title: string;
  meta?: string;
  children: ReactNode;
  className?: string;
};

export function Panel({ title, meta, children, className = "" }: PanelProps) {
  return (
    <section className={`ds-card flex min-w-0 flex-col px-5 py-4 ${className}`}>
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.14em] text-navy">
          {title}
        </h3>
        {meta ? (
          <span className="text-[11px] font-medium text-muted">{meta}</span>
        ) : null}
      </div>
      {children}
    </section>
  );
}

export function ProgressRing({
  value,
  size = 66,
  className = "",
}: {
  value: number;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={`relative grid shrink-0 place-items-center rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: `conic-gradient(#2563EB ${value * 3.6}deg, #E7EFFA 0deg)`,
      }}
      aria-label={`${value} percent`}
      role="img"
    >
      <div className="absolute inset-[6px] rounded-full bg-white" />
      <span className="relative text-[13px] font-extrabold text-ink">{value}%</span>
    </div>
  );
}
