import { useState, type FormEvent } from "react";
import { ArrowRight, Mail, Phone, MapPin, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { site, services } from "@/content/site";
import { logoWithPhoneUrl } from "@/content/images";
import { DotDiamond } from "@/components/site/Dots";
import { cn } from "@/lib/utils";

type Errors = Partial<Record<"name" | "email" | "phone" | "type" | "message", string>>;

type SubmittedPayload = {
  name: string;
  email: string;
  phone: string;
  type: string;
};

function validate(f: FormData): Errors {
  const e: Errors = {};
  const s = (k: string) => String(f.get(k) ?? "").trim();
  if (s("name").length < 2) e.name = "Please enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s("email"))) e.email = "Please enter a valid email address.";
  if (!/^[+\d][\d\s-]{7,}$/.test(s("phone"))) e.phone = "Please enter a valid phone number.";
  if (!s("type")) e.type = "Please choose a project type.";
  if (s("message").length < 10) e.message = "Tell us a little more about your space (at least 10 characters).";
  return e;
}

export function ContactPage() {
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<SubmittedPayload | null>(null);

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = ev.currentTarget;
    const formData = new FormData(form);

    const clientErrors = validate(formData);
    setErrors(clientErrors);
    if (Object.keys(clientErrors).length > 0) return;

    setIsSubmitting(true);
    setServerError(null);

    // Ensure access key and metadata are set
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const projectType = String(formData.get("type") ?? "").trim();

    formData.set("access_key", site.web3formsAccessKey);
    formData.set("from_name", "D’Dezignz Interiors Website");
    formData.set("subject", `New Project Enquiry: ${projectType} — ${name}`);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setSubmittedData({ name, email, phone, type: projectType });
        form.reset();
      } else {
        setServerError(
          data.message || "Failed to submit enquiry. Please reach out to us directly via WhatsApp or phone."
        );
      }
    } catch {
      setServerError(
        "Network connection issue. Please reach out to our team directly via WhatsApp or phone."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="grid min-h-screen bg-paper md:grid-cols-12">
      {/* Studio Contact Panel */}
      <div className="relative bg-graphite px-5 pb-16 pt-36 text-paper md:col-span-5 md:px-10 md:pt-48">
        <div className="absolute inset-0 grid-lines opacity-60" aria-hidden />
        <div className="relative">
          <p className="label flex items-center gap-3 text-teal">
            <DotDiamond /> Contact
          </p>
          <h1 className="display-lg mt-6">
            Start a <span className="serif-accent text-teal">project.</span>
          </h1>
          <p className="lead mt-8 max-w-sm text-paper/75 leading-relaxed">
            Tell us what you’re imagining — whether a single room, kitchen renovation, or a complete home interior. We’ll help you explore what’s possible.
          </p>

          <ul className="mt-14 space-y-6">
            <li className="flex gap-4">
              <Mail className="mt-1 size-5 text-teal shrink-0" />
              <div>
                <span className="label block text-stone mb-1 text-[0.65rem]">Email directly</span>
                <a href={`mailto:${site.email}`} className="link-u font-display text-lg md:text-xl text-paper">
                  {site.email}
                </a>
              </div>
            </li>
            <li className="flex gap-4">
              <Phone className="mt-1 size-5 text-teal shrink-0" />
              <div>
                <span className="label block text-stone mb-1 text-[0.65rem]">Direct Phone</span>
                <div className="space-y-1">
                  {site.phones.map((p) => (
                    <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="link-u block font-display text-lg md:text-xl text-paper">
                      {p}
                    </a>
                  ))}
                </div>
              </div>
            </li>
            <li className="flex gap-4">
              <MapPin className="mt-1 size-5 text-teal shrink-0" />
              <div>
                <span className="label block text-stone mb-1 text-[0.65rem]">Studio Location</span>
                <span className="text-paper/85 text-sm md:text-base leading-relaxed">{site.address}</span>
              </div>
            </li>
          </ul>

          {/* Official Hotline Card with Branded Phone Logo */}
          <div className="mt-12 inline-flex flex-col bg-snow p-5 border border-line-light/20 shadow-sm max-w-xs">
            <img
              src={logoWithPhoneUrl}
              alt="D’Dezignz Interiors — Direct Studio Line 6363738685"
              className="h-16 w-auto object-contain"
            />
            <span className="mt-2 text-[0.65rem] uppercase tracking-wider text-graphite/70 font-mono text-center">
              Official Hotline · Bengaluru Studio
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Enquiry Form */}
      <div className="px-5 py-16 md:col-span-7 md:px-16 md:pt-48 flex flex-col justify-center">
        {submitted ? (
          <div className="border border-teal/40 bg-snow p-8 md:p-12 shadow-sm max-w-xl">
            <div className="flex items-center gap-3 text-teal">
              <CheckCircle2 className="size-8 shrink-0" />
              <div>
                <h2 className="font-display text-2xl font-semibold text-graphite">Enquiry Received</h2>
                <p className="text-xs text-stone mt-0.5">Submitted directly to Devi Bala & D’Dezignz Studio</p>
              </div>
            </div>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Thank you{submittedData?.name ? `, ${submittedData.name}` : ""}. Your project enquiry for{" "}
              <strong className="text-graphite font-semibold">{submittedData?.type || "an interior project"}</strong> has been securely delivered to our team.
            </p>
            <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
              We review spatial requirements carefully and will reach out to you within 24 hours.
            </p>

            <div className="mt-8 pt-6 border-t border-border flex flex-wrap gap-4">
              <a
                href={`https://wa.me/916363738685?text=${encodeURIComponent(
                  `Hello Devi Bala / D'Dezignz team, I just submitted an enquiry on your website for ${submittedData?.type || "interior design"} (Name: ${submittedData?.name || ""}, Phone: ${submittedData?.phone || ""}).`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-arch"
              >
                Chat on WhatsApp <ArrowRight className="size-4" />
              </a>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setSubmittedData(null);
                }}
                className="btn-line text-graphite"
              >
                Send another enquiry
              </button>
            </div>
          </div>
        ) : (
          <form noValidate onSubmit={onSubmit} className="grid gap-8 md:grid-cols-2 max-w-2xl">
            {/* Web3Forms required hidden access key */}
            <input type="hidden" name="access_key" value={site.web3formsAccessKey} />
            <input type="hidden" name="from_name" value="D’Dezignz Interiors Website" />
            <input type="hidden" name="subject" value="New Interior Project Enquiry" />
            
            {/* Honeypot Spam Protection */}
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

            {serverError && (
              <div className="md:col-span-2 border border-brick/40 bg-brick/5 p-4 text-sm text-brick flex items-start gap-3">
                <AlertCircle className="size-5 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold">{serverError}</p>
                  <p className="mt-1 text-muted-foreground text-xs">
                    You can reach us immediately via WhatsApp or phone at +91 6363738685.
                  </p>
                </div>
              </div>
            )}

            <Field name="name" label="Full name" error={errors.name} autoComplete="name" />
            <Field name="email" label="Email" type="email" error={errors.email} autoComplete="email" />
            <Field name="phone" label="Phone" type="tel" error={errors.phone} autoComplete="tel" />
            <div>
              <label htmlFor="type" className="label text-muted-foreground">
                Project type
              </label>
              <select
                id="type"
                name="type"
                defaultValue=""
                aria-invalid={!!errors.type}
                aria-describedby={errors.type ? "type-err" : undefined}
                className={cn(
                  "mt-3 w-full border-0 border-b bg-transparent py-3 font-display text-lg outline-none focus:border-teal transition-colors cursor-pointer",
                  errors.type ? "border-brick" : "border-input"
                )}
              >
                <option value="" disabled>
                  Select service…
                </option>
                {services.map((s) => (
                  <option key={s.slug} value={s.title}>
                    {s.title}
                  </option>
                ))}
                <option value="Full Residence">Full Residence</option>
                <option value="Renovations">Home Renovation</option>
                <option value="Modular Kitchen & Wardrobes">Modular Kitchen & Wardrobes</option>
                <option value="Other">Other Custom Work</option>
              </select>
              {errors.type && (
                <p id="type-err" className="mt-2 text-sm text-brick">
                  {errors.type}
                </p>
              )}
            </div>

            <Field name="location" label="Project location (e.g. Sarjapur, Whitefield, HSR)" className="md:col-span-2" />

            <div className="md:col-span-2">
              <label htmlFor="message" className="label text-muted-foreground">
                Message / Space Details
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-err" : undefined}
                placeholder="Share your floor plan stage, dimensions, timeline, or key priorities…"
                className={cn(
                  "mt-3 w-full resize-none border-0 border-b bg-transparent py-3 font-display text-lg outline-none focus:border-teal transition-colors placeholder:text-muted-foreground/40",
                  errors.message ? "border-brick" : "border-input"
                )}
              />
              {errors.message && (
                <p id="message-err" className="mt-2 text-sm text-brick">
                  {errors.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-arch cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Submitting enquiry…
                  </>
                ) : (
                  <>
                    Send enquiry <ArrowRight className="size-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  type = "text",
  error,
  className,
  autoComplete,
}: {
  name: string;
  label: string;
  type?: string;
  error?: string | undefined;
  className?: string;
  autoComplete?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="label text-muted-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-err` : undefined}
        className={cn(
          "mt-3 w-full border-0 border-b bg-transparent py-3 font-display text-lg outline-none focus:border-teal transition-colors",
          error ? "border-brick" : "border-input"
        )}
      />
      {error && (
        <p id={`${name}-err`} className="mt-2 text-sm text-brick">
          {error}
        </p>
      )}
    </div>
  );
}
