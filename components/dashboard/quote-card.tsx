import { Quote } from "lucide-react";

export function QuoteCard() {
  return (
    <section className="rounded-[16px] border border-[#dbe8f7] bg-quote p-5 shadow-soft sm:p-6">
      <Quote
        size={22}
        strokeWidth={1.5}
        fill="currentColor"
        className="text-brand"
        aria-hidden="true"
      />
      <blockquote className="mt-4 font-serif text-[13.5px] italic leading-[1.75] text-[#334155]">
        &ldquo;Those who know, do. Those that understand, teach.&rdquo;
      </blockquote>
      <p className="mt-4 text-right text-[11.5px] text-[#94a3b8]">
        &mdash; Aristotle
      </p>
    </section>
  );
}
