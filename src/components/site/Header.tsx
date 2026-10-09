import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { site } from "@/content/site";
import { logoUrl } from "@/content/images";
import { Dots } from "./Dots";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const path = location.pathname;
  const activeIdx = site.nav.findIndex((n) => (n.to === "/" ? path === "/" : path.startsWith(n.to)));

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "bg-graphite/95 backdrop-blur-md shadow-sm" : "bg-gradient-to-b from-graphite/80 via-graphite/30 to-transparent"
        )}
      >
        <div className="flex items-stretch">
          {/* Brand Plate: Intentional architectural anchor for the official D'Dezignz logo */}
          <Link
            to="/"
            aria-label="D’Dezignz Interiors — home"
            className={cn(
              "group relative flex items-center bg-snow px-4 transition-all duration-500 md:px-6",
              "border-r border-b border-line-light/20 shadow-xs hover:bg-paper",
              scrolled ? "h-16 py-2" : "h-20 py-3 md:h-24"
            )}
          >
            <img
              src={logoUrl}
              alt="D’Dezignz Interiors"
              className={cn(
                "w-auto object-contain transition-all duration-500 group-hover:scale-[1.02]",
                scrolled ? "h-10 md:h-11" : "h-12 md:h-15"
              )}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Primary" className="hidden flex-1 items-center justify-center gap-8 xl:gap-11 lg:flex">
            {site.nav.slice(1, 5).map((n) => {
              const active = path.startsWith(n.to);
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={cn(
                    "link-u font-display text-sm font-medium uppercase tracking-[0.15em] transition-colors",
                    active ? "text-teal [background-size:100%_1px]" : "text-paper/85 hover:text-paper"
                  )}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="ml-auto flex items-center gap-5 pr-4 md:pr-8">
            <span className="hidden lg:inline-flex">
              <Dots active={activeIdx} k={path} />
            </span>
            <Link
              to="/contact"
              className="hidden items-center gap-2 border border-teal px-5 py-3 font-display text-xs font-semibold uppercase tracking-[0.16em] text-paper transition-all hover:bg-teal hover:text-snow sm:inline-flex"
            >
              Start a project <ArrowUpRight className="size-4" />
            </Link>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="flex flex-col gap-[6px] p-2 lg:hidden text-paper"
            >
              <span className="block h-[2px] w-8 bg-paper" />
              <span className="block h-[2px] w-5 self-end bg-teal" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen navigation modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
        className={cn(
          "fixed inset-0 z-[60] flex flex-col bg-graphite text-paper transition-[clip-path] duration-700 [transition-timing-function:var(--ease-arch)]",
          open ? "[clip-path:inset(0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        )}
      >
        <div className="flex items-center justify-between border-b border-line-dark px-5 py-5 md:px-10">
          <Link to="/" onClick={() => setOpen(false)} className="inline-flex bg-snow p-2.5">
            <img src={logoUrl} alt="D’Dezignz Interiors" className="h-9 w-auto" />
          </Link>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            tabIndex={open ? 0 : -1}
            className="p-2 text-paper hover:text-teal transition-colors"
          >
            <X className="size-7" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col justify-center gap-1 px-5 md:px-10">
          {site.nav.map((n, i) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              className={cn(
                "group flex items-baseline gap-4 border-b border-line-dark py-3.5 transition-all duration-700",
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              )}
              style={{ transitionDelay: open ? `${150 + i * 60}ms` : "0ms" }}
            >
              <span className="label text-teal">0{i + 1}</span>
              <span
                className={cn(
                  "font-display text-[clamp(2.2rem,9vw,3.8rem)] font-bold uppercase leading-none tracking-tight transition-colors group-hover:text-teal",
                  (n.to === "/" ? path === "/" : path.startsWith(n.to)) && "text-teal"
                )}
              >
                {n.label}
              </span>
            </Link>
          ))}
        </nav>

        <div className="border-t border-line-dark px-5 py-6 md:px-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-stone">
          <div className="space-y-1">
            <a href={`tel:${site.phones[0]!.replace(/\s/g, "")}`} tabIndex={open ? 0 : -1} className="block hover:text-teal">
              {site.phones[0]}
            </a>
            <a href={`mailto:${site.email}`} tabIndex={open ? 0 : -1} className="block hover:text-teal">
              {site.email}
            </a>
          </div>
          <p className="text-xs uppercase tracking-widest text-stone/80">{site.address}</p>
        </div>
      </div>
    </>
  );
}
