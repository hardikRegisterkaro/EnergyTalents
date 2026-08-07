/**
 * Lead capture — the single path from every website form into the CMS.
 *
 * Every form on the site (home CTAs, careers pipeline, job application,
 * contact enquiry, newsletter, resume builder, service request) posts through
 * `submitLead` so validation, error handling and the payload shape stay
 * identical across all of them.
 *
 * Payload contract — POST {CMS}/api/lead
 *   { name, email, phoneNo, leadSource, formData?, attachmentUrl?, attachmentName? }
 *
 * The CMS validates name/email/phone again server-side and rejects with 400 +
 * a human-readable `message`. The rules in `validateLead` below mirror it, so
 * the visitor gets the same answer without a round-trip. Keep the two in sync:
 * energy-talent-cms/app/api/lead/route.ts.
 */

const CMS_URL = (
  process.env.NEXT_PUBLIC_CMS_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

/** Values the CMS stores as {"Field Label": value} pairs on the lead. */
export type LeadFormData = Record<string, string | null | undefined>;

export type LeadPayload = {
  name: string;
  email: string;
  phoneNo: string;
  /** Which form this came from, e.g. "Careers — Talent Pipeline". */
  leadSource: string;
  formData?: LeadFormData;
  attachmentUrl?: string | null;
  attachmentName?: string | null;
};

export type LeadResult =
  | { ok: true; leadId?: string }
  | { ok: false; message: string };

export type UploadResult =
  | { ok: true; url: string; filename: string }
  | { ok: false; message: string };

// ── Validation (mirrors energy-talent-cms/app/api/lead/route.ts) ───────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(email: string): boolean {
  const v = email.trim();
  return EMAIL_RE.test(v) && v.length <= 254;
}

/**
 * The CMS counts digits after stripping spaces, dashes, dots, brackets and a
 * leading +, then requires 7–15. Same rule here so "+44 7700 900123" passes.
 */
export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/[\s\-().]/g, "").replace(/^\+/, "");
  return /^\d{7,15}$/.test(digits);
}

export function isValidName(name: string): boolean {
  const v = name.trim();
  return v.length >= 2 && v.length <= 100;
}

/** Returns the first problem with the shared fields, or null when they're fine. */
export function validateLead(
  name: string,
  email: string,
  phone: string
): string | null {
  if (!isValidName(name)) return "Please enter your full name (at least 2 characters).";
  if (!isValidEmail(email)) return "Please enter a valid email address.";
  if (!isValidPhone(phone)) return "Please enter a valid phone number (7–15 digits).";
  return null;
}

// ── CV upload ─────────────────────────────────────────────────────────────

/** Matches the server-side cap in the CMS upload route. */
export const MAX_CV_BYTES = 8 * 1024 * 1024;
export const CV_ACCEPT = ".pdf,.doc,.docx";

const CV_EXTENSIONS = ["pdf", "doc", "docx"];

/** Client-side pre-check so an oversized or wrong-type file fails instantly. */
export function validateCv(file: File): string | null {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (!CV_EXTENSIONS.includes(ext)) {
    return "Please upload a PDF, DOC or DOCX file.";
  }
  if (file.size === 0) return "That file appears to be empty.";
  if (file.size > MAX_CV_BYTES) return "File too large (max 8MB).";
  return null;
}

/**
 * Upload a CV to the CMS and get back a public URL to attach to the lead.
 * Kept separate from `submitLead` so a failed upload can be reported without
 * losing the rest of the form.
 */
export async function uploadCv(file: File): Promise<UploadResult> {
  const localProblem = validateCv(file);
  if (localProblem) return { ok: false, message: localProblem };

  const body = new FormData();
  body.append("file", file);

  try {
    const res = await fetch(`${CMS_URL}/api/lead/upload`, { method: "POST", body });
    const json = await res.json().catch(() => null);

    if (!res.ok || !json?.success) {
      return {
        ok: false,
        message: json?.message ?? "We couldn't upload that file. Please try again.",
      };
    }
    return { ok: true, url: json.url as string, filename: json.filename as string };
  } catch {
    return {
      ok: false,
      message: "We couldn't reach the server to upload your file. Please try again.",
    };
  }
}

// ── Submit ────────────────────────────────────────────────────────────────

/** Drop empty values so the CMS only stores fields the visitor actually filled. */
function cleanFormData(data: LeadFormData | undefined): Record<string, string> | undefined {
  if (!data) return undefined;
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(data)) {
    const v = String(value ?? "").trim();
    if (v) out[key] = v;
  }
  return Object.keys(out).length > 0 ? out : undefined;
}

/**
 * Send a lead to the CMS.
 *
 * Never throws — callers get `{ ok: false, message }` for validation problems,
 * server rejections and network failures alike, so a form only needs one
 * error branch.
 */
export async function submitLead(payload: LeadPayload): Promise<LeadResult> {
  const problem = validateLead(payload.name, payload.email, payload.phoneNo);
  if (problem) return { ok: false, message: problem };

  try {
    const res = await fetch(`${CMS_URL}/api/lead`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: payload.name.trim(),
        email: payload.email.trim(),
        phoneNo: payload.phoneNo.trim(),
        leadSource: payload.leadSource,
        formData: cleanFormData(payload.formData),
        attachmentUrl: payload.attachmentUrl ?? undefined,
        attachmentName: payload.attachmentName ?? undefined,
      }),
    });

    const json = await res.json().catch(() => null);

    if (!res.ok || !json?.success) {
      return {
        ok: false,
        message:
          json?.message ??
          "Something went wrong submitting the form. Please try again.",
      };
    }
    return { ok: true, leadId: json.leadId };
  } catch {
    return {
      ok: false,
      message:
        "We couldn't reach the server. Please check your connection and try again.",
    };
  }
}
