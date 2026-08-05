import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Legal — Privacy, Terms & Cookies",
  description:
    "Energy Talents' Privacy Policy, Terms & Conditions, and Cookie Policy — how we handle your data, the terms of using this site and our services, and the cookies we set.",
  alternates: { canonical: "/legal" },
};

const UPDATED = "August 4, 2026";

const TOC = [
  { id: "privacy", label: "Privacy Policy" },
  { id: "terms", label: "Terms & Conditions" },
  { id: "cookies", label: "Cookie Policy" },
] as const;

/** Section heading shared by the three legal blocks. */
function SectionHead({
  id,
  eyebrow,
  title,
}: {
  id: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <div id={id} className="scroll-mt-24">
      <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-brand">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-[26px] font-bold leading-tight tracking-tight text-ink sm:text-[34px]">
        {title}
      </h2>
    </div>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-9 font-display text-lg font-bold text-ink">{children}</h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 font-body text-[15px] leading-relaxed text-body2">
      {children}
    </p>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((it) => (
        <li key={it} className="flex gap-3 font-body text-[15px] leading-relaxed text-body2">
          <span
            aria-hidden
            className="mt-2 size-1.5 shrink-0 rounded-full bg-brand"
          />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export default function LegalPage() {
  return (
    <main>
      {/* Hero -------------------------------------------------------- */}
      <section className="dotbg relative overflow-hidden border-b border-linec bg-white px-4 py-16 sm:px-6 md:py-20">
        <div className="relative mx-auto max-w-[1100px]">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-linec bg-white px-4 py-2 softshadow">
            <span className="size-2 rounded-full bg-brand" />
            <span className="font-body text-xs font-semibold text-ink">
              Legal & Compliance
            </span>
          </div>
          <h1 className="mt-6 font-display text-[32px] font-bold leading-[1.08] tracking-tight text-ink sm:text-[44px] lg:text-[52px]">
            Privacy, Terms &amp; <span className="o-text">Cookies</span>
          </h1>
          <p className="mt-5 max-w-2xl font-body text-base leading-relaxed text-body2 sm:text-[17px]">
            This page sets out how Energy Talents handles your personal data, the
            terms on which we provide this website and our crewing services, and
            the cookies we use. Please read it carefully — using this site means
            you accept what follows.
          </p>
          <p className="mt-5 font-body text-xs font-semibold uppercase tracking-[0.14em] text-body2/70">
            Last updated: {UPDATED}
          </p>
        </div>
      </section>

      {/* Body -------------------------------------------------------- */}
      <section className="bg-white px-4 py-14 sm:px-6 md:py-20">
        <div className="mx-auto grid max-w-[1100px] gap-12 lg:grid-cols-[220px_1fr] lg:gap-16">
          {/* Sticky table of contents */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="font-body text-xs font-bold uppercase tracking-[0.14em] text-body2/60">
              On this page
            </p>
            <nav className="mt-4 flex flex-col gap-1">
              {TOC.map((t) => (
                <a
                  key={t.id}
                  href={`#${t.id}`}
                  className="rounded-lg px-3 py-2 font-body text-sm font-medium text-body2 transition-colors hover:bg-brand/[0.06] hover:text-brand"
                >
                  {t.label}
                </a>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <div className="min-w-0">
            {/* Privacy ------------------------------------------------ */}
            <SectionHead
              id="privacy"
              eyebrow="01 — Data Protection"
              title="Privacy Policy"
            />
            <P>
              Energy Talents Ltd (&ldquo;Energy Talents&rdquo;, &ldquo;we&rdquo;,
              &ldquo;us&rdquo;) is the controller of the personal data described
              here. We provide technical crewing and manpower services to the
              energy, infrastructure, marine and renewables sectors, and this
              policy explains what we collect from candidates, clients and site
              visitors, and what we do with it.
            </P>

            <H3>Information we collect</H3>
            <Bullets
              items={[
                "Identity & contact details — name, email, phone, country and, for candidates, nationality and work-eligibility documents.",
                "Professional data — CV, certifications, qualifications, work history and references you submit for a role.",
                "Enquiry data — the messages, project details and preferences you send through our forms.",
                "Technical data — IP address, browser type, device and pages visited, collected automatically via cookies.",
              ]}
            />

            <H3>How we use your information</H3>
            <Bullets
              items={[
                "To match candidates with roles and to deliver crewing services to clients.",
                "To respond to enquiries and route them to the correct regional desk.",
                "To meet legal, tax, immigration and health-and-safety obligations.",
                "To improve our website and services, and — where you have opted in — to send relevant updates.",
              ]}
            />

            <H3>Sharing your information</H3>
            <P>
              We share personal data only where necessary: with clients when
              putting a candidate forward (with your knowledge), with vetting,
              payroll and travel providers acting on our behalf, and with
              authorities where the law requires it. We do not sell your personal
              data.
            </P>

            <H3>Data retention</H3>
            <P>
              We keep personal data only as long as needed for the purposes above
              or as required by law. Candidate records are typically held for the
              duration of our relationship and a reasonable period afterwards so
              we can consider you for future roles; you can ask us to delete them
              at any time.
            </P>

            <H3>Your rights</H3>
            <P>
              Depending on your location, you may have the right to access,
              correct, delete or restrict the processing of your personal data,
              to object to processing, and to data portability. To exercise any of
              these, contact us at{" "}
              <a
                href="mailto:immanuel@energytalentz.com"
                className="font-semibold text-brand hover:underline"
              >
                immanuel@energytalentz.com
              </a>
              .
            </P>

            <H3>Security & international transfers</H3>
            <P>
              We apply appropriate technical and organisational measures to
              protect your data. Because we operate across multiple regions, your
              data may be transferred outside your home country; where it is, we
              use appropriate safeguards for that transfer.
            </P>

            {/* Terms -------------------------------------------------- */}
            <div className="mt-16 border-t border-linec pt-16">
              <SectionHead
                id="terms"
                eyebrow="02 — Site & Services"
                title="Terms & Conditions"
              />
              <P>
                By accessing this website or engaging Energy Talents&rsquo;
                services, you agree to these terms. If you do not agree, please do
                not use the site.
              </P>

              <H3>Use of the website</H3>
              <P>
                You may use this site for lawful purposes only. You agree not to
                misuse it, attempt to gain unauthorised access, disrupt its
                operation, or use it to transmit anything unlawful or harmful.
              </P>

              <H3>Recruitment & crewing services</H3>
              <P>
                Information on this site about roles, rates and availability is
                provided in good faith but may change. Any placement or supply of
                personnel is governed by a separate written agreement between
                Energy Talents and the client or candidate; nothing on this site
                constitutes an offer of employment or a guarantee of placement.
              </P>

              <H3>Intellectual property</H3>
              <P>
                All content on this site — text, graphics, logos and layout — is
                owned by or licensed to Energy Talents and is protected by
                intellectual-property laws. You may not reproduce or redistribute
                it without our written permission.
              </P>

              <H3>Disclaimers & liability</H3>
              <P>
                The site is provided &ldquo;as is&rdquo; without warranties of any
                kind. To the fullest extent permitted by law, Energy Talents is
                not liable for any indirect or consequential loss arising from your
                use of, or inability to use, the site. Nothing in these terms
                limits liability that cannot lawfully be limited.
              </P>

              <H3>Governing law</H3>
              <P>
                These terms are governed by the laws of the United Arab Emirates,
                and any disputes are subject to the exclusive jurisdiction of its
                courts.
              </P>
            </div>

            {/* Cookies ------------------------------------------------ */}
            <div className="mt-16 border-t border-linec pt-16">
              <SectionHead
                id="cookies"
                eyebrow="03 — Tracking"
                title="Cookie Policy"
              />
              <P>
                Cookies are small text files stored on your device that help a
                website function and remember your preferences. We use a limited
                set of cookies, described below.
              </P>

              <H3>Cookies we use</H3>
              <Bullets
                items={[
                  "Essential cookies — required for the site to work, such as security and load balancing. These cannot be switched off.",
                  "Analytics cookies — help us understand how visitors use the site so we can improve it. These are aggregated and anonymous.",
                  "Preference cookies — remember choices you make, such as region, to give you a smoother experience.",
                ]}
              />

              <H3>Managing cookies</H3>
              <P>
                You can control and delete cookies through your browser settings.
                Blocking essential cookies may affect how parts of the site work.
                Most browsers also let you refuse analytics and preference cookies
                without breaking core functionality.
              </P>
            </div>

            {/* Contact ------------------------------------------------ */}
            <div className="mt-16 rounded-2xl border border-linec bg-white p-7 softshadow">
              <h3 className="font-display text-lg font-bold text-ink">
                Questions about this policy?
              </h3>
              <p className="mt-2 font-body text-[15px] leading-relaxed text-body2">
                Contact our team and we&rsquo;ll point you to the right desk.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/contact-us"
                  className="btn-grad btn-lift inline-flex items-center gap-2 rounded-xl px-5 py-3 font-body text-sm font-bold text-white"
                >
                  Contact Us →
                </Link>
                <a
                  href="mailto:immanuel@energytalentz.com"
                  className="btn-lift inline-flex items-center rounded-xl border border-ink/20 px-5 py-3 font-body text-sm font-semibold text-ink hover:border-ink/40"
                >
                  immanuel@energytalentz.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
