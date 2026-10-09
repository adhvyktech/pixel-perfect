import type { ReactNode } from "react";

export function PageHero({ index, label, title, children, image }: { index: string; label: string; title: ReactNode; children?: ReactNode; image?: string }) {
  return (
    <section className="relative overflow-hidden bg-graphite text-paper">
      {image && <img src={image} alt="" className="anim-unveil absolute inset-0 h-full w-full object-cover opacity-40" />}
      <div className="absolute inset-0 grid-lines opacity-60" aria-hidden />
      <div className="relative px-5 pb-16 pt-36 md:px-10 md:pb-24 md:pt-48">
        <p className="label anim-fade flex items-center gap-3 text-teal"><span className="text-paper/50">{index}</span>{label}</p>
        <h1 className="display-lg mt-6 max-w-[16ch]"><span className="block overflow-hidden"><span className="anim-rise block">{title}</span></span></h1>
        {children && <div className="anim-fade mt-10 max-w-xl text-paper/75 lead" style={{ animationDelay: "300ms" }}>{children}</div>}
      </div>
    </section>
  );
}
