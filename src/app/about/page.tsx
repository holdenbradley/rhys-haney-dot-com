import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Rhys Haney — Boulder, CO photographer specializing in weddings, action sports, families, graduations, and more.",
};

function getAboutPhotos(): string[] {
  const dir = path.join(process.cwd(), "public", "images", "about");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(webp|jpe?g|png|avif)$/i.test(f))
    .sort()
    .map((f) => `/images/about/${f}`);
}

export default function AboutPage() {
  const photos = getAboutPhotos();
  const [hero, secondary] = [photos[0], photos[1]];

  return (
    <div>
      {/* Hero image */}
      {hero ? (
        <section className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-bg">
          <Image
            src={hero}
            alt="Rhys Haney"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </section>
      ) : null}

      {/* Intro */}
      <section className="px-5 md:px-8 pt-16 md:pt-24 pb-16 max-w-3xl">
        <p className="font-mono-display text-[11px] text-muted">About</p>
        <h1 className="mt-4 font-mono-display text-3xl md:text-5xl text-text leading-tight">
          Rhys Haney
        </h1>
        <div className="mt-8 space-y-6 text-base md:text-lg text-text leading-relaxed">
          <p>
            I&rsquo;m a photographer based in {SITE.location}. I shoot weddings,
            action sports, families, graduations, headshots, team sports, and
            events — and the moments in between.
          </p>
          <p>
            I grew up in Boulder, learned to climb on the Flatirons before I
            learned to drive, and picked up my first camera in middle school.
            For me, photography has always been about catching the in-between
            moments — the look two people give each other before the shutter
            fires, the half-second of light before the sun drops behind the
            foothills.
          </p>
          <p>
            I work unhurried. I&rsquo;m bringing patience, not a stopwatch.
            Whether you&rsquo;re booking a wedding day, a session on the
            mountain, or a quick set of headshots, you&rsquo;re getting the
            same patient, story-first approach.
          </p>
        </div>
      </section>

      {/* Secondary photo */}
      {secondary ? (
        <section className="relative w-full aspect-[3/2] md:aspect-[2/1] overflow-hidden bg-bg">
          <Image
            src={secondary}
            alt="Working on location"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </section>
      ) : null}

      {/* Approach */}
      <section className="px-5 md:px-8 py-16 md:py-24 max-w-5xl">
        <p className="font-mono-display text-[11px] text-muted">Approach</p>
        <div className="mt-8 grid md:grid-cols-3 gap-10 md:gap-12">
          {APPROACH.map((step, i) => (
            <article key={step.title}>
              <p className="font-mono-display text-[10px] text-muted">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-mono-display text-base text-text">
                {step.title}
              </h3>
              <p className="mt-3 text-sm md:text-base text-muted leading-relaxed">
                {step.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Contact strip */}
      <section className="px-5 md:px-8 py-16 md:py-24 border-t border-line">
        <p className="font-mono-display text-[11px] text-muted">Get in touch</p>
        <div className="mt-6 grid md:grid-cols-3 gap-6 text-sm md:text-base">
          <a
            href={`mailto:${SITE.email}`}
            className="block text-text hover:text-accent transition-colors"
          >
            <p className="font-mono-display text-[10px] text-muted mb-2">
              Email
            </p>
            {SITE.email}
          </a>
          <a
            href={SITE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-text hover:text-accent transition-colors"
          >
            <p className="font-mono-display text-[10px] text-muted mb-2">
              Instagram
            </p>
            {SITE.instagramHandle}
          </a>
          <Link
            href="/contact"
            className="block text-text hover:text-accent transition-colors"
          >
            <p className="font-mono-display text-[10px] text-muted mb-2">
              Inquire
            </p>
            Book a session →
          </Link>
        </div>
      </section>
    </div>
  );
}

const APPROACH = [
  {
    title: "Talk first",
    body:
      "Quick call or text. Tell me about the shoot, the location you have in mind, the mood you want. I'll suggest spots and times that work best for light.",
  },
  {
    title: "The shoot",
    body:
      "Unhurried. I work in the natural pace of the day so the photos feel real, not staged.",
  },
  {
    title: "Delivery",
    body:
      "Hand-edited gallery within 2-3 weeks. High-res files and a curated set ready for print, share, or framing.",
  },
];
