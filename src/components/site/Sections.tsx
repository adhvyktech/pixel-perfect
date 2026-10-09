import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowUpRight, Plus, Minus } from "lucide-react";
import { projects, services, capabilities, imageOf, type Project } from "@/content/site";
import { Reveal, Label } from "./Reveal";
import { Dots } from "./Dots";
import { cn } from "@/lib/utils";

/* ---------- Exhibition: large alternating project canvases ---------- */
export function ProjectCanvas({ project, index }: { project: Project; index: number }) {
  const flip = index % 2 === 1;
  return (
    <Reveal as="article" className={cn("grid items-end gap-6 md:grid-cols-12 md:gap-10", flip && "md:[direction:rtl]")}>
      <Link
        to={`/projects/${project.slug}`}
        className="group relative block overflow-hidden md:col-span-8 [direction:ltr]"
        aria-label={`View ${project.title}`}
      >
        <img
          src={imageOf(project.cover)}
          alt={`Interior view of ${project.title}`}
          loading="lazy"
          width={1600}
          height={1072}
          className="aspect-[4/3] w-full object-cover transition-transform duration-[1.4s] [transition-timing-function:var(--ease-arch)] group-hover:scale-[1.04] md:aspect-[16/10]"
        />
        <div className="absolute inset-0 shade-bottom opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="absolute right-0 top-0 flex size-14 items-center justify-center bg-teal text-snow transition-transform duration-500 group-hover:rotate-45 md:size-20">
          <ArrowUpRight className="size-6 md:size-8" />
        </span>
        <span className="label absolute bottom-4 left-4 bg-graphite/85 backdrop-blur-xs px-3 py-1.5 text-paper/80 border border-line-dark/20">
          {project.category}
        </span>
      </Link>
      <div className="md:col-span-4 [direction:ltr]">
        <span className="font-display text-[clamp(4rem,10vw,8.5rem)] font-bold leading-none tracking-tighter text-transparent [-webkit-text-stroke:1px_var(--teal)]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <p className="label mt-4 text-stone">{project.category}</p>
        <h3 className="display-md mt-3">
          <Link to={`/projects/${project.slug}`} className="link-u">
            {project.title}
          </Link>
        </h3>
      </div>
    </Reveal>
  );
}

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured);
  return (
    <section id="work" className="bg-graphite px-5 py-24 text-paper md:px-10 md:py-36">
      <div className="mb-20 flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <Label className="text-teal">02 — The Work</Label>
          <h2 className="display-lg mt-6">
            Selected <span className="serif-accent text-teal">spaces</span>
          </h2>
        </div>
        <Link to="/projects" className="btn-line self-start text-paper hover:text-teal md:self-end">
          All {projects.length} projects <ArrowUpRight className="size-4" />
        </Link>
      </div>
      <div className="space-y-28 md:space-y-40">
        {featured.map((p, i) => (
          <ProjectCanvas key={p.slug} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ---------- Services: architectural index ---------- */
export function ServiceIndex({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [active, setActive] = useState(0);
  const s = services[active]!;
  return (
    <section className={cn("px-5 py-24 md:px-10 md:py-36", tone === "light" ? "bg-paper text-graphite" : "bg-graphite text-paper")}>
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Label className="text-teal">03 — Services</Label>
          <h2 className="display-lg mt-6">
            Space.<br />Function.<br />
            <span className="serif-accent text-teal">Feeling.</span>
          </h2>
          <p className="lead mt-8 max-w-sm opacity-80">
            Every decision contributes to how a space works, looks, and feels.
          </p>
          <div className="relative mt-12 hidden aspect-[4/5] overflow-hidden md:block shadow-sm border border-line-light/20">
            {services.map((x, i) => (
              <img
                key={x.slug}
                src={imageOf(x.image)}
                alt={x.title}
                loading="lazy"
                className={cn(
                  "absolute inset-0 h-full w-full object-cover transition-all duration-700 [transition-timing-function:var(--ease-arch)]",
                  i === active ? "opacity-100 [clip-path:inset(0)]" : "opacity-0 [clip-path:inset(0_0_0_100%)]"
                )}
              />
            ))}
            <div className="absolute bottom-0 left-0 bg-teal px-5 py-3 text-snow">
              <span className="label text-snow">
                {String(active + 1).padStart(2, "0")} / {s.title}
              </span>
            </div>
          </div>
        </div>
        <ol className="md:col-span-7 md:pt-20">
          {services.map((x, i) => {
            const on = i === active;
            return (
              <li key={x.slug} className="border-t border-current/15 last:border-b">
                <button
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-expanded={on}
                  className="group flex w-full items-baseline gap-5 py-6 text-left md:py-7 cursor-pointer"
                >
                  <span className={cn("label w-8 shrink-0 transition-colors", on ? "text-teal" : "opacity-50")}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">
                    <span
                      className={cn(
                        "block font-display text-[clamp(1.5rem,3.2vw,2.9rem)] font-semibold leading-[1] tracking-tight transition-transform duration-500",
                        on && "translate-x-3 text-teal"
                      )}
                    >
                      {x.title}
                    </span>
                    <span className={cn("grid transition-all duration-500", on ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                      <span className="max-w-lg overflow-hidden opacity-85 leading-relaxed text-sm md:text-base">{x.description}</span>
                    </span>
                  </span>
                  {on ? <Minus className="size-5 shrink-0 text-teal" /> : <Plus className="size-5 shrink-0 opacity-50 group-hover:opacity-100" />}
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ---------- Process: Signature architectural sequence ---------- */
const steps = [
  {
    n: "01",
    t: "Understand",
    sub: "Discovery & Space Analysis",
    d: "We understand the people, the space, everyday routines, practical requirements, and the intended feeling of the home.",
  },
  {
    n: "02",
    t: "Design",
    sub: "Spatial Planning & Materiality",
    d: "Develop a considered design direction around layout optimization, bespoke joinery, durable materials, and layered light.",
  },
  {
    n: "03",
    t: "Build",
    sub: "Execution & Craftsmanship",
    d: "Coordinate every in-house trade — carpentry, fabrication, finishes, and electrical — bringing the concept into physical form.",
  },
];

export function Process() {
  const [active, setActive] = useState(0);
  return (
    <section className="relative overflow-hidden bg-graphite-2 px-5 py-24 text-paper md:px-10 md:py-36 border-t border-line-dark">
      <div className="absolute inset-0 grid-lines opacity-40" aria-hidden />
      <div className="relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <Label className="text-teal">04 — Process</Label>
            <h2 className="display-lg mt-6 max-w-[14ch]">
              From first thought to <span className="serif-accent text-teal">final form.</span>
            </h2>
          </div>
          <div className="flex items-center gap-4 border border-line-dark/60 bg-graphite/60 px-4 py-2.5 backdrop-blur-xs">
            <Dots count={3} active={active} k={active} />
            <span className="label text-paper/80">Stage {steps[active]!.n} — {steps[active]!.t}</span>
          </div>
        </div>

        <ol className="mt-16 grid border-t border-line-dark md:grid-cols-3">
          {steps.map((s, i) => {
            const isActive = i === active;
            return (
              <li
                key={s.n}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                tabIndex={0}
                className={cn(
                  "group relative border-b border-line-dark py-10 outline-none md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0 transition-colors duration-500",
                  isActive ? "bg-graphite/40" : "hover:bg-graphite/20"
                )}
              >
                {/* Active indicator line */}
                <span
                  className={cn(
                    "absolute left-0 top-[-1px] h-[3px] bg-teal transition-all duration-700",
                    isActive ? "w-full" : "w-0"
                  )}
                />

                <div className="flex items-baseline justify-between">
                  <span
                    className={cn(
                      "font-display text-[clamp(4.5rem,8vw,7.5rem)] font-bold leading-none tracking-tighter transition-colors duration-500",
                      isActive ? "text-teal" : "text-paper/20"
                    )}
                  >
                    {s.n}
                  </span>
                  <span className="label text-stone/80 uppercase">{s.sub}</span>
                </div>

                <h3 className="mt-6 font-display text-2xl md:text-3xl font-semibold tracking-tight text-paper">{s.t}</h3>
                <p className="mt-4 max-w-sm text-paper/75 leading-relaxed text-sm md:text-base">{s.d}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ---------- Capabilities: In-house craft architectural index ---------- */
export function Capabilities() {
  return (
    <section className="bg-snow px-5 py-24 md:px-10 md:py-36 border-t border-border">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4 md:sticky md:top-28 md:self-start">
          <Label className="text-brick">06 — In-house craft</Label>
          <h2 className="display-md mt-6">
            The hands behind <span className="serif-accent text-teal">the work.</span>
          </h2>
          <p className="mt-6 max-w-sm text-muted-foreground leading-relaxed">
            Every trade is managed and executed under our singular design direction — eliminating contractor disconnects and maintaining exacting tolerances.
          </p>
          <div className="mt-8 hidden md:block border-l-2 border-teal pl-4 py-1 text-xs text-stone uppercase tracking-wider">
            10 Specialized In-house Disciplines
          </div>
        </div>

        <div className="md:col-span-8">
          <ul className="grid gap-0 sm:grid-cols-2 divide-y divide-border border-y border-border">
            {capabilities.map((c, i) => (
              <li
                key={c.title}
                className={cn(
                  "group p-6 md:p-8 transition-colors duration-300 hover:bg-paper",
                  i % 2 === 0 ? "sm:border-r sm:border-border" : ""
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="size-2 shrink-0 rounded-full bg-brick transition-all duration-300 group-hover:scale-125 group-hover:bg-teal" />
                    <span className="label text-stone/80 text-[0.65rem]">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                </div>
                <h3 className="mt-4 font-display text-xl md:text-2xl font-semibold leading-tight tracking-tight text-graphite group-hover:text-teal transition-colors">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
