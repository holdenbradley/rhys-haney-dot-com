import Link from "next/link";
import { CATEGORY_NAV, META_NAV, SITE } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-line bg-bg">
      <div className="px-5 md:px-8 py-12 md:py-16 grid gap-10 md:grid-cols-3">
        <div>
          <p className="font-mono-display text-[13px] text-text">
            Rhys Haney
          </p>
          <p className="mt-4 text-sm text-muted max-w-xs leading-relaxed">
            Photography in {SITE.location}. Weddings, action sports, families,
            graduations, headshots, team sports, and events.
          </p>
        </div>

        <nav
          aria-label="Footer categories"
          className="flex flex-col gap-2 text-sm"
        >
          <p className="font-mono-display text-[10px] text-muted mb-2">
            Work
          </p>
          {CATEGORY_NAV.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-text hover:text-accent transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-2 text-sm">
          <p className="font-mono-display text-[10px] text-muted mb-2">
            Studio
          </p>
          {META_NAV.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-text hover:text-accent transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <a
            href={`mailto:${SITE.email}`}
            className="text-text hover:text-accent transition-colors"
          >
            {SITE.email}
          </a>
          <a
            href={SITE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text hover:text-accent transition-colors"
          >
            {SITE.instagramHandle}
          </a>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="px-5 md:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono-display text-[10px] text-muted">
          <p>© {year} Rhys Haney</p>
          <p>{SITE.location}</p>
        </div>
      </div>
    </footer>
  );
}
