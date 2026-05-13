"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { CATEGORY_NAV, META_NAV, SITE } from "@/lib/constants";

interface Props {
  open: boolean;
  onClose: () => void;
}

/**
 * Full-screen overlay menu for mobile. Covers the entire viewport,
 * stacked vertical nav, large readable text, close (X) top-right.
 */
export default function MobileNav({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 md:hidden bg-bg overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      <div className="h-14 px-5 flex items-center justify-between border-b border-line">
        <span className="font-mono-display text-[13px] text-text">
          Rhys Haney
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="-mr-2 p-2 text-text hover:text-accent transition-colors"
        >
          <X size={22} strokeWidth={1.5} />
        </button>
      </div>

      <nav
        aria-label="Mobile primary"
        className="px-6 pt-10 pb-12 flex flex-col gap-5"
      >
        {CATEGORY_NAV.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="font-mono-display text-2xl text-text hover:text-accent transition-colors"
          >
            {link.label}
          </Link>
        ))}

        <div aria-hidden className="my-4 h-px bg-line" />

        {META_NAV.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="font-mono-display text-2xl text-text hover:text-accent transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="px-6 pb-10 pt-6 border-t border-line text-sm text-muted">
        <p>{SITE.location}</p>
        <a
          href={SITE.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-block text-text hover:text-accent transition-colors"
        >
          {SITE.instagramHandle}
        </a>
      </div>
    </div>
  );
}
