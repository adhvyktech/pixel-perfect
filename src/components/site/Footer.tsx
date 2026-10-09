import { Link } from "react-router-dom";
import { site, services, articles } from "@/content/site";
import { logoUrl } from "@/content/images";
import { DotDiamond } from "./Dots";

export function Footer() {
  return (
    <footer className="bg-graphite text-paper border-t border-line-dark">
      <div className="grid gap-12 px-5 py-16 md:grid-cols-12 md:px-10 md:py-24">
        {/* Studio Identity & Logo */}
        <div className="md:col-span-4">
          <Link to="/" className="inline-flex bg-snow px-4 py-3 border border-line-light/20 shadow-xs transition-opacity hover:opacity-95" aria-label="D’Dezignz Interiors">
            <img src={logoUrl} alt="D’Dezignz Interiors" className="h-12 md:h-14 w-auto object-contain" loading="lazy" />
          </Link>
          <p className="mt-6 max-w-sm text-stone text-sm leading-relaxed">
            An interior design studio in Bengaluru, shaping homes and spaces around the way people live. Thoughtful spatial planning, honest materials, and precise execution.
          </p>
          <div className="mt-6 flex items-center gap-3 text-xs uppercase tracking-widest text-teal">
            <span className="size-2 rounded-full bg-teal" />
            <span>Bengaluru · Tamil Nadu</span>
          </div>
        </div>

        {/* Navigation */}
        <FooterCol title="Navigate" className="md:col-span-2">
          {site.nav.map((n) => (
            <li key={n.to}>
              <Link to={n.to} className="link-u">
                {n.label}
              </Link>
            </li>
          ))}
        </FooterCol>

        {/* Services */}
        <FooterCol title="Services" className="md:col-span-3">
          {services.slice(0, 6).map((s) => (
            <li key={s.slug}>
              <Link to="/services" className="link-u">
                {s.title}
              </Link>
            </li>
          ))}
        </FooterCol>

        {/* Contact Information */}
        <FooterCol title="Contact" className="md:col-span-3">
          <li>
            <a href={`mailto:${site.email}`} className="link-u text-teal">
              {site.email}
            </a>
          </li>
          {site.phones.map((p) => (
            <li key={p}>
              <a href={`tel:${p.replace(/\s/g, "")}`} className="link-u">
                {p}
              </a>
            </li>
          ))}
          <li className="pt-2 text-stone text-xs leading-relaxed">{site.address}</li>
        </FooterCol>

        {/* Journal Index */}
        <FooterCol title="Journal" className="md:col-span-12 md:col-start-5">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {articles.slice(0, 6).map((a) => (
              <Link key={a.slug} to={`/journal/${a.slug}`} className="link-u">
                {a.title}
              </Link>
            ))}
          </div>
        </FooterCol>
      </div>

      {/* Copyright & Signoff */}
      <div className="flex flex-col gap-4 border-t border-line-dark px-5 py-6 text-xs text-stone md:flex-row md:items-center md:justify-between md:px-10">
        <span>© {new Date().getFullYear()} D’Dezignz Interiors. All rights reserved.</span>
        <DotDiamond />
        <span className="label text-stone/80">Spatial / Form</span>
      </div>
    </footer>
  );
}

function FooterCol({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <p className="label mb-5 text-teal">{title}</p>
      <ul className="space-y-2 text-sm">{children}</ul>
    </div>
  );
}
