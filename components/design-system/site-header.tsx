import Image from "next/image";

export function SiteHeader() {
  return (
    <header className="relative overflow-hidden border-b border-line bg-white">
      <Image
        src="/logo-mark.png"
        alt=""
        width={103}
        height={97}
        aria-hidden="true"
        className="pointer-events-none absolute -top-8 right-[6%] hidden w-[210px] opacity-[0.05] sm:block"
      />
      <div className="relative mx-auto flex w-full max-w-[1180px] flex-col items-center gap-5 px-5 py-7 sm:flex-row sm:gap-7 sm:px-6 lg:py-9">
        <div className="flex shrink-0 items-center gap-4">
          <Image
            src="/logo-mark.png"
            alt="Kalabawi"
            width={103}
            height={97}
            priority
            className="h-[58px] w-auto sm:h-[68px]"
          />
          <span className="text-[30px] font-extrabold leading-none tracking-[-0.04em] text-navy sm:text-[36px]">
            Kalabawi
          </span>
        </div>

        <span className="hidden h-[68px] w-px shrink-0 bg-[#7FA9D9] sm:block" />

        <Image
          src="/mascot-hero.png"
          alt=""
          width={181}
          height={184}
          priority
          aria-hidden="true"
          className="h-[124px] w-auto shrink-0 sm:h-[136px] lg:h-[152px]"
        />

        <div className="w-full max-w-full text-center sm:text-left">
          <h1 className="text-[32px] font-extrabold leading-[0.95] tracking-[-0.045em] text-navy sm:text-[38px] lg:text-[44px]">
            Kalabawi
            <br />
            Design System
          </h1>
          <p className="mt-3 max-w-full text-[12.5px] text-muted">
            The DepEd Teacher Assistant. Clean, focused, and high-yield.
          </p>
        </div>
      </div>
    </header>
  );
}
