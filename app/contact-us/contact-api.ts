/**
 * Contact page content — served by the CMS.
 *
 * ContactPage is a single record whose `content` document mirrors this page
 * section by section (see energy-talent-cms/app/lib/content/contact-content.ts).
 * The shipped copy is kept here as the fallback: this page is the site's main
 * conversion route, so an unreachable CMS must still render a usable page with
 * a working form rather than an empty shell.
 */

const CMS_URL = (
  process.env.NEXT_PUBLIC_CMS_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export const CONTACT_PAGE_TAG = "contact-page";

function cacheFor(tags: string[]): RequestInit & { next?: { tags: string[] } } {
  return process.env.NODE_ENV === "development"
    ? { cache: "no-store" }
    : { cache: "force-cache", next: { tags } };
}

export type ContactContent = {
  hero: {
    badge: string;
    badgeSuffix: string;
    titleLead: string;
    titleAccent: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  enquiry: {
    kicker: string;
    heading: string;
    intro: string;
    routingLabel: string;
    deskName: string;
    deskLocation: string;
    regions: string[];
    consentText: string;
    submitLabel: string;
    replyNote: string;
    successHeading: string;
    successText: string;
    successButton: string;
  };
  emergency: {
    badge: string;
    heading: string;
    body: string;
    phoneLabel: string;
    phoneNumber: string;
    emailLabel: string;
    emailAddress: string;
  };
  faq: {
    kicker: string;
    heading: string;
    intro: string;
    items: { q: string; a: string }[];
  };
  cta: {
    heading: string;
    body: string;
    primaryLabel: string;
    secondaryLabel: string;
  };
};

/** The copy the page shipped with. Mirrors defaultContactContent() in the CMS. */
export const DEFAULT_CONTACT: ContactContent = {
  hero: {
    badge: "Enquiry desk open now",
    badgeSuffix: "· Tirunelveli, Tamil Nadu, India",
    titleLead: "Tell us what the project needs —",
    titleAccent: "we'll crew it",
    subtitle:
      "Every enquiry reaches a named coordinator in the nearest hub, not a shared inbox. Crew requests are answered within four working hours; urgent rotation issues, in fifteen minutes.",
    ctaPrimary: "Request Technical Crew →",
    ctaSecondary: "Find Your Hub",
  },
  enquiry: {
    kicker: "Send an enquiry",
    heading: "One form. Straight to our desk.",
    intro:
      "Tell us the project region and scope, and our mobilization desk takes it from there — sourcing, vetting and travel handled end to end.",
    routingLabel: "This enquiry routes to",
    deskName: "Our mobilization desk",
    deskLocation: "Tirunelveli, Tamil Nadu, India",
    regions: [
      "Middle East & Africa",
      "Europe & North Sea",
      "Asia-Pacific",
      "The Americas",
      "India / domestic",
      "Multiple / global",
    ],
    consentText:
      "I agree that Energy Talents may store and process these details to respond to my enquiry.",
    submitLabel: "Send Enquiry →",
    replyNote: "Typical reply: under 4 working hours",
    successHeading: "Enquiry received",
    successText:
      "Your request is with our mobilization desk. We'll reply within four working hours.",
    successButton: "Send another enquiry",
  },
  emergency: {
    badge: "24/7 Duty Desk",
    heading: "Crew down at 3am? Call, don't email.",
    body: "Flight disruptions, medical evacuations, visa bottlenecks and weather stand-downs go straight to a named duty manager in the nearest hub — acknowledged within fifteen minutes, any hour of any day.",
    phoneLabel: "24/7 emergency line",
    phoneNumber: "+91 91766 74449",
    emailLabel: "Email us",
    emailAddress: "immanuel@energytalentz.com",
  },
  faq: {
    kicker: "Before you write",
    heading: "Questions we get most often",
    intro:
      "Still unsure which desk you need? Send the enquiry anyway — we'll route it internally.",
    items: [],
  },
  cta: {
    heading: "Not sure where to start?",
    body: "Send the enquiry and we'll route it. Or read how we mobilize, vet and pay technical crews for energy projects worldwide.",
    primaryLabel: "Send an Enquiry →",
    secondaryLabel: "About Energy Talents",
  },
};

/** Fill any missing block from the defaults so a partial record still renders. */
function merge(raw: unknown): ContactContent {
  const d = DEFAULT_CONTACT;
  if (!raw || typeof raw !== "object") return d;
  const c = raw as Partial<ContactContent>;
  return {
    hero: { ...d.hero, ...(c.hero ?? {}) },
    enquiry: {
      ...d.enquiry,
      ...(c.enquiry ?? {}),
      regions:
        Array.isArray(c.enquiry?.regions) && c.enquiry.regions.length > 0
          ? c.enquiry.regions
          : d.enquiry.regions,
    },
    emergency: { ...d.emergency, ...(c.emergency ?? {}) },
    faq: {
      ...d.faq,
      ...(c.faq ?? {}),
      items: Array.isArray(c.faq?.items) ? c.faq.items : d.faq.items,
    },
    cta: { ...d.cta, ...(c.cta ?? {}) },
  };
}

export type ContactPage = {
  metaTitle: string | null;
  metaDescription: string | null;
  content: ContactContent;
};

/** Never throws — falls back to the shipped copy. */
export async function getContactPage(): Promise<ContactPage> {
  const fallback: ContactPage = {
    metaTitle: null,
    metaDescription: null,
    content: DEFAULT_CONTACT,
  };
  try {
    const res = await fetch(`${CMS_URL}/api/contact`, cacheFor([CONTACT_PAGE_TAG]));
    if (!res.ok) return fallback;
    const json = (await res.json()) as {
      success?: boolean;
      data?: {
        metaTitle?: string | null;
        metaDescription?: string | null;
        content?: unknown;
      } | null;
    };
    if (!json?.success || !json.data) return fallback;
    return {
      metaTitle: json.data.metaTitle ?? null,
      metaDescription: json.data.metaDescription ?? null,
      content: merge(json.data.content),
    };
  } catch {
    return fallback;
  }
}

/** "+91 91766 74449" -> "tel:+919176674449" */
export const telHref = (number: string) => `tel:${number.replace(/[^\d+]/g, "")}`;
