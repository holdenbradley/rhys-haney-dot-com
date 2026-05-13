import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Clients",
  description:
    "Selected client work and case studies — Rhys Haney Photography, Boulder, CO.",
};

/**
 * Clients / case studies index — stubbed for future work.
 * When case studies are added, replace CASE_STUDIES with real data
 * and the grid will render automatically.
 */
const CASE_STUDIES: {
  slug: string;
  client: string;
  project: string;
  year: string;
  cover?: string;
}[] = [];

export default function ClientsPage() {
  return (
    <div>
      <header className="px-5 md:px-8 pt-16 md:pt-24 pb-12 md:pb-16 max-w-4xl">
        <p className="font-mono-display text-[11px] text-muted">Clients</p>
        <h1 className="mt-4 font-mono-display text-3xl md:text-5xl text-text leading-tight">
          Case Studies
        </h1>
        <p className="mt-6 text-base md:text-lg text-muted max-w-2xl leading-relaxed">
          A growing set of projects with brands, teams, and families across
          Colorado. New work added regularly.
        </p>
      </header>

      {CASE_STUDIES.length === 0 ? (
        <section className="px-5 md:px-8 py-24 md:py-32 border-t border-line">
          <div className="max-w-2xl">
            <p className="font-mono-display text-[11px] text-muted">
              In progress
            </p>
            <p className="mt-4 text-base md:text-lg text-text">
              Case studies are being written up. In the meantime, browse the
              portfolio or reach out directly.
            </p>
            <div className="mt-8 flex flex-wrap gap-6 font-mono-display text-[11px]">
              <Link
                href="/portfolio"
                className="text-text border-b border-text hover:text-accent hover:border-accent transition-colors pb-1"
              >
                See the work →
              </Link>
              <Link
                href="/contact"
                className="text-text border-b border-text hover:text-accent hover:border-accent transition-colors pb-1"
              >
                Get in touch →
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-line">
          {CASE_STUDIES.map((cs) => (
            <article
              key={cs.slug}
              className="aspect-[4/5] border-r border-b border-line p-6 md:p-8 flex flex-col justify-end bg-bg"
            >
              <p className="font-mono-display text-[10px] text-muted">
                {cs.year}
              </p>
              <h3 className="mt-2 font-mono-display text-xl text-text">
                {cs.client}
              </h3>
              <p className="mt-1 text-sm text-muted">{cs.project}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
