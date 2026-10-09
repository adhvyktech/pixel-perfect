import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { projects, imageOf } from "@/content/site";
import { Closing } from "@/components/site/Closing";
import { Reveal } from "@/components/site/Reveal";
import { DotDiamond } from "@/components/site/Dots";

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const index = projects.findIndex((p) => p.slug === slug);

  if (index < 0) {
    return <Navigate to="/projects" replace />;
  }

  const project = projects[index]!;
  const next = projects[(index + 1) % projects.length]!;

  return (
    <>
      <section className="relative min-h-[90svh] overflow-hidden bg-graphite text-paper">
        <img
          src={imageOf(project.cover)}
          alt={project.title}
          className="anim-unveil absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 shade-bottom" />
        <div className="relative flex min-h-[90svh] flex-col justify-end px-5 pb-12 pt-36 md:px-10">
          <Link
            to="/projects"
            className="label mb-auto inline-flex items-center gap-2 text-paper/75 hover:text-teal transition-colors"
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
          <p className="label mt-6 text-paper/60 uppercase tracking-widest text-[0.65rem]">
            D’Dezignz Interiors · Bengaluru
          </p>
        </div>
      </section>

      {/* Gallery & Scope */}
      <section className="bg-paper px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-6 md:grid-cols-12">
          <Reveal className="md:col-span-8 border border-line-light/20 shadow-sm overflow-hidden">
            <img
              src={imageOf(project.gallery[0]!)}
              alt={`${project.title} interior gallery`}
              loading="lazy"
              className="aspect-[16/10] w-full object-cover hover:scale-[1.02] transition-transform duration-700"
            />
          </Reveal>
          <Reveal className="md:col-span-4 md:self-end border border-line-light/20 shadow-sm overflow-hidden" delay={100}>
            <img
              src={imageOf(project.gallery[1]!)}
              alt={`${project.title} detail view`}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover hover:scale-[1.02] transition-transform duration-700"
            />
          </Reveal>
          <Reveal className="md:col-span-6 md:col-start-4 border border-line-light/20 shadow-sm overflow-hidden" delay={150}>
            <img
              src={imageOf(project.gallery[2]!)}
              alt={`${project.title} living view`}
              loading="lazy"
              className="aspect-[3/2] w-full object-cover hover:scale-[1.02] transition-transform duration-700"
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
