import { cn } from "@/lib/utils";

/** Signature dotted marker, inspired by the logo's diamond dot field.
 *  `active` = index of the dot highlighted in teal; dots re-pop when `k` changes. */
export function Dots({ count = 5, active = -1, k, className, tone = "light" }: { count?: number; active?: number; k?: string | number; className?: string; tone?: "light" | "dark" }) {
  return (
    <span key={k} aria-hidden className={cn("inline-flex items-center gap-[5px]", className)}>
      {Array.from({ length: count }).map((_, i) => {
        const size = 7 - Math.abs(i - (count - 1) / 2) * 1.2;
        return (
          <span
            key={i}
            className={cn(
              "anim-dot rounded-full",
              i === active ? "bg-teal" : i === count - 1 ? "bg-brick" : tone === "light" ? "bg-paper/40" : "bg-graphite/30",
            )}
            style={{ width: size, height: size, animationDelay: `${i * 60}ms` }}
          />
        );
      })}
    </span>
  );
}

/** Small diamond cluster used as a section marker. */
export function DotDiamond({ className }: { className?: string }) {
  const rows = [1, 2, 3, 2, 1];
  return (
    <span aria-hidden className={cn("inline-flex flex-col items-center gap-[3px]", className)}>
      {rows.map((n, r) => (
        <span key={r} className="flex gap-[3px]">
          {Array.from({ length: n }).map((_, i) => (
            <span key={i} className={cn("size-[5px] rounded-full anim-dot", r === 2 && i === 1 ? "bg-teal" : "bg-brick")} style={{ animationDelay: `${(r + i) * 50}ms` }} />
          ))}
        </span>
      ))}
    </span>
  );
}
