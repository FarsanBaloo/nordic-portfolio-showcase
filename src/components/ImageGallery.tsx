import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { ImageFrame } from "./ui-bits";
import type { ImageSlot } from "../content/projects";

/** Project images as a grid that opens into a stepping lightbox.
 *  Slots without a src stay as the dashed placeholder and are not clickable. */
export function ImageGallery({
  slots,
  className = "mt-6 grid gap-6 sm:grid-cols-2",
}: {
  slots: readonly ImageSlot[];
  className?: string;
}) {
  const viewable = slots.filter((slot) => slot.src);
  const [openAt, setOpenAt] = useState<number | null>(null);
  const isOpen = openAt !== null;
  // Indexed explicitly rather than through `isOpen`, so the narrowing does not
  // depend on aliased-condition inference under noUncheckedIndexedAccess.
  const current = openAt === null ? undefined : viewable[openAt];

  const step = useCallback(
    (delta: number) =>
      setOpenAt((at) => (at === null ? at : (at + delta + viewable.length) % viewable.length)),
    [viewable.length],
  );

  // Radix owns Escape and the focus trap; only the arrows are ours to add.
  useEffect(() => {
    if (!isOpen || viewable.length < 2) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, step, viewable.length]);

  return (
    <>
      <div className={className}>
        {slots.map((slot) => {
          const index = viewable.indexOf(slot);
          return (
            <ImageFrame
              key={slot.caption}
              caption={slot.caption}
              aspect={slot.aspect}
              note={slot.note}
              src={slot.src}
              alt={slot.alt}
              {...(index >= 0 ? { onOpen: () => setOpenAt(index) } : {})}
            />
          );
        })}
      </div>

      <Dialog open={isOpen} onOpenChange={(next) => !next && setOpenAt(null)}>
        <DialogContent className="max-w-[96vw] border-0 bg-transparent p-0 shadow-none sm:max-w-[92vw]">
          {current ? (
            <>
              <DialogTitle className="sr-only">{current.caption}</DialogTitle>
              <figure className="flex flex-col items-center gap-4">
                <img
                  src={current.src}
                  alt={current.alt ?? current.caption}
                  className="max-h-[80vh] w-auto max-w-full rounded-lg object-contain shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]"
                />
                <figcaption className="max-w-2xl px-4 text-center text-sm text-white/80">
                  {current.caption}
                  {viewable.length > 1 ? (
                    <span className="mt-1 block font-mono text-[11px] tracking-[0.16em] text-white/45">
                      {(openAt ?? 0) + 1} / {viewable.length}
                    </span>
                  ) : null}
                </figcaption>
              </figure>

              {viewable.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="Previous image"
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/45 p-2.5 text-white/80 backdrop-blur transition hover:bg-black/70 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-teal sm:left-4"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Next image"
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/45 p-2.5 text-white/80 backdrop-blur transition hover:bg-black/70 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-teal sm:right-4"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              ) : null}
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
