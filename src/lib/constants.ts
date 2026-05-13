/**
 * Site-wide constants.
 */

export const SITE = {
  name: "Rhys Haney Photography",
  shortName: "Rhys Haney",
  description:
    "Photography in Boulder, CO. Weddings, action sports, families, graduations, headshots, team sports, and events.",
  url: "https://rhyshaney.com",
  location: "Boulder, CO",
  email: "rhys@haney.photo",
  instagramHandle: "@rhys_haney_",
  instagramUrl: "https://instagram.com/rhys_haney_",
} as const;

/**
 * Primary category nav. Ordered to match the design spec.
 * These link directly to /portfolio/<slug> pages.
 */
export const CATEGORY_NAV = [
  { href: "/portfolio/weddings", label: "Weddings" },
  { href: "/portfolio/action-sports", label: "Actions" },
  { href: "/portfolio/families", label: "Families" },
  { href: "/portfolio/graduations", label: "Graduations" },
  { href: "/portfolio/headshots", label: "Headshots" },
  { href: "/portfolio/sports", label: "Sports" },
  { href: "/portfolio/events", label: "Events" },
] as const;

/**
 * Secondary/meta nav (right side of category nav).
 */
export const META_NAV = [
  { href: "/clients", label: "Clients" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

/**
 * Combined nav order for the header and mobile menu.
 */
export const NAV_LINKS = [...CATEGORY_NAV, ...META_NAV] as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;
