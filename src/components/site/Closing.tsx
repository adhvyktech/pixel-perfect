import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { DotDiamond } from "./Dots";

export function Closing() {
  return (
    <section className="relative overflow-hidden bg-snow px-5 py-24 md:px-10 md:py-40">
      <Reveal className="relative">
        <div className="mb-10 flex items-center gap-4">
          <DotDiamond />
          <span className="label text-muted-foreground">Next / Your space</span>
        </div>
        <h2 className="display-lg max-w-[14ch] text-graphite">
          Let’s create a space that <span className="serif-accent text-teal">feels like you.</span>
        </h2>
        <div className="mt-14 flex flex-col gap-8 border-t border-border pt-8 md:flex-row md:items-end md:justify-between">
          <p className="lead max-w-md text-muted-foreground">Tell us what you’re imagining. We’ll help you explore what’s possible.</p>
          <Link to="/contact" className="btn-arch self-start">
            Start a project <ArrowRight className="size-4" />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
