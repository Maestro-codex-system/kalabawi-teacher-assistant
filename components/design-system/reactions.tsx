import Image from "next/image";
import { Icon } from "./icons";

const perks = [
  "Unlimited Generations",
  "Premium Templates",
  "Priority Support",
];

export function MascotReactionsSection() {
  return (
    <section className="ds-card px-5 py-4">
      <h2 className="text-[13px] font-bold uppercase tracking-[0.04em] text-navy">
        <span className="mr-1.5 font-extrabold">12.</span>
        Cards &amp; Mascot Reactions
      </h2>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-[1.1fr_1fr_1fr_1fr_0.75fr]">
        <div className="flex min-h-[304px] flex-col rounded-[12px] border border-line bg-white p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-[14px] font-bold text-ink">Pro Plan</h3>
              <p className="mt-1 text-[10.5px] leading-relaxed text-muted">
                Unlock more features
                <br />
                for greater productivity.
              </p>
            </div>
            <Icon name="crown" size={19} className="shrink-0 text-brand" />
          </div>

          <div className="mt-4 flex justify-center">
            <span className="grid h-[92px] w-[92px] place-items-center rounded-full border-[9px] border-[#DCE9FB] bg-[#F4F8FE]">
              <Icon name="gem" size={30} className="text-brand" strokeWidth={1.5} />
            </span>
          </div>

          <ul className="mt-auto space-y-2 text-[11px] text-ink">
            {perks.map((perk) => (
              <li key={perk} className="flex items-center gap-2">
                <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-brand-soft text-brand">
                  <Icon name="check" size={9} strokeWidth={3} />
                </span>
                {perk}
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="mt-4 h-9 w-full rounded-[8px] bg-brand text-[11.5px] font-semibold text-white transition-colors hover:bg-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
          >
            Upgrade to Pro
          </button>
        </div>

        <div className="flex min-h-[304px] flex-col items-center rounded-[12px] border border-line bg-white px-4 pb-4 pt-5 text-center">
          <Image
            src="/mascot-empty.png"
            alt=""
            width={190}
            height={174}
            aria-hidden="true"
            className="h-[132px] w-auto"
          />
          <p className="mt-3 text-[12.5px] font-bold leading-snug text-ink">
            No files found yet.
          </p>
          <p className="mt-1.5 text-[10.5px] leading-relaxed text-muted">
            Click &lsquo;Create Lesson Bundle&rsquo; to start.
          </p>
          <button
            type="button"
            className="mt-auto h-9 w-full rounded-[8px] bg-brand text-[11.5px] font-semibold text-white transition-colors hover:bg-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
          >
            Create Lesson Bundle
          </button>
        </div>

        <div className="flex min-h-[304px] flex-col items-center rounded-[12px] border border-line bg-white px-4 pb-4 pt-3 text-center">
          <Image
            src="/mascot-drafting.png"
            alt=""
            width={177}
            height={180}
            aria-hidden="true"
            className="h-[146px] w-auto"
          />
          <p className="mt-3 text-[12.5px] font-bold leading-snug text-ink">
            Kalabawi is drafting
            <br />
            your 4Es flow...
          </p>
          <div className="mt-auto pb-2 pt-5">
            <span
              className="block h-8 w-8 animate-spin rounded-full border-[3px] border-[#DBEAFE] border-r-brand border-t-brand [animation-duration:1.6s]"
              aria-hidden="true"
            />
            <span className="sr-only">Generating</span>
          </div>
        </div>

        <div className="flex min-h-[304px] flex-col items-center rounded-[12px] border border-line bg-white px-4 pb-4 pt-3 text-center">
          <Image
            src="/mascot-ready.png"
            alt=""
            width={222}
            height={160}
            aria-hidden="true"
            className="h-[146px] w-auto"
          />
          <p className="mt-3 text-[12.5px] font-bold leading-snug text-ink">
            Your Lesson Plan and
            <br />
            5 PPTs are ready!
          </p>
          <span className="mt-auto grid h-9 w-9 place-items-center rounded-full bg-[#22C55E] text-white">
            <Icon name="check" size={19} strokeWidth={3} />
          </span>
        </div>

        <div className="hidden min-h-[304px] items-center justify-center rounded-[12px] border border-line bg-white p-3 xl:flex">
          <Image
            src="/mascot-duo.png"
            alt=""
            width={149}
            height={320}
            aria-hidden="true"
            className="h-full max-h-[276px] w-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}
