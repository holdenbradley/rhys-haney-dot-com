"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { CATEGORY_NAV, META_NAV } from "@/lib/constants";
import MobileNav from "./MobileNav";
import { useMobileMenu } from "@/hooks/useMobileMenu";

export default function Header() {
  const { open, toggle, close } = useMobileMenu();

  return (
    <>
      <header className="sticky top-0 inset-x-0 z-40 bg-bg border-b border-line">
        {/*
          Layout strategy:
          - Mobile (< md): 3-col grid [hamburger | centered logo | spacer]
            The spacer mirrors the hamburger's width so the logo stays optically
            centered without absolute positioning.
          - Desktop (>= md): 3-col grid [left spacer | centered logo | right nav]
            Left spacer (1fr) balances the right nav (1fr) keeping the logo
            perfectly centered. Nav lives in the right cell with `justify-end`
            so it right-aligns without ever overlapping the logo.
        */}
        <div className="h-14 lg:h-16 px-5 lg:px-8 grid grid-cols-[auto_1fr_auto] lg:grid-cols-[1fr_auto_1fr] items-center gap-3 lg:gap-6">
          {/* Left cell: hamburger (mobile) / empty spacer (desktop) */}
          <div className="flex items-center justify-start">
            <button
              type="button"
              onClick={toggle}
              aria-label="Open menu"
              aria-expanded={open}
              className="lg:hidden -ml-2 p-2 text-text hover:text-accent transition-colors"
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>
          </div>

          {/* Center cell: logo */}
          <div className="flex items-center justify-center">
            <Link
              href="/"
              aria-label="Rhys Haney — home"
              className="font-mono-display text-[13px] md:text-[15px] text-text hover:text-accent transition-colors whitespace-nowrap"
            >
              Rhys&nbsp;Haney
            </Link>
          </div>

          {/* Right cell: desktop nav / invisible spacer matching hamburger width on mobile */}
          <div className="flex items-center justify-end">
            {/* Invisible spacer (mobile only) to balance hamburger and keep logo centered */}
            <span aria-hidden className="lg:hidden inline-block w-[22px] p-2" />

            <nav
              aria-label="Primary"
              className="hidden lg:flex items-center gap-3 lg:gap-4 font-mono-display text-[10px] lg:text-[11px] text-text whitespace-nowrap"
            >
              {CATEGORY_NAV.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-accent transition-colors whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
              <span
                aria-hidden
                className="inline-block h-4 w-px bg-line mx-1 lg:mx-2 shrink-0"
              />
              {META_NAV.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-accent transition-colors whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <MobileNav open={open} onClose={close} />
    </>
  );
}
