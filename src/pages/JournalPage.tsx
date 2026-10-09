import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { articles, imageOf } from "@/content/site";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { Closing } from "@/components/site/Closing";

export function JournalPage() {
  const lead = articles[0]!;
  const second = articles[1]!;
  const rest = articles.slice(2);

  return (
    <>
      <PageHero
        index="07"
        label="Journal"
        title={
          <>
            Thinking about <span className="serif-accent text-teal">the way we live.</span>
          </>
        }
      >
        Essays and practical perspectives on residential design, kitchen workflows, Vastu principles, and material selection.
      </PageHero>

      <section className="bg-paper px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-8">
            <Link to={`/journal/${lead.slug}`} className="group block">
              <div className="overflow-hidden border border-line-light/20 shadow-sm">
                <img
                  src={imageOf(lead.cover)}
                  alt={lead.title}
                  loading="lazy"
                  className="aspect-[16/9] w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <p className="label mt-6 text-teal">{lead.category} — Featured</p>
              <h2 className="display-lg mt-3 group-hover:text-teal transition-colors text-graphite">{lead.title}</h2>
            </Link>
          </Reveal>

          <Reveal className="md:col-span-4 md:self-end" delay={100}>
            <Link to={`/journal/${second.slug}`} className="group block">
              <div className="overflow-hidden border border-line-light/20 shadow-sm">
                <img
                  src={imageOf(second.cover)}
                  alt={second.title}
                  loading="lazy"
                  className="aspect-[3/4] w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <p className="label mt-5 text-brick">{second.category}</p>
              <h2 className="display-md mt-2 group-hover:text-teal transition-colors text-graphite">{second.title}</h2>
            </Link>
          </Reveal>
        </div>

        <ol className="mt-24 border-t border-border">
          {rest.map((a) => (
            <li key={a.slug} className="border-b border-border">
              <Link
                to={`/journal/${a.slug}`}
                className="group grid grid-cols-[1fr_auto] items-baseline gap-4 py-6 md:grid-cols-[10rem_1fr_auto] transition-colors"
              >
                <span className="label hidden text-muted-foreground md:block">{a.category}</span>
                <span className="font-display text-[clamp(1.3rem,2.6vw,2.4rem)] font-semibold leading-tight tracking-tight transition-all duration-500 group-hover:translate-x-2 group-hover:text-teal text-graphite">
                  {a.title}
                </span>
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
