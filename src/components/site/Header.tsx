import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { site } from "@/content/site";
import { logoUrl } from "@/content/images";
import { Dots } from "./Dots";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const activeIdx = site.nav.findIndex((n) => (n.to === "/" ? path === "/" : path.startsWith(n.to)));

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  return (
    <>
      <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-500", scrolled ? "bg-graphite/95 backdrop-blur-sm" : "bg-transparent")}>
        <div className="flex items-stretch">
          {/* Logo sits on its own white plate — the supplied logo has a white background */}
          <Link to="/" aria-label="D’Dezignz Interiors — home" className={cn("flex items-center bg-snow px-4 transition-all duration-500 md:px-6", scrolled ? "h-16" : "h-20 md:h-24")}>
            <img src={logoUrl} alt="D’Dezignz Interiors" className={cn("w-auto transition-all duration-500", scrolled ? "h-11" : "h-14 md:h-16")} />
          </Link>
          <nav aria-label="Primary" className="hidden flex-1 items-center justify-center gap-9 lg:flex">
            {site.nav.slice(1, 5).map((n) => (
              <Link key={n.to} to={n.to} className="link-u font-display text-sm font-medium uppercase tracking-[0.14em] text-paper/85 hover:text-paper">
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-5 pr-4 md:pr-8">
            <span className="hidden lg:inline-flex"><Dots active={activeIdx} k={path} /></span>
            <Link to="/contact" className="hidden items-center gap-2 border border-teal px-5 py-3 font-display text-xs font-semibold uppercase tracking-[0.16em] text-paper transition-colors hover:bg-teal sm:inline-flex">
              Start a project <ArrowUpRight className="size-4" />
            </Link>
            <button onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open} className="flex flex-col gap-[6px] p-2 lg:hidden">
              <span className="block h-[2px] w-8 bg-paper" /><span className="block h-[2px] w-5 self-end bg-teal" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <div
        role="dialog" aria-modal="true" aria-label="Menu" aria-hidden={!open}
        className={cn("fixed inset-0 z-[60] flex flex-col bg-graphite text-paper transition-[clip-path] duration-700 [transition-timing-function:var(--ease-arch)]", open ? "[clip-path:inset(0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]")}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <span className="label text-stone">Index / Menu</span>
          <button onClick={() => setOpen(false)} aria-label="Close menu" tabIndex={open ? 0 : -1} className="p-2"><X className="size-7" /></button>
        </div>
        <nav className="flex flex-1 flex-col justify-center gap-1 px-5">
          {site.nav.map((n, i) => (
            <Link key={n.to} to={n.to} tabIndex={open ? 0 : -1}
              className={cn("group flex items-baseline gap-4 border-b border-line-dark py-3 transition-all duration-700", open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0")}
              style={{ transitionDelay: open ? `${150 + i * 60}ms` : "0ms" }}>
              <span className="label text-teal">0{i + 1}</span>
              <span className={cn("font-display text-[clamp(2.4rem,11vw,4rem)] font-bold uppercase leading-none tracking-tight", i === activeIdx && "text-teal")}>{n.label}</span>
            </Link>
          ))}
        </nav>
        <div className="space-y-1 px-5 py-6 text-sm text-stone">
          <a href={`tel:${site.phones[0].replace(/\s/g, "")}`} tabIndex={open ? 0 : -1} className="block">{site.phones[0]}</a>
          <a href={`mailto:${site.email}`} tabIndex={open ? 0 : -1} className="block">{site.email}</a>
        </div>
      </div>
    </>
  );
}
