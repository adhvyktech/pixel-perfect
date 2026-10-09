import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Maximize2, Sparkles } from "lucide-react";
import { projects, imageOf } from "@/content/site";
import { Closing } from "@/components/site/Closing";
import { Reveal } from "@/components/site/Reveal";
import { DotDiamond } from "@/components/site/Dots";
import { useLightbox, type LightboxItem } from "@/context/LightboxContext";
import { GalleryImage } from "@/components/lightbox/GalleryImage";

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const index = projects.findIndex((p) => p.slug === slug);
  const { openLightbox } = useLightbox();

  if (index < 0) {
    return <Navigate to="/projects" replace />;
  }

  const project = projects[index]!;
  const next = projects[(index + 1) % projects.length]!;

  const galleryItems: LightboxItem[] = [
    {
      src: imageOf(project.cover),
      title: `${project.title} — Primary Spatial View`,
      category: project.category,
      caption: `Full spatial perspective and signature architectural language for ${project.title}.`,
    },
    {
      src: imageOf(project.gallery[0]!),
      title: `${project.title} — Main Living & Lounge`,
      category: project.category,
      caption: `Custom spatial composition, tailored circulation paths, and warm layered cove lighting.`,
    },
    {
      src: imageOf(project.gallery[1]!),
      title: `${project.title} — Bespoke Millwork & Details`,
      category: project.category,
      caption: `In-house cabinetry detailing, premium veneers, and refined hardware craftsmanship.`,
    },
    {
      src: imageOf(project.gallery[2]!),
      title: `${project.title} — Dining & Suite Perspective`,
      category: project.category,
      caption: `Harmonious spatial zoning balanced with intimate natural materials and modern acoustics.`,
    },
  ];

  return (
    <>
      <section className="relative min-h-[90svh] overflow-hidden bg-graphite text-paper">
        <div
          onClick={() => openLightbox(galleryItems, 0)}
          className="group absolute inset-0 cursor-zoom-in"
          title="Click to view full resolution photo"
        >
          <img
            src={imageOf(project.cover)}
            alt={project.title}
            className="anim-unveil absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 shade-bottom" />
          <div className="absolute right-5 top-28 z-10 hidden sm:flex items-center gap-2 border border-line-dark/40 bg-graphite/80 px-3.5 py-1.5 text-xs font-mono uppercase tracking-widest text-paper/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Maximize2 className="size-3.5 text-teal" />
            <span>Click to expand hero photo</span>
          </div>
        </div>

        <div className="relative pointer-events-none flex min-h-[90svh] flex-col justify-end px-5 pb-12 pt-36 md:px-10">
          <Link
            to="/projects"
            className="pointer-events-auto label mb-auto inline-flex items-center gap-2 text-paper/75 hover:text-teal transition-colors"
          >
            <ArrowLeft className="size-4" /> All projects
          </Link>
          <p className="label flex items-center gap-3 text-teal">
            <DotDiamond /> {String(index + 1).padStart(2, "0")} / {project.category}
          </p>
          <h1 className="display-lg mt-6 max-w-[14ch]">
            <span className="block overflow-hidden">
              <span className="anim-rise block">{project.title}</span>
            </span>
          </h1>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="label text-paper/60 uppercase tracking-widest text-[0.65rem]">
              D’Dezignz Interiors · Bengaluru
            </p>
            <button
              type="button"
              onClick={() => openLightbox(galleryItems, 0)}
              className="pointer-events-auto flex items-center gap-2 border border-teal bg-teal/20 px-4 py-2 font-display text-xs font-semibold uppercase tracking-wider text-teal backdrop-blur-md transition-all hover:bg-teal hover:text-snow cursor-pointer"
            >
              <Sparkles className="size-3.5" />
              <span>Open Gallery ({galleryItems.length} Photos)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Gallery & Scope */}
      <section className="bg-paper px-5 py-24 md:px-10 md:py-32">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="label text-teal">Architectural Portfolio</p>
            <h2 className="display-md mt-2 text-graphite">Interior Perspectives</h2>
          </div>
          <p className="text-stone text-xs font-mono uppercase tracking-wider">
            Click any image to inspect in full resolution
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-12">
          <Reveal className="md:col-span-8 border border-line-light/20 shadow-sm overflow-hidden">
            <GalleryImage
              src={imageOf(project.gallery[0]!)}
              alt={`${project.title} interior gallery`}
              gallery={galleryItems}
              index={1}
              itemTitle={`${project.title} — Main Living & Lounge`}
              category={project.category}
              badgeLabel="Expand Living View"
              className="aspect-[16/10]"
            />
          </Reveal>
          <Reveal className="md:col-span-4 md:self-end border border-line-light/20 shadow-sm overflow-hidden" delay={100}>
            <GalleryImage
              src={imageOf(project.gallery[1]!)}
              alt={`${project.title} detail view`}
              gallery={galleryItems}
              index={2}
              itemTitle={`${project.title} — Bespoke Millwork & Details`}
              category={project.category}
              badgeLabel="Expand Details"
              className="aspect-[4/5]"
            />
          </Reveal>
          <Reveal className="md:col-span-6 md:col-start-4 border border-line-light/20 shadow-sm overflow-hidden" delay={150}>
            <GalleryImage
              src={imageOf(project.gallery[2]!)}
              alt={`${project.title} living view`}
              gallery={galleryItems}
              index={3}
              itemTitle={`${project.title} — Dining & Suite Perspective`}
              category={project.category}
              badgeLabel="Expand Perspective"
              className="aspect-[3/2]"
            />
          </Reveal>
        </div>

        <div className="mx-auto mt-16 max-w-2xl border-l-2 border-teal pl-6 py-2 text-muted-foreground leading-relaxed">
          <p className="font-display text-lg text-graphite font-semibold mb-2">Project Execution</p>
          Comprehensive interior planning, custom cabinetry, material selection, and site coordination executed for {project.title}. Designed around the specific spatial habits and aesthetic preferences of the clients.
        </div>
      </section>

      {/* Next Project Teaser */}
      <Link
        to={`/projects/${next.slug}`}
        className="group block bg-graphite px-5 py-20 text-paper md:px-10 md:py-28 border-t border-line-dark transition-colors hover:bg-graphite/90"
      >
        <p className="label text-teal">Next project</p>
        <p className="display-lg mt-4 flex items-center gap-6 transition-colors group-hover:text-teal">
          {next.title}{" "}
          <ArrowRight className="size-[0.6em] shrink-0 transition-transform group-hover:translate-x-4" />
        </p>
      </Link>

      <Closing />
    </>
  );
}
