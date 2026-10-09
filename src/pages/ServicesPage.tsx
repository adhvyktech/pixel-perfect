import { images } from "@/content/images";
import { PageHero } from "@/components/site/PageHero";
import { ServiceIndex, Process } from "@/components/site/Sections";
import { Closing } from "@/components/site/Closing";

export function ServicesPage() {
  return (
    <>
      <PageHero
        index="03"
        label="Services"
        image={images.kitchen}
        title={
          <>
            Space. Function. <span className="serif-accent text-teal">Feeling.</span>
          </>
        }
      >
        Every decision contributes to how a space works, looks, and feels. From full home spatial transformations to bespoke joinery and lighting.
      </PageHero>
      <ServiceIndex />
      <Process />
      <Closing />
    </>
  );
}
