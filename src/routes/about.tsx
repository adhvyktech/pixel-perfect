import { createFileRoute } from "@tanstack/react-router";
import { images } from "@/content/images";
import { PageHero } from "@/components/site/PageHero";
import { Process, Capabilities } from "@/components/site/Sections";
import { Closing } from "@/components/site/Closing";
import { Reveal, Label } from "@/components/site/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Studio — D’Dezignz Interiors" },
      { name: "description", content: "The story and design philosophy behind D’Dezignz Interiors, a Bengaluru interior design studio." },
      { property: "og:title", content: "Studio — D’Dezignz Interiors" },
      { property: "og:description", content: "The space is yours. The thinking is ours." },
    ],
  }),
  component: About,
});

const values = [
  ["Practical problem-solving", "Every room starts with how it will be used."],
  ["Attention to detail", "Junctions, finishes and proportions, considered closely."],
  ["Materials & layouts", "Chosen for how they look, last and work together."],
  ["Client satisfaction", "The measure of every project we take on."],
];

function About() {
  return (
    <>
      <PageHero index="00" label="Studio" image={images.foyer} title={<>The space is yours. <span className="serif-accent text-teal">The thinking is ours.</span></>} />
      <section className="grid gap-12 bg-paper px-5 py-24 md:grid-cols-12 md:px-10 md:py-36">
        <Reveal className="md:col-span-5">
          <img src={images.study} alt="Study and dresser corner (temporary image)" loading="lazy" className="aspect-[4/5] w-full object-cover" />
        </Reveal>
        <Reveal className="md:col-span-6 md:col-start-7" delay={120}>
          <Label className="text-brick">Origin</Label>
          <p className="mt-6 font-display text-[clamp(1.6rem,3vw,2.6rem)] font-medium leading-[1.1] tracking-tight">
            It began with a childhood aspiration: <span className="serif-accent text-teal">to create beautiful homes.</span>
          </p>
          <p className="mt-8 text-muted-foreground lead">
            That aspiration found its first project at home — designing and optimising the family’s own living spaces. Working through real constraints, everyday routines and the details that make a home comfortable shaped the way the studio works today.
          </p>
          <ul className="mt-12 border-t border-border">
            {values.map(([t, d]) => (
              <li key={t} className="grid gap-2 border-b border-border py-5 md:grid-cols-2">
                <span className="font-display text-xl font-semibold">{t}</span>
                <span className="text-muted-foreground">{d}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>
      <Process />
      <Capabilities />
      <Closing />
    </>
  );
}
