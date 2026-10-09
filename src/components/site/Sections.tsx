import { Link } from "@tanstack/react-router";
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
      <Link to="/projects/$slug" params={{ slug: project.slug }} className="group relative block overflow-hidden md:col-span-8 [direction:ltr]" aria-label={`View ${project.title}`}>
        <img src={imageOf(project.cover)} alt={`Placeholder interior image for ${project.title}`} loading="lazy" width={1600} height={1072}
          className="aspect-[4/3] w-full object-cover transition-transform duration-[1.4s] [transition-timing-function:var(--ease-arch)] group-hover:scale-[1.04] md:aspect-[16/10]" />
        <div className="absolute inset-0 shade-bottom opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="absolute right-0 top-0 flex size-14 items-center justify-center bg-teal text-snow transition-transform duration-500 group-hover:rotate-45 md:size-20">
          <ArrowUpRight className="size-6 md:size-8" />
        </span>
        <span className="label absolute bottom-4 left-4 bg-graphite/80 px-2 py-1 text-paper/70">Temporary image</span>
      </Link>
      <div className="md:col-span-4 [direction:ltr]">
        <span className="font-display text-[clamp(4rem,10vw,9rem)] font-bold leading-none tracking-tighter text-transparent [-webkit-text-stroke:1px_var(--teal)]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <p className="label mt-4 text-stone">{project.category}</p>
        <h3 className="display-md mt-3">
          <Link to="/projects/$slug" params={{ slug: project.slug }} className="link-u">{project.title}</Link>
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
          <h2 className="display-lg mt-6">Selected <span className="serif-accent text-teal">spaces</span></h2>
        </div>
        <Link to="/projects" className="btn-line self-start text-paper md:self-end">All {projects.length} projects <ArrowUpRight className="size-4" /></Link>
      </div>
      <div className="space-y-28 md:space-y-40">
        {featured.map((p, i) => <ProjectCanvas key={p.slug} project={p} index={i} />)}
      </div>
    </section>
  );
}

/* ---------- Services: architectural index ---------- */
export function ServiceIndex({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [active, setActive] = useState(0);
  const s = services[active];
  return (
    <section className={cn("px-5 py-24 md:px-10 md:py-36", tone === "light" ? "bg-paper text-graphite" : "bg-graphite text-paper")}>
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Label className="text-teal">03 — Services</Label>
          <h2 className="display-lg mt-6">Space.<br />Function.<br /><span className="serif-accent text-teal">Feeling.</span></h2>
          <p className="lead mt-8 max-w-sm opacity-70">Every decision contributes to how a space works, looks, and feels.</p>
          <div className="relative mt-12 hidden aspect-[4/5] overflow-hidden md:block">
            {services.map((x, i) => (
              <img key={x.slug} src={imageOf(x.image)} alt={`Temporary image illustrating ${x.title}`} loading="lazy"
                className={cn("absolute inset-0 h-full w-full object-cover transition-all duration-700 [transition-timing-function:var(--ease-arch)]", i === active ? "opacity-100 [clip-path:inset(0)]" : "opacity-0 [clip-path:inset(0_0_0_100%)]")} />
            ))}
            <div className="absolute bottom-0 left-0 bg-teal px-4 py-3 text-snow"><span className="label">{String(active + 1).padStart(2, "0")} / {s.title}</span></div>
          </div>
        </div>
        <ol className="md:col-span-7 md:pt-24">
          {services.map((x, i) => {
            const on = i === active;
            return (
              <li key={x.slug} className="border-t border-current/15 last:border-b">
                <button
                  onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)}
                  aria-expanded={on}
                  className="group flex w-full items-baseline gap-5 py-6 text-left md:py-7">
                  <span className={cn("label w-8 shrink-0 transition-colors", on ? "text-teal" : "opacity-50")}>{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1">
                    <span className={cn("block font-display text-[clamp(1.5rem,3.2vw,2.9rem)] font-semibold leading-[1] tracking-tight transition-transform duration-500", on && "translate-x-3 text-teal")}>{x.title}</span>
                    <span className={cn("grid transition-all duration-500", on ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                      <span className="max-w-lg overflow-hidden opacity-75">{x.description}</span>
                    </span>
                  </span>
                  {on ? <Minus className="size-5 shrink-0 text-teal" /> : <Plus className="size-5 shrink-0 opacity-50" />}
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ---------- Process: change of environment ---------- */
const steps = [
  { n: "01", t: "Understand", d: "Understand the people, the space, the practical requirements, and the intended experience." },
  { n: "02", t: "Design", d: "Develop a considered design direction around layout, materials, functionality, and visual character." },
  { n: "03", t: "Build", d: "Coordinate the work and bring the design into the physical space." },
];
export function Process() {
  const [active, setActive] = useState(0);
  return (
    <section className="relative overflow-hidden bg-graphite-2 px-5 py-24 text-paper md:px-10 md:py-36">
      <div className="absolute inset-0 grid-lines" aria-hidden />
      <div className="relative">
        <Label className="text-teal">04 — Process</Label>
        <h2 className="display-lg mt-6 max-w-[12ch]">From first thought to <span className="serif-accent text-teal">final form.</span></h2>
        <div className="mt-20 flex items-center gap-4"><Dots count={3} active={active} k={active} /><span className="label text-stone">Stage {steps[active].n}</span></div>
        <ol className="mt-8 grid border-t border-line-dark md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.n} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} tabIndex={0}
              className="group relative border-b border-line-dark py-10 outline-none md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0">
              <span className={cn("absolute left-0 top-[-1px] h-[2px] bg-teal transition-all duration-700", i === active ? "w-full" : "w-0")} />
              <span className={cn("font-display text-[clamp(4.5rem,9vw,8rem)] font-bold leading-none tracking-tighter transition-colors duration-500", i === active ? "text-teal" : "text-paper/15")}>{s.n}</span>
              <h3 className="mt-6 font-display text-3xl font-semibold">{s.t}</h3>
              <p className="mt-4 max-w-xs text-paper/70">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- Capabilities: typographic two-column ledger ---------- */
export function Capabilities() {
  return (
    <section className="bg-snow px-5 py-24 md:px-10 md:py-36">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4 md:sticky md:top-28 md:self-start">
          <Label className="text-brick">06 — In-house craft</Label>
          <h2 className="display-md mt-6">The hands behind <span className="serif-accent text-teal">the work.</span></h2>
          <p className="mt-6 max-w-xs text-muted-foreground">The trades our team brings to each project, coordinated under one design direction.</p>
        </div>
        <ul className="md:col-span-8 md:columns-2 md:gap-12">
          {capabilities.map((c, i) => (
            <li key={c.title} className="group mb-0 break-inside-avoid border-t border-border py-6">
              <div className="flex items-baseline gap-3">
                <span className="size-2 shrink-0 rounded-full bg-brick transition-colors group-hover:bg-teal" />
                <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight">{c.title}</h3>
              </div>
              <p className="mt-2 pl-5 text-sm text-muted-foreground">{c.note}</p>
              <span className="label sr-only">{i + 1}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
