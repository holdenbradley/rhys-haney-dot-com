import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PhotoGrid from "@/components/gallery/PhotoGrid";
import { getCategories, getCategoryBySlug } from "@/lib/sanity-client";
import { getGalleryImages } from "@/lib/get-gallery-images";
import { getServiceSchema } from "@/lib/schema";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const cats = await getCategories();
  return cats.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "Not found" };

  return {
    title: category.title,
    description: category.description,
    openGraph: {
      title: `${category.title} · Rhys Haney Photography`,
      description: category.description,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const images = getGalleryImages(slug);
  const cover = images.find((i) => i.featured) ?? images[0];

  return (
    <>
      {/* Hero — full-bleed cover image */}
      <section
        aria-label={`${category.title} hero`}
        className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-bg"
      >
        {cover ? (
          <Image
            src={cover.src}
            alt={cover.alt || category.heroAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center border-b border-line">
            <span className="font-mono-display text-[11px] text-muted">
              Hero photo coming soon
            </span>
          </div>
        )}
      </section>

      {/* Title block */}
      <header className="px-5 md:px-8 pt-12 md:pt-16 pb-10 md:pb-14 max-w-4xl">
        <p className="font-mono-display text-[11px] text-muted">
          Portfolio · {category.title}
        </p>
        <h1 className="mt-4 font-mono-display text-3xl md:text-5xl text-text leading-tight">
          {category.title}
        </h1>
        <p className="mt-6 text-base md:text-lg text-muted max-w-2xl leading-relaxed">
          {category.description}
        </p>
      </header>

      {/* Grid */}
      <PhotoGrid
        images={images}
        priorityCount={4}
        emptyMessage="Photos coming soon — drop them into public/images/portfolio/{category}/."
      />

      {/* Footer CTA strip */}
      <section className="px-5 md:px-8 py-20 md:py-28 border-t border-line text-center">
        <p className="font-mono-display text-[11px] text-muted">
          Book a session
        </p>
        <h2 className="mt-4 font-mono-display text-2xl md:text-4xl text-text">
          Let&rsquo;s shoot.
        </h2>
        <p className="mt-5 max-w-xl mx-auto text-muted">
          Tell me the date, the spot, and what you&rsquo;re picturing.
          I respond within 24 hours.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-block font-mono-display text-[11px] text-text border-b border-text hover:text-accent hover:border-accent transition-colors pb-1"
        >
          Start a conversation →
        </Link>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getServiceSchema({
              title: category.title,
              description: category.description,
              priceFrom: category.priceFrom,
              slug: category.slug,
            })
          ),
        }}
      />
    </>
  );
}
