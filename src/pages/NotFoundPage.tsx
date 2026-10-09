import { Link } from "react-router-dom";
import { DotDiamond } from "@/components/site/Dots";

export function NotFoundPage() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-graphite px-5 text-paper md:px-10">
      <div className="absolute inset-0 grid-lines" aria-hidden />
      <div className="relative max-w-3xl">
        <DotDiamond />
        <p className="label mt-8 text-teal">Error 404 — Room not found</p>
        <h1 className="display-xl mt-6">
          This space <span className="serif-accent text-teal">isn’t built</span> yet.
        </h1>
        <p className="mt-8 text-stone text-lg max-w-lg leading-relaxed">
          The page or project you requested may have moved or doesn't exist. Let's get you back to the main studio gallery.
        </p>
        <div className="mt-12 flex flex-wrap gap-6 items-center">
          <Link to="/" className="btn-arch">
            Back to home
          </Link>
          <Link to="/projects" className="btn-line text-paper">
            View portfolio
          </Link>
        </div>
      </div>
    </section>
  );
}
