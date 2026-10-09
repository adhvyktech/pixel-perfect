import { createFileRoute } from "@tanstack/react-router";
import { images } from "@/content/images";
import { PageHero } from "@/components/site/PageHero";
import { ServiceIndex, Process } from "@/components/site/Sections";
import { Closing } from "@/components/site/Closing";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — D’Dezignz Interiors" },
      { name: "description", content: "Residential and commercial interiors, kitchens, bedrooms, living rooms, false ceilings, foyers and renovations in Bengaluru." },
      { property: "og:title", content: "Services — D’Dezignz Interiors" },
      { property: "og:description", content: "Space. Function. Feeling." },
    ],
  }),
  component: () => (
    <>
      <PageHero index="03" label="Services" image={images.kitchen} title={<>Space. Function. <span className="serif-accent text-teal">Feeling.</span></>}>
        Every decision contributes to how a space works, looks, and feels.
      </PageHero>
      <ServiceIndex />
      <Process />
      <Closing />
    </>
  ),
});
