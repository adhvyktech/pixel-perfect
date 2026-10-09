import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { images, deviBalaPortrait } from "@/content/images";
import { articles, projects, imageOf } from "@/content/site";
import { FeaturedProjects, ServiceIndex, Process, Capabilities } from "@/components/site/Sections";
import { Closing } from "@/components/site/Closing";
import { Reveal, Label } from "@/components/site/Reveal";
import { DotDiamond } from "@/components/site/Dots";

export function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <FeaturedProjects />
      <ServiceIndex />
      <Process />
      <Studio />
      <Capabilities />
      <Journal />
      <Closing />
    </>
  );
}

function Hero() {
  const lines = ["We design", "how you", "feel."];
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-graphite text-paper">
      <img
        src={images.hero}
        alt="Contemporary living room with bespoke wall paneling and warm cove lighting"
        width={1920}
        height={1088}
        className="anim-unveil absolute inset-0 h-full w-full object-cover object-[70%_center]"
      />
      <div className="absolute inset-0 shade-hero" />
      <div className="absolute inset-0 grid-lines opacity-50" aria-hidden />

      <div className="relative flex min-h-[100svh] flex-col justify-end px-5 pb-10 pt-32 md:px-10 md:pb-14">
        <p className="label anim-fade flex items-center gap-3 text-teal" style={{ animationDelay: "200ms" }}>
          <DotDiamond /> Spatial / Form — Interior Design Studio, Bengaluru
        </p>
        <h1 className="display-xl mt-6">
          {lines.map((l, i) => (
            <span key={l} className="block overflow-hidden pb-[0.04em]">
              <span className="anim-rise block" style={{ animationDelay: `${250 + i * 120}ms` }}>
                {i === 2 ? (
                  <>
                    <span className="serif-accent text-teal">feel</span>.
                  </>
                ) : (
                  l
                )}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-10 grid gap-8 border-t border-line-dark pt-8 md:grid-cols-12 md:items-end">
          <div className="anim-fade md:col-span-5" style={{ animationDelay: "700ms" }}>
            <p className="font-display text-xl font-medium md:text-2xl">Interiors shaped around the way you live.</p>
            <p className="mt-3 max-w-md text-paper/75 leading-relaxed">
              Thoughtful spatial planning. Distinctive materials. Spaces that feel unmistakably yours.
            </p>
          </div>
          <div className="anim-fade flex flex-wrap items-center gap-6 md:col-span-4" style={{ animationDelay: "800ms" }}>
            <a href="#work" className="btn-arch">
              Explore the work <ArrowRight className="size-4" />
            </a>
            <Link to="/contact" className="btn-line text-paper">
              Start a project
            </Link>
          </div>
          <div className="anim-fade hidden items-end justify-end gap-6 md:col-span-3 md:flex" style={{ animationDelay: "900ms" }}>
            <div className="text-right">
              <p className="label text-stone">Collection</p>
              <p className="font-display text-lg">{String(projects.length).padStart(2, "0")} projects</p>
            </div>
            <a href="#manifesto" aria-label="Scroll to continue" className="flex flex-col items-center gap-2">
              <span className="relative h-14 w-px bg-paper/20">
                <span className="anim-cue absolute inset-0 bg-teal" />
              </span>
              <ArrowDown className="size-4 text-teal" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section id="manifesto" className="bg-paper px-5 py-24 md:px-10 md:py-40">
      <Reveal className="grid gap-10 md:grid-cols-12">
        <Label className="text-brick md:col-span-3">01 — Belief</Label>
        <div className="md:col-span-9">
          <p className="font-display text-[clamp(2rem,5.6vw,5.6rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-graphite">
            Interior is not a luxury. <span className="serif-accent text-teal">It is a need.</span>
          </p>
          <p className="lead mt-10 max-w-xl text-muted-foreground leading-relaxed">
            The rooms we live in shape how we rest, gather, and work. We plan them with discipline — layout first, then durable materiality, natural light, and quiet detail.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

function Studio() {
  return (
    <section className="grid bg-paper md:grid-cols-12 border-t border-border">
      <div className="relative min-h-[60vh] md:col-span-6 overflow-hidden bg-stone-light">
        <img
          src={deviBalaPortrait}
          alt="Devi Bala — Founder & Principal Designer of D’Dezignz Interiors"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 hover:scale-[1.02]"
        />
        <div className="absolute bottom-0 inset-x-0 bg-graphite/90 backdrop-blur-xs p-5 md:p-6 text-paper border-t border-line-dark/20">
          <p className="label text-teal">Founder & Principal Designer</p>
          <p className="font-display text-lg text-paper mt-0.5">Devi Bala</p>
        </div>
      </div>
      <Reveal className="flex flex-col justify-center px-5 py-20 md:col-span-6 md:px-16 md:py-32">
        <Label className="text-teal">05 — Studio</Label>
        <h2 className="display-md mt-6 uppercase text-graphite">
          The space is yours. <span className="serif-accent normal-case text-teal">The thinking is ours.</span>
        </h2>
        <p className="mt-8 max-w-lg text-muted-foreground leading-relaxed">
          Our founder grew up aspiring to create beautiful homes — an interest that took shape while designing and optimizing the family’s own home. That authentic experience still guides the studio: practical problem-solving, close attention to detail, careful choice of materials and layouts, and an uncompromising commitment to client satisfaction.
        </p>
        <Link to="/about" className="btn-line mt-8 self-start text-graphite">
          About the studio <ArrowUpRight className="size-4" />
        </Link>
      </Reveal>
    </section>
  );
}

function Journal() {
  const lead = articles[0]!;
  const rest = articles.slice(1);
  return (
    <section className="bg-graphite px-5 py-24 text-paper md:px-10 md:py-36 border-t border-line-dark">
      <Label className="text-teal">07 — Journal</Label>
      <h2 className="display-lg mt-6 max-w-[14ch]">
        Thinking about <span className="serif-accent text-teal">the way we live.</span>
      </h2>
      <div className="mt-16 grid gap-12 md:grid-cols-12">
        <Link to={`/journal/${lead.slug}`} className="group md:col-span-7 block">
          <div className="overflow-hidden border border-line-dark/20">
            <img
              src={imageOf(lead.cover)}
              alt={lead.title}
              loading="lazy"
              className="aspect-[16/10] w-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          </div>
          <p className="label mt-6 text-teal">{lead.category} — Featured</p>
          <h3 className="display-md mt-3 transition-colors group-hover:text-teal">{lead.title}</h3>
        </Link>
        <ol className="md:col-span-5">
          {rest.slice(0, 5).map((a, i) => (
            <li key={a.slug} className="border-t border-line-dark">
              <Link to={`/journal/${a.slug}`} className="group flex items-baseline gap-4 py-5">
                <span className="label text-stone">{String(i + 2).padStart(2, "0")}</span>
                <span className="flex-1 font-display text-xl font-medium transition-colors group-hover:text-teal md:text-2xl">
                  {a.title}
                </span>
                <ArrowUpRight className="size-5 text-teal transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </li>
          ))}
          <li className="border-t border-line-dark pt-6">
            <Link to="/journal" className="btn-line text-paper">
              All {articles.length} articles <ArrowUpRight className="size-4" />
            </Link>
          </li>
        </ol>
      </div>
    </section>
  );
}
