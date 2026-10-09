import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

export type LightboxItem = {
  src: string;
  alt?: string | undefined;
  title?: string | undefined;
  category?: string | undefined;
  caption?: string | undefined;
};

type LightboxContextType = {
  isOpen: boolean;
  items: LightboxItem[];
  currentIndex: number;
  direction: "next" | "prev" | "none";
  openLightbox: (items: LightboxItem[] | LightboxItem, index?: number) => void;
  closeLightbox: () => void;
  next: () => void;
  prev: () => void;
  goToIndex: (index: number) => void;
};

const LightboxContext = createContext<LightboxContextType | undefined>(undefined);

export function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<LightboxItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev" | "none">("none");

  const openLightbox = useCallback((images: LightboxItem[] | LightboxItem, index = 0) => {
    const list = Array.isArray(images) ? images : [images];
    if (list.length === 0) return;
    setItems(list);
    setCurrentIndex(Math.max(0, Math.min(index, list.length - 1)));
    setDirection("none");
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = "";
  }, []);

  const next = useCallback(() => {
    setDirection("next");
    setCurrentIndex((prev) => (items.length > 0 ? (prev + 1) % items.length : 0));
  }, [items.length]);

  const prev = useCallback(() => {
    setDirection("prev");
    setCurrentIndex((prev) => (items.length > 0 ? (prev - 1 + items.length) % items.length : 0));
  }, [items.length]);

  const goToIndex = useCallback((index: number) => {
    setCurrentIndex((prev) => {
      setDirection(index > prev ? "next" : index < prev ? "prev" : "none");
      return index;
    });
  }, []);

  // Preload adjacent images
  useEffect(() => {
    if (!isOpen || items.length <= 1) return;
    const nextIdx = (currentIndex + 1) % items.length;
    const prevIdx = (currentIndex - 1 + items.length) % items.length;

    const img1 = new Image();
    const nextItem = items[nextIdx];
    if (nextItem) img1.src = nextItem.src;

    const img2 = new Image();
    const prevItem = items[prevIdx];
    if (prevItem) img2.src = prevItem.src;
  }, [isOpen, currentIndex, items]);

  return (
    <LightboxContext.Provider
      value={{
        isOpen,
        items,
        currentIndex,
        direction,
        openLightbox,
        closeLightbox,
        next,
        prev,
        goToIndex,
      }}
    >
      {children}
    </LightboxContext.Provider>
  );
}

export function useLightbox() {
  const context = useContext(LightboxContext);
  if (!context) {
    throw new Error("useLightbox must be used within a LightboxProvider");
  }
  return context;
}
