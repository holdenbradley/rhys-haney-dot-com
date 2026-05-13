import Link from "next/link";
import Image from "next/image";
import type { GalleryImage } from "@/lib/get-gallery-images";

interface Props {
  images: GalleryImage[];
  /** Number of images that should be marked priority (above the fold). */
  priorityCount?: number;
  /** If true, wraps each tile in a link to its category page. */
  linkToCategory?: boolean;
  /** Optional empty-state message. */
  emptyMessage?: string;
}

/**
 * Edge-to-edge square photo grid.
 * Responsive: 2 cols (mobile) → 3 (tablet) → 4 (desktop).
 * ZERO gaps. Photos butt up against each other in a collage.
 */
export default function PhotoGrid({
  images,
  priorityCount = 4,
  linkToCategory = false,
  emptyMessage = "Photos coming soon.",
}: Props) {
  if (!images.length) {
    return (
      <div className="py-32 text-center">
        <p className="font-mono-display text-[11px] text-muted">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0">
      {images.map((img, i) => {
        const tile = (
          <div className="relative aspect-square w-full overflow-hidden bg-bg">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority={i < priorityCount}
              className="object-cover"
            />
          </div>
        );

        if (linkToCategory) {
          return (
            <Link
              key={img.src}
              href={`/portfolio/${img.category}`}
              aria-label={`${img.alt} — view ${img.category}`}
              className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
            >
              {tile}
            </Link>
          );
        }

        return <div key={img.src}>{tile}</div>;
      })}
    </div>
  );
}
