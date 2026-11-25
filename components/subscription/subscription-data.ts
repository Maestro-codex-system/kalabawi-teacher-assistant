import {
  FileText,
  Folder,
  Layers,
  type LucideIcon,
} from "lucide-react";

export type PlanBadgeTone = "popular" | "neutral";
export type PlanCtaVariant = "current" | "outline" | "primary";

export type SubscriptionPlan = {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  badge?: string;
  badgeTone?: PlanBadgeTone;
  highlighted?: boolean;
  accentChecks?: boolean;
  features: string[];
  cta: string;
  ctaVariant: PlanCtaVariant;
  note: string;
};

export const plans: SubscriptionPlan[] = [
  {
    id: "free",
    name: "Free Plan",
    price: "₱0",
    period: "/ month",
    description: "Basic classroom prep",
    features: [
      "2 Lesson Bundles",
      "7 Individual Tool Generations",
      "Standard MATATAG templates",
      "Community support",
    ],
    cta: "Current Plan",
    ctaVariant: "current",
    note: "No credit card required · Instant access",
  },
  {
    id: "starter",
    name: "Starter Plan",
    price: "₱279",
    period: "/ month",
    description: "Ideal for standard weekly teaching",
    badge: "Popular",
    badgeTone: "popular",
    highlighted: true,
    accentChecks: true,
    features: [
      "12 Lesson Bundles",
      "30 Individual Tool Generations",
      "Full DOCX & PPTX exports",
      "DepEd MATATAG templates",
      "Standard email support",
    ],
    cta: "Upgrade to Starter",
    ctaVariant: "outline",
    note: "Cancel anytime · 100% MATATAG Compliant",
  },
  {
    id: "pro",
    name: "Pro Plan",
    price: "₱449",
    period: "/ month",
    description: "Heavy weekly prep & sharing",
    badge: "Full Access",
    badgeTone: "neutral",
    accentChecks: true,
    features: [
      "30 Lesson Bundles",
      "80 Individual Tool Generations",
      "Full DOCX & PPTX exports",
      "DepEd MATATAG templates",
      "Priority generation queue",
      "Share with co-teachers",
    ],
    cta: "Upgrade to Pro",
    ctaVariant: "primary",
    note: "Cancel anytime · 100% MATATAG Compliant",
  },
  {
    id: "school",
    name: "School Plan",
    price: "Custom",
    period: "/ department",
    description: "Multi-teacher licenses & admin tools",
    badge: "Institution",
    badgeTone: "neutral",
    features: [
      "Unlimited Lesson Bundles",
      "Multi-teacher licenses (5+)",
      "Custom DepEd templates",
      "Dedicated account manager",
      "Custom school branding",
      "Priority 24/7 support",
      "Centralized billing & reports",
    ],
    cta: "Contact Sales",
    ctaVariant: "outline",
    note: "Dedicated onboarding · Custom billing",
  },
];

export type Quota = {
  id: string;
  value: number;
  label: string;
  detail: string;
  icon: LucideIcon;
};

export const quotas: Quota[] = [
  {
    id: "bundles",
    value: 0,
    label: "Lesson Bundles",
    detail: "0 used · 2 remaining",
    icon: Folder,
  },
  {
    id: "individual",
    value: 100,
    label: "Individual Tools",
    detail: "80 used · 0 remaining",
    icon: FileText,
  },
];

export type TopUp = {
  id: string;
  title: string;
  detail: string;
  price: string;
  icon: LucideIcon;
  badge?: string;
  highlighted?: boolean;
};

export const topUps: TopUp[] = [
  {
    id: "bundle-pack",
    title: "Lesson Bundle Pack",
    detail: "5 Bundles · Never expires · DepEd templates included",
    price: "₱199",
    icon: Folder,
  },
  {
    id: "individual-pack",
    title: "Individual Pack",
    detail: "15 Tool Generations · Never expires · Single tool runs",
    price: "₱149",
    icon: FileText,
  },
  {
    id: "combined-pack",
    title: "Combined Pack",
    detail: "3 Bundles + 8 Generations · Never expires · Complete prep top-up",
    price: "₱219",
    icon: Layers,
    badge: "Best Value",
    highlighted: true,
  },
];

export type Invoice = {
  id: string;
  title: string;
  date: string;
  amount: string;
  reference: string;
};

export const invoices: Invoice[] = [
  {
    id: "inv-8941",
    title: "Starter Plan - Monthly Subscription",
    date: "Oct 28, 2026",
    amount: "₱279",
    reference: "KBW-2026-8941",
  },
  {
    id: "inv-7512",
    title: "Starter Plan - Monthly Subscription",
    date: "Sep 28, 2026",
    amount: "₱279",
    reference: "KBW-2026-7512",
  },
  {
    id: "inv-6204",
    title: "Batch Credits Top-Up (5 credits)",
    date: "Aug 28, 2026",
    amount: "₱149",
    reference: "KBW-2026-6204",
  },
];

export const paymentMethod = {
  label: "Primary Method:",
  value: "GCash ···· 0917",
  status: "Active",
};
