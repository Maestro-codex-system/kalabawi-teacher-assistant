import {
  Bug,
  Info,
  MessageCircle,
  Receipt,
  Rocket,
  type LucideIcon,
} from "lucide-react";

export type SupportSubjectId = "bug" | "billing" | "feature" | "other";
export type SupportPreviewId = "ready" | SupportSubjectId;

export type SupportPreview = {
  badge: string;
  badgeClass: string;
  icon: LucideIcon;
  mascot: {
    src: string;
    width: number;
    height: number;
    className: string;
    alt: string;
  };
  topEmoji: { glyph: string; label: string };
  bottomEmoji: { glyph: string; label: string };
  title: string;
  copy: string;
};

export const supportSubjects: { id: SupportSubjectId; label: string }[] = [
  { id: "bug", label: "Bug report" },
  { id: "billing", label: "Billing question" },
  { id: "feature", label: "Feature request" },
  { id: "other", label: "Other" },
];

export const supportPreviews: Record<SupportPreviewId, SupportPreview> = {
  ready: {
    badge: "Ready to Listen",
    badgeClass: "bg-[#eef4ff] text-brand",
    icon: Info,
    mascot: {
      src: "/mascot-hero.png",
      width: 181,
      height: 184,
      className: "h-[168px]",
      alt: "Kalabawi mascot waving and ready to help",
    },
    topEmoji: { glyph: "💡", label: "Lightbulb" },
    bottomEmoji: { glyph: "💬", label: "Speech bubble" },
    title: "How can Kalabawi help?",
    copy: "Select a subject so we can route your inquiry directly to the right support specialist.",
  },
  bug: {
    badge: "Bug Investigation",
    badgeClass: "bg-[#fef3c7] text-[#b45309]",
    icon: Bug,
    mascot: {
      src: "/mascot-drafting.png",
      width: 177,
      height: 161,
      className: "h-[152px]",
      alt: "Kalabawi mascot inspecting a problem",
    },
    topEmoji: { glyph: "🐞", label: "Ladybug" },
    bottomEmoji: { glyph: "🔍", label: "Magnifying glass" },
    title: "Spotted a glitch or bug?",
    copy: "Tell us what happened and attach a screenshot if you have one—our engineers will squash it fast!",
  },
  billing: {
    badge: "Billing & Credits",
    badgeClass: "bg-[#e7f8ef] text-[#047857]",
    icon: Receipt,
    mascot: {
      src: "/mascot-empty.png",
      width: 190,
      height: 157,
      className: "h-[146px]",
      alt: "Kalabawi mascot explaining billing details",
    },
    topEmoji: { glyph: "🧾", label: "Receipt" },
    bottomEmoji: { glyph: "💳", label: "Credit card" },
    title: "Questions about your plan?",
    copy: "Need help with GCash, Maya, top-up credits, or official receipts? Our billing team has you covered.",
  },
  feature: {
    badge: "Teacher Wishlist",
    badgeClass: "bg-[#eef0fe] text-[#4f46e5]",
    icon: Rocket,
    mascot: {
      src: "/mascot-ready.png",
      width: 222,
      height: 160,
      className: "h-[124px]",
      alt: "Kalabawi mascot celebrating a new idea",
    },
    topEmoji: { glyph: "🚀", label: "Rocket" },
    bottomEmoji: { glyph: "💡", label: "Lightbulb" },
    title: "Have a bright idea?",
    copy: "We build Kalabawi alongside Filipino teachers. Share the classroom tools you want us to add next!",
  },
  other: {
    badge: "General Inquiry",
    badgeClass: "bg-[#eef4ff] text-brand",
    icon: MessageCircle,
    mascot: {
      src: "/mascot-hero.png",
      width: 181,
      height: 184,
      className: "h-[168px]",
      alt: "Kalabawi mascot listening closely",
    },
    topEmoji: { glyph: "💬", label: "Speech bubble" },
    bottomEmoji: { glyph: "👋", label: "Waving hand" },
    title: "We're all ears!",
    copy: "Need custom school division formatting or have general feedback? Send us a message anytime.",
  },
};

export type FaqItem = { question: string; answer: string };

export const faqs: FaqItem[] = [
  {
    question: "How do I export my PPT?",
    answer:
      "Open My Files, choose the deck you generated, then select Download. The .pptx keeps native, editable shapes, 3D icons, and your MATATAG content, so it opens cleanly in PowerPoint or Google Slides.",
  },
  {
    question: "Why can't I download on the Free plan?",
    answer:
      "The Free plan lets you preview every generated file, but downloads unlock on Pro. Upgrading gives you unlimited downloads, premium templates, and priority support.",
  },
  {
    question: "How do credits work?",
    answer:
      "One bundle credit produces a full weekly set: the ILAW Lesson Plan, five PPT decks, and the TOS & Exam. Individual credits are spent per tool. Bundle credits refresh each billing cycle, while top-up credits never expire.",
  },
  {
    question: "How do I upgrade my plan?",
    answer:
      "Go to Subscription, pick a plan, and pay with GCash or Maya. Upgrades apply instantly, and any unused credits carry over to your new cycle.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept GCash, Maya, and major Philippine credit or debit cards. Official receipts are available for school division reimbursements—just request one through the form above.",
  },
];
