import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { articles, imageOf } from "@/content/site";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { Closing } from "@/components/site/Closing";

export const Route = createFileRoute("/journal/")({
  head: () => ({
    meta: [
      { title: "Journal — D’Dezignz Interiors" },
      { name: "description", content: "Notes on interior planning, Vastu, kitchens, bedrooms and home handover from D’Dezignz Interiors." },
      { property: "og:title", content: "Journal — D’Dezignz Interiors" },
      { property: "og:description", content: "Thinking about the way we live." },
    ],
  }),
  component: Journal,
});

function Journal() {
  const lead = articles[0]!; const second = articles[1]!; const rest = articles.slice(2);
  return (
    <>
      <PageHero index="07" label="Journal" title={<>Thinking about <span className="serif-accent text-teal">the way we live.</span></>} />
      <section className="bg-paper px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-8">
            <Link to="/journal/$slug" params={{ slug: lead.slug }} className="group block">
              <div className="overflow-hidden"><img src={imageOf(lead.cover)} alt="" loading="lazy" className="aspect-[16/9] w-full object-cover transition-transform duration-1000 group-hover:scale-105" /></div>
              <p className="label mt-6 text-teal">{lead.category} — Featured</p>
              <h2 className="display-lg mt-3 group-hover:text-teal">{lead.title}</h2>
            </Link>
          </Reveal>
          <Reveal className="md:col-span-4 md:self-end" delay={100}>
            <Link to="/journal/$slug" params={{ slug: second.slug }} className="group block">
              <img src={imageOf(second.cover)} alt="" loading="lazy" className="aspect-[3/4] w-full object-cover" />
              <p className="label mt-5 text-brick">{second.category}</p>
              <h2 className="display-md mt-2 group-hover:text-teal">{second.title}</h2>
            </Link>
          </Reveal>
        </div>
        <ol className="mt-24 border-t border-border">
          {rest.map((a) => (
            <li key={a.slug} className="border-b border-border">
              <Link to="/journal/$slug" params={{ slug: a.slug }} className="group grid grid-cols-[1fr_auto] items-baseline gap-4 py-6 md:grid-cols-[10rem_1fr_auto]">
                <span className="label hidden text-muted-foreground md:block">{a.category}</span>
                <span className="font-display text-[clamp(1.3rem,2.6vw,2.4rem)] font-semibold leading-tight tracking-tight transition-all duration-500 group-hover:translate-x-2 group-hover:text-teal">{a.title}</span>
                <ArrowUpRight className="size-6 text-teal" />
              </Link>
            </li>
          ))}
        </ol>
      </section>
      <Closing />
    </>
  );
}
