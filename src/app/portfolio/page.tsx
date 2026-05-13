import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getCategories } from "@/lib/sanity-client";
import { getGalleryImages, type GalleryImage } from "@/lib/get-gallery-images";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Browse Rhys Haney's photography portfolio — weddings, action sports, families, graduations, headshots, team sports, and events in Boulder, CO.",
};

export default async function PortfolioIndex() {
  const categories = await getCategories();

  const covers: Record<string, GalleryImage | undefined> = {};
  for (const c of categories) {
    covers[c.slug] = getGalleryImages(c.slug)[0];
  }

  return (
    <div>
      <header className="px-5 md:px-8 pt-16 md:pt-24 pb-12 md:pb-16">
        <p className="font-mono-display text-[11px] text-muted">
          Portfolio
        </p>
        <h1 className="mt-4 font-mono-display text-3xl md:text-5xl text-text leading-tight">
          Selected Work
        </h1>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0">
        {categories.map((c) => {
          const cover = covers[c.slug];
          return (
            <Link
              key={c.slug}
              href={`/portfolio/${c.slug}`}
              className="group relative block aspect-square overflow-hidden bg-bg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
            >
              {cover ? (
                <Image
                  src={cover.src}
                  alt={cover.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center bg-bg border border-line">
                  <span className="font-mono-display text-[10px] text-muted">
                    Coming soon
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
              <span className="absolute inset-x-0 bottom-0 p-4 md:p-5 font-mono-display text-[11px] md:text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
                {c.title}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
