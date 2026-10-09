import { images, deviBalaPortrait, deviBalaAward } from "@/content/images";
import { PageHero } from "@/components/site/PageHero";
import { Process, Capabilities } from "@/components/site/Sections";
import { Closing } from "@/components/site/Closing";
import { Reveal, Label } from "@/components/site/Reveal";

const principles = [
  {
    num: "01",
    title: "Practical problem-solving",
    description: "Every room starts with how it will actually be used — analyzing circulation paths, daily storage requirements, and functional ergonomics before aesthetic layering.",
  },
  {
    num: "02",
    title: "Attention to detail",
    description: "Junctions, millwork reveals, material transitions, and spatial proportions are considered closely so that every element feels deliberate and sound.",
  },
  {
    num: "03",
    title: "Materials & layouts",
    description: "Chosen for how they look under natural daylight, how they age over years of living, and how harmoniously textures and planes work together.",
  },
  {
    num: "04",
    title: "Client satisfaction",
    description: "The primary measure of every project we undertake. We craft spaces that reflect the homeowners’ authentic identities rather than transient design fads.",
  },
];

export function AboutPage() {
  return (
    <>
      <PageHero
        index="00"
        label="Studio"
        image={images.foyer}
        title={
          <>
            The space is yours. <span className="serif-accent text-teal">The thinking is ours.</span>
          </>
        }
      >
        A studio philosophy rooted in genuine residential insight, practical spatial planning, and in-house craftsmanship.
      </PageHero>

      {/* Designer Introduction & Four Foundational Principles */}
      <section className="bg-paper px-5 py-24 md:px-10 md:py-36">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16 items-start">
          <Reveal className="md:col-span-5 md:sticky md:top-28">
            <div className="relative overflow-hidden border border-line-light/20 shadow-md bg-stone-light">
              <img
                src={deviBalaPortrait}
                alt="Devi Bala — Founder & Principal Interior Designer of D’Dezignz Interiors"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover object-top transition-transform duration-700 hover:scale-[1.02]"
              />
              <div className="absolute bottom-0 inset-x-0 bg-graphite/95 backdrop-blur-xs p-5 text-paper border-t border-line-dark/20">
                <p className="label text-teal">Founder & Principal Designer</p>
                <p className="font-display text-lg font-medium mt-1 text-paper">Devi Bala</p>
                <p className="text-xs text-stone mt-1">D’Dezignz Interiors · Bengaluru, Karnataka</p>
              </div>
            </div>

            {/* Recognition & Keynote Callout */}
            <div className="mt-6 border border-line-light/20 bg-snow p-5 shadow-xs flex items-center gap-4">
              <img
                src={deviBalaAward}
                alt="Devi Bala industry recognition"
                loading="lazy"
                className="size-16 object-cover border border-line-light/20 shrink-0"
              />
              <div>
                <p className="label text-teal text-[0.65rem]">Track Record & Recognition</p>
                <p className="font-display text-sm font-semibold text-graphite mt-0.5">Hands-On Client Leadership</p>
                <p className="text-xs text-muted-foreground mt-0.5">Over 24+ executed residential and commercial spaces across Bengaluru & Tamil Nadu.</p>
              </div>
            </div>
          </Reveal>

          <Reveal className="md:col-span-7" delay={120}>
            <div className="max-w-2xl">
              <Label className="text-brick">Origin & Philosophy</Label>
              <h2 className="mt-6 font-display text-[clamp(1.8rem,3.4vw,2.9rem)] font-medium leading-[1.12] tracking-tight text-graphite">
                It began with a childhood aspiration:{" "}
                <span className="serif-accent text-teal font-normal">to create beautiful homes.</span>
              </h2>

              <p className="mt-8 text-muted-foreground lead leading-relaxed">
                That aspiration found its very first project at home — designing and optimizing the family’s own living spaces. Working through real everyday constraints, morning routines, tight storage demands, and the subtle nuances that make a home truly comfortable shaped the fundamental ethos of D’Dezignz.
              </p>

              <p className="mt-4 text-muted-foreground lead leading-relaxed">
                Today, every residence we undertake is approached with that same intimate care. We believe design should serve the life lived within it, eliminating visual noise and creating an atmosphere of effortless ease.
              </p>

              {/* Four Principles: Editorial List with Architectural Separators */}
              <div className="mt-16 border-t-2 border-graphite pt-6">
                <p className="label text-stone mb-6">Foundational Principles</p>
                <ol className="divide-y divide-border">
                  {principles.map((p) => (
                    <li key={p.title} className="group py-6 md:py-8 transition-colors duration-300">
                      <div className="grid gap-3 md:grid-cols-12 md:items-baseline">
                        <div className="md:col-span-5 flex items-baseline gap-3">
                          <span className="font-mono text-xs text-teal font-semibold">{p.num}</span>
                          <h3 className="font-display text-xl font-semibold text-graphite group-hover:text-teal transition-colors">
                            {p.title}
                          </h3>
                        </div>
                        <p className="md:col-span-7 text-sm md:text-base text-muted-foreground leading-relaxed">
                          {p.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Signature Process Section */}
      <Process />

      {/* 10 In-House Capabilities Section */}
      <Capabilities />

      {/* Closing CTA */}
      <Closing />
    </>
  );
}
