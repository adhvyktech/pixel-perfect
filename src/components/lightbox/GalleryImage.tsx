import React from "react";
import { Maximize2 } from "lucide-react";
import { useLightbox, type LightboxItem } from "@/context/LightboxContext";
import { cn } from "@/lib/utils";

interface GalleryImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  gallery?: LightboxItem[];
  index?: number;
  itemTitle?: string;
  category?: string;
  caption?: string;
  wrapperClassName?: string;
  badgeLabel?: string;
}

export function GalleryImage({
  src,
  alt = "",
  className,
  wrapperClassName,
  gallery,
  index = 0,
  itemTitle,
  category,
  caption,
  badgeLabel = "View",
  onClick,
  ...props
}: GalleryImageProps) {
  const { openLightbox } = useLightbox();

  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (onClick) onClick(e);
    if (gallery && gallery.length > 0) {
      openLightbox(gallery, index);
    } else if (src) {
      openLightbox(
        {
          src,
          alt,
          title: itemTitle || alt,
          category,
          caption,
        },
        0
      );
    }
  };

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick(e as unknown as React.MouseEvent<HTMLImageElement>);
        }
      }}
      className={cn(
        "group relative cursor-zoom-in overflow-hidden select-none",
        wrapperClassName
      )}
      aria-label={`Open photo in lightbox: ${itemTitle || alt || "Gallery Image"}`}
    >
      <img
        src={src}
        alt={alt}
        className={cn(
          "w-full object-cover transition-transform duration-700 [transition-timing-function:var(--ease-arch)] group-hover:scale-[1.04]",
          className
        )}
        {...props}
      />

      {/* Subtle architectural hover vignette */}
      <div className="absolute inset-0 bg-graphite/30 opacity-0 backdrop-blur-[1px] transition-opacity duration-400 group-hover:opacity-100" />

      {/* Modern floating expand badge */}
      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 border border-line-dark/40 bg-graphite/90 px-2.5 py-1 text-[0.68rem] font-mono uppercase tracking-wider text-paper opacity-0 shadow-lg backdrop-blur-xs transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 translate-y-1">
        <Maximize2 className="size-3 text-teal" />
        <span className="font-semibold">{badgeLabel}</span>
      </div>
    </div>
  );
}
