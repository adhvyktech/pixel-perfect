import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import { site, services } from "@/content/site";
import { DotDiamond } from "@/components/site/Dots";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Start a Project with D’Dezignz Interiors" },
      { name: "description", content: "Tell D’Dezignz Interiors about your home or space in Bengaluru. Call, email or send an enquiry." },
      { property: "og:title", content: "Contact — D’Dezignz Interiors" },
      { property: "og:description", content: "Let’s create a space that feels like you." },
    ],
  }),
  component: Contact,
});

type Errors = Partial<Record<"name" | "email" | "phone" | "type" | "message", string>>;

function validate(f: FormData): Errors {
  const e: Errors = {};
  const s = (k: string) => String(f.get(k) ?? "").trim();
  if (s("name").length < 2) e.name = "Please enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s("email"))) e.email = "Please enter a valid email address.";
  if (!/^[+\d][\d\s-]{7,}$/.test(s("phone"))) e.phone = "Please enter a valid phone number.";
  if (!s("type")) e.type = "Please choose a project type.";
  if (s("message").length < 10) e.message = "Tell us a little more (at least 10 characters).";
  return e;
}

function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "unavailable">("idle");

  const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const e = validate(new FormData(ev.currentTarget));
    setErrors(e);
    if (Object.keys(e).length) return;
    // No form service is connected yet — be honest rather than fake success.
    setState("unavailable");
  };

  return (
    <section className="grid min-h-screen bg-paper md:grid-cols-12">
      <div className="relative bg-graphite px-5 pb-16 pt-36 text-paper md:col-span-5 md:px-10 md:pt-48">
        <div className="absolute inset-0 grid-lines opacity-60" aria-hidden />
        <div className="relative">
          <p className="label flex items-center gap-3 text-teal"><DotDiamond /> Contact</p>
          <h1 className="display-lg mt-6">Start a <span className="serif-accent text-teal">project.</span></h1>
          <p className="lead mt-8 max-w-sm text-paper/70">Tell us what you’re imagining — a single room or a whole home. We’ll help you explore what’s possible.</p>
          <ul className="mt-14 space-y-6">
            <li className="flex gap-4"><Mail className="mt-1 size-5 text-teal" /><a href={`mailto:${site.email}`} className="link-u font-display text-xl">{site.email}</a></li>
            <li className="flex gap-4"><Phone className="mt-1 size-5 text-teal" />
              <span className="space-y-1">{site.phones.map((p) => <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="link-u block font-display text-xl">{p}</a>)}</span>
            </li>
            <li className="flex gap-4"><MapPin className="mt-1 size-5 text-teal" /><span className="text-paper/80">{site.address}</span></li>
          </ul>
        </div>
      </div>

      <div className="px-5 py-16 md:col-span-7 md:px-16 md:pt-48">
        <form noValidate onSubmit={onSubmit} className="grid gap-8 md:grid-cols-2">
          <Field name="name" label="Full name" error={errors.name} autoComplete="name" />
          <Field name="email" label="Email" type="email" error={errors.email} autoComplete="email" />
          <Field name="phone" label="Phone" type="tel" error={errors.phone} autoComplete="tel" />
          <div>
            <label htmlFor="type" className="label text-muted-foreground">Project type</label>
            <select id="type" name="type" defaultValue="" aria-invalid={!!errors.type} aria-describedby={errors.type ? "type-err" : undefined}
              className={cn("mt-3 w-full border-0 border-b bg-transparent py-3 font-display text-lg outline-none focus:border-teal", errors.type ? "border-brick" : "border-input")}>
              <option value="" disabled>Select…</option>
              {services.map((s) => <option key={s.slug}>{s.title}</option>)}
              <option>Other</option>
            </select>
            {errors.type && <p id="type-err" className="mt-2 text-sm text-brick">{errors.type}</p>}
          </div>
          <Field name="location" label="Project location (optional)" className="md:col-span-2" />
          <div className="md:col-span-2">
            <label htmlFor="message" className="label text-muted-foreground">Message</label>
            <textarea id="message" name="message" rows={5} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-err" : undefined}
              className={cn("mt-3 w-full resize-none border-0 border-b bg-transparent py-3 font-display text-lg outline-none focus:border-teal", errors.message ? "border-brick" : "border-input")} />
            {errors.message && <p id="message-err" className="mt-2 text-sm text-brick">{errors.message}</p>}
          </div>
          <div className="md:col-span-2">
            <button type="submit" className="btn-arch">Send enquiry <ArrowRight className="size-4" /></button>
            <div aria-live="polite">
              {state === "unavailable" && (
                <p className="mt-6 max-w-lg border-l-2 border-brick pl-4 text-sm">
                  Online enquiries aren’t connected yet, so your message was <strong>not sent</strong>. Please email{" "}
                  <a href={`mailto:${site.email}`} className="text-teal underline">{site.email}</a> or call{" "}
                  <a href={`tel:${site.phones[0]!.replace(/\s/g, "")}`} className="text-teal underline">{site.phones[0]}</a>.
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({ name, label, type = "text", error, className, autoComplete }: { name: string; label: string; type?: string; error?: string | undefined; className?: string; autoComplete?: string }) {
  return (
    <div className={className}>
      <label htmlFor={name} className="label text-muted-foreground">{label}</label>
      <input id={name} name={name} type={type} autoComplete={autoComplete} aria-invalid={!!error} aria-describedby={error ? `${name}-err` : undefined}
        className={cn("mt-3 w-full border-0 border-b bg-transparent py-3 font-display text-lg outline-none focus:border-teal", error ? "border-brick" : "border-input")} />
      {error && <p id={`${name}-err`} className="mt-2 text-sm text-brick">{error}</p>}
    </div>
  );
}
