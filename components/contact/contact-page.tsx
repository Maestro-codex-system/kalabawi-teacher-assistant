"use client";

import Image from "next/image";
import { useId, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import {
  ChevronDown,
  CircleQuestionMark,
  Mail,
  MessageCircle,
  Send,
  Upload,
  X,
} from "lucide-react";
import {
  faqs,
  supportPreviews,
  supportSubjects,
  type SupportSubjectId,
} from "./contact-data";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-offset-2";

const fieldBase =
  "w-full rounded-[9px] border border-line bg-white px-3.5 text-[13px] text-ink shadow-[0_1px_2px_rgba(15,23,42,0.03)] transition-colors placeholder:text-[#94a3b8] focus:border-brand/50 focus:outline-none focus:ring-2 focus:ring-brand/15";

type FormErrors = { subject?: string; message?: string };

export function ContactPage() {
  const [subject, setSubject] = useState<SupportSubjectId | "">("");
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const subjectFieldId = useId();
  const messageFieldId = useId();
  const attachmentFieldId = useId();
  const attachmentLabelId = useId();
  const subjectErrorId = useId();
  const messageErrorId = useId();

  const subjectRef = useRef<HTMLSelectElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const preview = supportPreviews[subject || "ready"];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: FormErrors = {};
    if (!subject) {
      nextErrors.subject =
        "Choose a subject so we can route your message to the right specialist.";
    }
    if (message.trim().length < 10) {
      nextErrors.message =
        "Add a little more detail so we can help on the first reply.";
    }

    setErrors(nextErrors);

    if (nextErrors.subject) {
      subjectRef.current?.focus();
      return;
    }
    if (nextErrors.message) {
      messageRef.current?.focus();
      return;
    }

    setSent(true);
  }

  function resetForm() {
    setSubject("");
    setMessage("");
    setAttachment(null);
    setErrors({});
    setSent(false);
  }

  function handleAttachment(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) setAttachment(file.name);
    event.target.value = "";
  }

  return (
    <main className="mx-auto w-full max-w-[896px] px-5 pb-16 pt-6 sm:px-6 lg:pt-7">
      <header className="border-b border-line pb-4">
        <h1 className="text-[30px] font-bold leading-[1.15] tracking-[-0.03em] text-ink sm:text-[32px]">
          Help &amp; Support
        </h1>
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted sm:text-[14px]">
          Get in touch with our Philippine teacher support team or browse answers
          to frequent questions.
        </p>
      </header>

      <section className="mt-10 text-center sm:mt-12">
        <div className="relative mx-auto flex h-[184px] w-[252px] items-center justify-center">
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,#e9f2ff_0%,#f4f8ff_46%,rgba(248,250,252,0)_72%)]"
          />
          <Image
            src="/mascot-hero.png"
            alt=""
            width={181}
            height={184}
            priority
            aria-hidden="true"
            className="relative h-[164px] w-auto"
          />
        </div>

        <h2 className="mt-2 text-[26px] font-bold leading-tight tracking-[-0.025em] text-navy sm:text-[30px]">
          How can we help today?
        </h2>
        <p className="mt-2 text-[13.5px] leading-relaxed text-[#475569] sm:text-[14px]">
          Our team is here to support your lesson planning journey.
        </p>

        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href="https://m.me/kalabawi"
            target="_blank"
            rel="noreferrer noopener"
            className={`inline-flex h-11 w-full items-center justify-center gap-2 rounded-[12px] bg-brand px-6 text-[13.5px] font-semibold text-white shadow-[0_16px_30px_-22px_rgba(37,99,235,0.95)] transition-colors hover:bg-[#1d4ed8] sm:w-auto ${focusRing}`}
          >
            <MessageCircle size={17} strokeWidth={2} aria-hidden="true" />
            Chat on Messenger
          </a>
          <a
            href="mailto:support@kalabawi.ph"
            className={`inline-flex h-11 w-full items-center justify-center gap-2 rounded-[12px] border border-line bg-white px-6 text-[13.5px] font-semibold text-ink shadow-soft transition-colors hover:bg-canvas sm:w-auto ${focusRing}`}
          >
            <Mail size={17} strokeWidth={2} aria-hidden="true" />
            Send an Email
          </a>
        </div>
      </section>

      <section
        aria-labelledby="inquiry-heading"
        className="ds-card mt-10 overflow-hidden"
      >
        <div className="grid lg:grid-cols-2">
          <div className="px-5 py-8 sm:px-12 sm:py-12">
            {sent ? (
              <div
                role="status"
                className="flex h-full flex-col items-center justify-center py-4 text-center"
              >
                <Image
                  src="/mascot-ready.png"
                  alt=""
                  width={222}
                  height={160}
                  aria-hidden="true"
                  className="h-[126px] w-auto"
                />
                <h2 className="mt-4 text-[20px] font-bold tracking-[-0.02em] text-ink">
                  Message sent!
                </h2>
                <p className="mt-2 max-w-[300px] text-[13px] leading-[1.7] text-muted">
                  Salamat! Our teacher support team usually replies within one
                  school day.
                </p>
                <button
                  type="button"
                  onClick={resetForm}
                  className={`mt-6 inline-flex h-10 items-center justify-center rounded-[9px] border border-line bg-white px-4 text-[12.5px] font-semibold text-ink shadow-sm transition-colors hover:bg-canvas ${focusRing}`}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <h2
                  id="inquiry-heading"
                  className="text-[20px] font-bold tracking-[-0.02em] text-ink"
                >
                  Send an Inquiry or Ticket
                </h2>
                <p className="mt-2 max-w-[320px] text-[13px] leading-[1.7] text-muted">
                  Need specific adjustments for your school division guidelines?
                  Let us know.
                </p>

                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="mt-6 space-y-5"
                >
                  <div>
                    <label
                      htmlFor={subjectFieldId}
                      className="mb-1.5 block text-[12.5px] font-semibold text-ink"
                    >
                      Subject
                    </label>
                    <div className="relative">
                      <select
                        id={subjectFieldId}
                        ref={subjectRef}
                        value={subject}
                        onChange={(event) => {
                          setSubject(event.target.value as SupportSubjectId | "");
                          setErrors((current) => ({
                            ...current,
                            subject: undefined,
                          }));
                        }}
                        aria-invalid={Boolean(errors.subject)}
                        aria-describedby={
                          errors.subject ? subjectErrorId : undefined
                        }
                        className={`${fieldBase} h-11 appearance-none pr-10 ${
                          subject === "" ? "text-[#94a3b8]" : ""
                        } ${errors.subject ? "border-danger" : ""}`}
                      >
                        <option value="">Select a subject...</option>
                        {supportSubjects.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={16}
                        strokeWidth={2}
                        aria-hidden="true"
                        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#64748b]"
                      />
                    </div>
                    {errors.subject ? (
                      <p
                        id={subjectErrorId}
                        className="mt-1.5 text-[11.5px] leading-snug text-danger"
                      >
                        {errors.subject}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label
                      htmlFor={messageFieldId}
                      className="mb-1.5 block text-[12.5px] font-semibold text-ink"
                    >
                      Message
                    </label>
                    <textarea
                      id={messageFieldId}
                      ref={messageRef}
                      value={message}
                      onChange={(event) => {
                        setMessage(event.target.value);
                        setErrors((current) => ({
                          ...current,
                          message: undefined,
                        }));
                      }}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={
                        errors.message ? messageErrorId : undefined
                      }
                      placeholder="Describe your issue or suggestion in detail..."
                      className={`${fieldBase} min-h-[132px] resize-none py-3 leading-relaxed ${
                        errors.message ? "border-danger" : ""
                      }`}
                    />
                    {errors.message ? (
                      <p
                        id={messageErrorId}
                        className="mt-1.5 text-[11.5px] leading-snug text-danger"
                      >
                        {errors.message}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <span
                      id={attachmentLabelId}
                      className="mb-1.5 block text-[12.5px] font-semibold text-ink"
                    >
                      Screenshot{" "}
                      <span className="font-medium text-muted">(Optional)</span>
                    </span>
                    <div className="flex h-11 items-center gap-2 rounded-[9px] border border-line bg-white px-3.5">
                      {attachment ? (
                        <>
                          <Upload
                            size={15}
                            strokeWidth={1.9}
                            aria-hidden="true"
                            className="shrink-0 text-[#94a3b8]"
                          />
                          <span className="min-w-0 flex-1 truncate text-[12.5px] font-medium text-ink">
                            {attachment}
                          </span>
                          <button
                            type="button"
                            onClick={() => setAttachment(null)}
                            aria-label={`Remove ${attachment}`}
                            className={`grid h-6 w-6 shrink-0 place-items-center rounded-[6px] text-[#94a3b8] transition-colors hover:bg-canvas hover:text-ink ${focusRing}`}
                          >
                            <X size={14} strokeWidth={2} aria-hidden="true" />
                          </button>
                        </>
                      ) : (
                        <label className="flex h-full w-full cursor-pointer items-center gap-2 text-[12.5px] text-muted">
                          <Upload
                            size={15}
                            strokeWidth={1.9}
                            aria-hidden="true"
                            className="shrink-0 text-[#94a3b8]"
                          />
                          Click to attach error screenshot or photo
                          <input
                            id={attachmentFieldId}
                            type="file"
                            accept="image/*"
                            aria-labelledby={attachmentLabelId}
                            onChange={handleAttachment}
                            className="sr-only"
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className={`inline-flex h-11 w-full items-center justify-center gap-2 rounded-[9px] bg-brand text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-[#1d4ed8] ${focusRing}`}
                  >
                    <Send size={16} strokeWidth={2} aria-hidden="true" />
                    Send Message
                  </button>
                </form>
              </>
            )}
          </div>

          <div className="flex flex-col items-center justify-center border-t border-line bg-panel px-6 py-10 text-center lg:border-l lg:border-t-0 lg:px-8 lg:py-12">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#94a3b8]">
              Support Preview
            </p>

            <span
              className={`mt-3 inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-[12px] font-semibold ${preview.badgeClass}`}
            >
              <preview.icon size={14} strokeWidth={2} aria-hidden="true" />
              {preview.badge}
            </span>

            <div className="relative mt-9 flex items-center justify-center">
              <span
                aria-hidden="true"
                className="absolute h-[196px] w-[196px] rounded-full bg-[radial-gradient(circle_at_center,#ffffff_0%,#f7fbff_62%,rgba(251,252,254,0)_100%)]"
              />
              <Image
                src={preview.mascot.src}
                alt=""
                width={preview.mascot.width}
                height={preview.mascot.height}
                aria-hidden="true"
                className={`relative w-auto ${preview.mascot.className}`}
              />
              <span
                aria-hidden="true"
                className="absolute -left-3 top-0 grid h-12 w-12 place-items-center rounded-[14px] bg-white text-[22px] leading-none shadow-[0_14px_28px_-18px_rgba(15,23,42,0.55)] ring-1 ring-[#eef2f7] sm:-left-4"
              >
                {preview.topEmoji.glyph}
              </span>
              <span
                aria-hidden="true"
                className="absolute -right-2 bottom-0 grid h-12 w-12 place-items-center rounded-[14px] bg-white text-[22px] leading-none shadow-[0_14px_28px_-18px_rgba(15,23,42,0.55)] ring-1 ring-[#eef2f7] sm:-right-3"
              >
                {preview.bottomEmoji.glyph}
              </span>
            </div>

            <h3 className="mt-7 text-[19px] font-bold leading-tight tracking-[-0.02em] text-ink">
              {preview.title}
            </h3>
            <p className="mt-2 max-w-[292px] text-[13px] leading-[1.7] text-[#475569]">
              {preview.copy}
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="faq-heading"
        className="ds-card mt-10 p-5 sm:mt-12 sm:p-10"
      >
        <h2
          id="faq-heading"
          className="flex items-center gap-3 text-[19px] font-bold tracking-[-0.02em] text-ink sm:text-[20px]"
        >
          <span
            aria-hidden="true"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#eaf2ff] text-brand"
          >
            <CircleQuestionMark size={17} strokeWidth={2.2} />
          </span>
          Frequently Asked Questions
        </h2>

        <div className="mt-4 divide-y divide-[#eef2f6] border-t border-line">
          {faqs.map((faq, index) => {
            const open = openFaq === index;
            return (
              <div key={faq.question}>
                <h3>
                  <button
                    type="button"
                    id={`faq-trigger-${index}`}
                    aria-expanded={open}
                    aria-controls={`faq-panel-${index}`}
                    onClick={() => setOpenFaq(open ? null : index)}
                    className={`flex w-full items-center justify-between gap-4 rounded-[6px] py-[19px] pr-5 text-left sm:pr-6 ${focusRing}`}
                  >
                    <span className="text-[13.5px] font-semibold leading-snug text-ink sm:text-[14px]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={18}
                      strokeWidth={2}
                      aria-hidden="true"
                      className={`shrink-0 text-[#94a3b8] transition-transform duration-200 ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </h3>
                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${index}`}
                  hidden={!open}
                  className="pb-5 pr-8 text-[13px] leading-[1.75] text-muted"
                >
                  {faq.answer}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
