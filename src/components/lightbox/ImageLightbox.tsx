import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize,
  Minimize,
  Download,
  Layers,
} from "lucide-react";
import { useLightbox } from "@/context/LightboxContext";
import { cn } from "@/lib/utils";

export function ImageLightbox() {
  const {
    isOpen,
    items,
    currentIndex,
    direction,
    closeLightbox,
    next,
    prev,
    goToIndex,
  } = useLightbox();

  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const activeThumbnailRef = useRef<HTMLButtonElement>(null);

  const currentItem = items[currentIndex];

  // Reset zoom & pan when slide changes or opens
  useEffect(() => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
    setIsLoaded(false);
  }, [currentIndex, isOpen]);

  // Scroll active thumbnail into view smoothly
  useEffect(() => {
    if (activeThumbnailRef.current) {
      activeThumbnailRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [currentIndex, showThumbnails]);

  // Handle Fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  }, []);

  // Listen to fullscreen changes (e.g. user pressed Esc to exit fullscreen)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Keyboard controls
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (zoomLevel > 1) {
          setZoomLevel(1);
          setPanPosition({ x: 0, y: 0 });
        } else {
          closeLightbox();
        }
      } else if (e.key === "ArrowRight") {
        next();
      } else if (e.key === "ArrowLeft") {
        prev();
      } else if (e.key === "+" || e.key === "=") {
        setZoomLevel((z) => Math.min(z + 0.5, 3));
      } else if (e.key === "-" || e.key === "_") {
        setZoomLevel((z) => {
          const nextZ = Math.max(z - 0.5, 1);
          if (nextZ === 1) setPanPosition({ x: 0, y: 0 });
          return nextZ;
        });
      } else if (e.key === "0") {
        setZoomLevel(1);
        setPanPosition({ x: 0, y: 0 });
      } else if (e.key.toLowerCase() === "f") {
        toggleFullscreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, next, prev, closeLightbox, zoomLevel, toggleFullscreen]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && e.touches[0]) {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (zoomLevel > 1 || e.changedTouches.length !== 1 || !e.changedTouches[0]) return;
    const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
    const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y;

    if (Math.abs(deltaX) > 60 && Math.abs(deltaY) < 70) {
      if (deltaX > 0) prev();
      else next();
    } else if (deltaY > 100 && Math.abs(deltaX) < 60) {
      closeLightbox();
    }
  };

  // Pan dragging when zoomed
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      setPanPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Double click to toggle zoom
  const handleImageDoubleClick = () => {
    if (zoomLevel > 1) {
      setZoomLevel(1);
      setPanPosition({ x: 0, y: 0 });
    } else {
      setZoomLevel(1.8);
    }
  };

  // Download high res
  const handleDownload = () => {
    if (!currentItem) return;
    const link = document.createElement("a");
    link.href = currentItem.src;
    link.download = `${(currentItem.title || "ddezignz-interior").toLowerCase().replace(/\s+/g, "-")}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen || !currentItem) return null;

  return createPortal(
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery lightbox"
      className="fixed inset-0 z-[9999] flex flex-col justify-between overflow-hidden bg-graphite/95 text-paper backdrop-blur-2xl transition-all duration-500 animate-in fade-in"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Background architectural fine grid lines */}
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-20" aria-hidden />

      {/* Top Header Bar */}
      <header className="relative z-20 flex items-center justify-between border-b border-line-dark/40 bg-graphite/80 px-4 py-3.5 backdrop-blur-md md:px-8">
        <div className="flex items-center gap-4">
          <span className="label hidden text-teal font-semibold sm:inline-block">
            D’Dezignz Gallery
          </span>
          <span className="hidden h-3 w-px bg-line-dark/60 sm:inline-block" />
          <div className="flex flex-col">
            <span className="font-display text-sm font-semibold text-paper tracking-wide md:text-base">
              {currentItem.title || "Project Space"}
            </span>
            {currentItem.category && (
              <span className="label text-[0.65rem] text-teal">
                {currentItem.category}
              </span>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Zoom Controls */}
          <div className="flex items-center rounded-none border border-line-dark/40 bg-graphite/60 p-0.5">
            <button
              onClick={() => {
                setZoomLevel((z) => Math.min(z + 0.4, 3));
              }}
              title="Zoom in (+)"
              className="flex size-8 items-center justify-center text-paper/80 transition-colors hover:text-teal hover:bg-graphite cursor-pointer"
            >
              <ZoomIn className="size-4" />
            </button>
            <span className="px-2 font-mono text-[0.7rem] text-teal">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => {
                setZoomLevel((z) => {
                  const nextZ = Math.max(z - 0.4, 1);
                  if (nextZ === 1) setPanPosition({ x: 0, y: 0 });
                  return nextZ;
                });
              }}
              title="Zoom out (-)"
              className="flex size-8 items-center justify-center text-paper/80 transition-colors hover:text-teal hover:bg-graphite cursor-pointer"
            >
              <ZoomOut className="size-4" />
            </button>
            {zoomLevel > 1 && (
              <button
                onClick={() => {
                  setZoomLevel(1);
                  setPanPosition({ x: 0, y: 0 });
                }}
                title="Reset zoom (0)"
                className="flex size-8 items-center justify-center border-l border-line-dark/30 text-paper/80 transition-colors hover:text-teal hover:bg-graphite cursor-pointer"
              >
                <RotateCcw className="size-3.5" />
              </button>
            )}
          </div>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit Fullscreen (F)" : "Fullscreen (F)"}
            className="flex size-8 sm:size-9 items-center justify-center border border-line-dark/40 bg-graphite/60 text-paper/80 transition-colors hover:border-teal hover:text-teal cursor-pointer"
          >
            {isFullscreen ? <Minimize className="size-4" /> : <Maximize className="size-4" />}
          </button>

          {/* Download Original */}
          <button
            onClick={handleDownload}
            title="Download image"
            className="hidden sm:flex size-9 items-center justify-center border border-line-dark/40 bg-graphite/60 text-paper/80 transition-colors hover:border-teal hover:text-teal cursor-pointer"
          >
            <Download className="size-4" />
          </button>

          {/* Toggle Filmstrip */}
          {items.length > 1 && (
            <button
              onClick={() => setShowThumbnails((v) => !v)}
              title="Toggle thumbnail strip"
              className={cn(
                "flex size-8 sm:size-9 items-center justify-center border transition-colors cursor-pointer",
                showThumbnails
                  ? "border-teal text-teal bg-teal/10"
                  : "border-line-dark/40 bg-graphite/60 text-paper/80 hover:text-teal hover:border-teal"
              )}
            >
              <Layers className="size-4" />
            </button>
          )}

          {/* Close Lightbox */}
          <button
            onClick={closeLightbox}
            title="Close (Esc)"
            className="group ml-1 flex size-9 items-center justify-center border border-line-dark/40 bg-graphite/80 text-paper transition-all hover:bg-brick hover:border-brick hover:text-snow cursor-pointer"
          >
            <X className="size-5 transition-transform duration-300 group-hover:rotate-90" />
          </button>
        </div>
      </header>

      {/* Main Showcase Stage */}
      <main
        className="relative flex flex-1 items-center justify-center overflow-hidden p-2 sm:p-6 md:p-10 select-none"
        onMouseDown={handleMouseDown}
      >
        {/* Navigation Arrow Previous */}
        {items.length > 1 && (
          <button
            onClick={prev}
            aria-label="Previous image"
            className="group absolute left-3 md:left-6 z-20 flex size-12 md:size-14 items-center justify-center border border-line-dark/60 bg-graphite/80 text-paper backdrop-blur-md transition-all duration-300 hover:border-teal hover:bg-teal hover:text-snow cursor-pointer"
          >
            <ChevronLeft className="size-6 transition-transform duration-300 group-hover:-translate-x-1" />
          </button>
        )}

        {/* Navigation Arrow Next */}
        {items.length > 1 && (
          <button
            onClick={next}
            aria-label="Next image"
            className="group absolute right-3 md:right-6 z-20 flex size-12 md:size-14 items-center justify-center border border-line-dark/60 bg-graphite/80 text-paper backdrop-blur-md transition-all duration-300 hover:border-teal hover:bg-teal hover:text-snow cursor-pointer"
          >
            <ChevronRight className="size-6 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        )}

        {/* Active Image Container with Smooth Animation & Transitions */}
        <div
          className={cn(
            "relative flex max-h-[78vh] max-w-[92vw] items-center justify-center transition-transform duration-300 ease-out",
            zoomLevel > 1 ? (isDragging ? "cursor-grabbing" : "cursor-grab") : "cursor-zoom-in"
          )}
          style={{
            transform: `translate3d(${panPosition.x}px, ${panPosition.y}px, 0) scale(${zoomLevel})`,
          }}
          onDoubleClick={handleImageDoubleClick}
        >
          {/* Loading indicator */}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="size-8 animate-spin rounded-full border-2 border-teal border-t-transparent" />
            </div>
          )}

          <img
            key={`${currentItem.src}-${currentIndex}`}
            src={currentItem.src}
            alt={currentItem.alt || currentItem.title || "Gallery image"}
            onLoad={() => setIsLoaded(true)}
            className={cn(
              "max-h-[78vh] max-w-[92vw] object-contain shadow-2xl transition-all duration-500 will-change-transform select-none",
              isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95",
              direction === "next" && "animate-in slide-in-from-right-8 duration-500",
              direction === "prev" && "animate-in slide-in-from-left-8 duration-500"
            )}
            draggable={false}
          />
        </div>

        {/* Zoom hint overlay on first load */}
        {zoomLevel === 1 && (
          <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-line-dark/30 bg-graphite/70 px-4 py-1 text-[0.7rem] font-mono text-paper/60 backdrop-blur-xs opacity-75">
            Double-click to zoom · Swipe or use Arrow keys to navigate
          </div>
        )}
      </main>

      {/* Bottom Thumbnail Strip & Metadata Bar */}
      <footer className="relative z-20 border-t border-line-dark/40 bg-graphite/90 backdrop-blur-md">
        {/* Caption & Counter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-4 py-2 text-xs md:px-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-teal font-semibold">
              {String(currentIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
            {currentItem.caption && (
              <span className="text-paper/70 font-sans truncate max-w-[50vw]">
                {currentItem.caption}
              </span>
            )}
          </div>
          <div className="hidden md:flex items-center gap-4 text-paper/40 font-mono text-[0.68rem]">
            <span>[← / →] Navigate</span>
            <span>·</span>
            <span>[Esc] Close</span>
            <span>·</span>
            <span>[F] Fullscreen</span>
          </div>
        </div>

        {/* Thumbnail Filmstrip */}
        {showThumbnails && items.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto px-4 pb-3 pt-1 scrollbar-none md:justify-center md:px-8">
            {items.map((item, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={`${item.src}-${idx}`}
                  ref={isActive ? activeThumbnailRef : null}
                  onClick={() => goToIndex(idx)}
                  className={cn(
                    "group relative aspect-[4/3] h-14 md:h-16 shrink-0 overflow-hidden border transition-all duration-300 cursor-pointer",
                    isActive
                      ? "border-teal scale-105 shadow-md shadow-teal/20"
                      : "border-line-dark/40 opacity-50 hover:opacity-100 hover:border-paper/40"
                  )}
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  <img
                    src={item.src}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  {isActive && (
                    <div className="absolute inset-0 bg-teal/15 ring-2 ring-teal ring-inset" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </footer>
    </div>,
    document.body
  );
}
