import { ArrowRight } from "lucide-react";

const resources = [
  {
    title: "Canva for Education",
    href: "https://www.canva.com/education/",
    description:
      "Free graphic design, classroom visual aids, and interactive slide templates for verified DepEd educators.",
  },
  {
    title: "DepEd Me Portal",
    href: "https://www.deped.gov.ph/",
    description:
      "Official Department of Education portal for MATATAG curriculum guides, official orders, and memoranda.",
  },
  {
    title: "DepEd Tambayan",
    href: "https://depedtambayan.net/",
    description:
      "Community-sharing network of Filipino teachers with free downloadable teaching resources and forms.",
  },
  {
    title: "TeacherPH",
    href: "https://www.teacherph.com/",
    description:
      "Leading news and professional resource hub for Philippine public and private educators.",
  },
];

export function DepedResources() {
  return (
    <section className="ds-card p-5">
      <h2 className="text-[10.5px] font-bold uppercase tracking-[0.1em] text-[#7c8ca1]">
        Useful DepEd Resources
      </h2>

      <div className="mt-4 grid gap-x-10 gap-y-4 sm:grid-cols-2">
        {resources.map((resource) => (
          <div key={resource.title}>
            <a
              href={resource.href}
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand transition-colors hover:text-[#1d4ed8]"
            >
              {resource.title}
              <ArrowRight
                size={14}
                strokeWidth={2}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </a>
            <p className="mt-1.5 text-[11.5px] leading-[1.4] text-[#94a3b8]">
              {resource.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
