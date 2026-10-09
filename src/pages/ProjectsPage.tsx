import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { ArrowUpRight, Maximize2 } from "lucide-react";
import { categories, projects, imageOf, type Project } from "@/content/site";
import { PageHero } from "@/components/site/PageHero";
import { ProjectCanvas } from "@/components/site/Sections";
import { Dots } from "@/components/site/Dots";
import { Closing } from "@/components/site/Closing";
import { cn } from "@/lib/utils";
import { useLightbox, type LightboxItem } from "@/context/LightboxContext";

export function ProjectsPage() {
  const { openLightbox } = useLightbox();
  const [cat, setCat] = useState<string>("All Projects");
  const list = useMemo(
    () => (cat === "All Projects" ? projects : projects.filter((p) => p.category === cat)),
    [cat]
  );
  const [lead, ...rest] = list;
  const idx = categories.indexOf(cat as (typeof categories)[number]);

  return (
    <>
      <PageHero
        index="02"
        label="Projects"
        title={
          <>
            The <span className="serif-accent text-teal">exhibition.</span>
          </>
        }
      >
        A curated portfolio of residential and interior transformation projects across Bengaluru and South India.
      </PageHero>

      <section className="bg-graphite px-5 pb-28 text-paper md:px-10">
        {/* Sticky Architectural Category Filter Bar */}
        <div
          className="sticky top-16 z-30 -mx-5 flex items-center gap-6 overflow-x-auto border-y border-line-dark bg-graphite/95 backdrop-blur-md px-5 py-4 md:-mx-10 md:px-10"
          role="toolbar"
          aria-label="Filter projects"
        >
          <Dots count={5} active={idx % 5} k={cat} />
          {categories.map((c) => {
            const count = c === "All Projects" ? projects.length : projects.filter((p) => p.category === c).length;
            return (
              <button
                key={c}
                onClick={() => setCat(c)}
                aria-pressed={cat === c}
                className={cn(
                  "shrink-0 font-display text-sm uppercase tracking-[0.12em] transition-colors cursor-pointer",
                  cat === c ? "text-teal font-semibold" : "text-paper/60 hover:text-paper"
                )}
              >
                {c}
                <sup className="ml-1 font-mono text-[0.65rem] opacity-70">{count}</sup>
              </button>
            );
          })}
        </div>

        {!lead ? (
          <div className="py-32 text-center md:text-left">
            <p className="display-md max-w-[18ch]">
              No <span className="serif-accent text-teal">{cat.toLowerCase()}</span> projects published yet.
            </p>
            <p className="mt-6 text-stone">New projects in this category are currently being documented and will appear here soon.</p>
          </div>
        ) : (
          <>
            <div className="pt-20">
              <ProjectCanvas project={lead} index={0} />
            </div>

            <ol className="mt-28 border-t border-line-dark">
              {rest.map((p, i) => {
                const galleryItems: LightboxItem[] = [
                  {
                    src: imageOf(p.cover),
                    title: `${p.title} — Primary Spatial View`,
                    category: p.category,
                    caption: `Full spatial perspective of ${p.title}.`,
                  },
                  ...p.gallery.map((k, idx) => ({
                    src: imageOf(k),
                    title: `${p.title} — View ${idx + 2}`,
                    category: p.category,
                    caption: `Interior architectural photography for ${p.title}.`,
                  })),
                ];

                return (
                  <li key={p.slug} className="border-b border-line-dark">
                    <div className="group grid grid-cols-[3rem_1fr_auto] items-center gap-4 py-6 md:grid-cols-[5rem_1fr_12rem_8rem_3rem] md:py-8 transition-colors">
                      <span className="label text-stone">{String(i + 2).padStart(2, "0")}</span>
                      <Link
                        to={`/projects/${p.slug}`}
                        className="font-display text-[clamp(1.4rem,3.4vw,3rem)] font-semibold leading-none tracking-tight transition-all duration-500 group-hover:translate-x-3 group-hover:text-teal"
                      >
                        {p.title}
                      </Link>
                      <span className="label hidden text-stone md:block">{p.category}</span>
                      <button
                        type="button"
                        onClick={() => openLightbox(galleryItems, 0)}
                        className="hidden overflow-hidden md:block border border-line-dark/20 relative group/thumb cursor-pointer text-left"
                        title={`Quick view ${p.title} gallery (${galleryItems.length} photos)`}
                      >
                        <img
                          src={imageOf(p.cover)}
                          alt=""
                          loading="lazy"
                          className="aspect-[4/3] w-full object-cover opacity-0 transition-all duration-500 [clip-path:inset(0_100%_0_0)] group-hover:opacity-100 group-hover:[clip-path:inset(0)] group-focus-visible:opacity-100 group-focus-visible:[clip-path:inset(0)]"
                        />
                        <div className="absolute inset-0 bg-graphite/40 opacity-0 group-hover/thumb:opacity-100 flex items-center justify-center transition-opacity">
                          <Maximize2 className="size-4 text-teal" />
                        </div>
                      </button>
                      <Link to={`/projects/${p.slug}`} aria-label={`View ${p.title}`}>
                        <ArrowUpRight className="size-6 text-teal transition-transform group-hover:rotate-45" />
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ol>
          </>
        )}
      </section>

      <Closing />
    </>
  );
}
