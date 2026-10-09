import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { projects, imageOf } from "@/content/site";
import { Closing } from "@/components/site/Closing";
import { Reveal } from "@/components/site/Reveal";
import { DotDiamond } from "@/components/site/Dots";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const i = projects.findIndex((p) => p.slug === params.slug);
    if (i < 0) throw notFound();
    return { project: projects[i]!, next: projects[(i + 1) % projects.length]!, index: i };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.project.title} — D’Dezignz Interiors` },
          { name: "description", content: `${loaderData.project.title}, a ${loaderData.project.category.toLowerCase()} interior project by D’Dezignz Interiors.` },
          { property: "og:title", content: `${loaderData.project.title} — D’Dezignz Interiors` },
          { property: "og:description", content: `${loaderData.project.category} project by D’Dezignz Interiors.` },
        ]
      : [],
  }),
  component: ProjectDetail,
});

function ProjectDetail() {
  const { project, next, index } = Route.useLoaderData();
  return (
    <>
      <section className="relative min-h-[90svh] overflow-hidden bg-graphite text-paper">
        <img src={imageOf(project.cover)} alt={`Temporary image for ${project.title}`} className="anim-unveil absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 shade-bottom" />
        <div className="relative flex min-h-[90svh] flex-col justify-end px-5 pb-12 pt-36 md:px-10">
          <Link to="/projects" className="label mb-auto inline-flex items-center gap-2 text-paper/70 hover:text-teal"><ArrowLeft className="size-4" /> All projects</Link>
          <p className="label flex items-center gap-3 text-teal"><DotDiamond /> {String(index + 1).padStart(2, "0")} / {project.category}</p>
          <h1 className="display-lg mt-6 max-w-[14ch]"><span className="block overflow-hidden"><span className="anim-rise block">{project.title}</span></span></h1>
          <p className="label mt-6 text-paper/60">Temporary image — real project photography to follow</p>
        </div>
      </section>

      <section className="bg-paper px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-6 md:grid-cols-12">
          <Reveal className="md:col-span-8"><img src={imageOf(project.gallery[0]!)} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover" /></Reveal>
          <Reveal className="md:col-span-4 md:self-end" delay={100}><img src={imageOf(project.gallery[1]!)} alt="" loading="lazy" className="aspect-[4/5] w-full object-cover" /></Reveal>
          <Reveal className="md:col-span-6 md:col-start-4" delay={150}><img src={imageOf(project.gallery[2]!)} alt="" loading="lazy" className="aspect-[3/2] w-full object-cover" /></Reveal>
        </div>
        <p className="mx-auto mt-16 max-w-xl border-l-2 border-brick pl-5 text-muted-foreground">
          Project description, scope and photography for {project.title} are being prepared and will be added here.
        </p>
      </section>

      <Link to="/projects/$slug" params={{ slug: next.slug }} className="group block bg-graphite px-5 py-20 text-paper md:px-10 md:py-28">
        <p className="label text-teal">Next project</p>
        <p className="display-lg mt-4 flex items-center gap-6 transition-colors group-hover:text-teal">{next.title} <ArrowRight className="size-[0.6em] shrink-0 transition-transform group-hover:translate-x-4" /></p>
      </Link>
      <Closing />
    </>
  );
}
