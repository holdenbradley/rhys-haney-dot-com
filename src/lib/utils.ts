/**
 * Lightweight class-name joiner. No external dependency.
 * Filters falsy values so conditional classes stay clean.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Format a USD price with no decimals (since portfolio prices are round).
 */
export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents);
}

/**
 * Build an absolute URL for SEO / OG tags.
 */
export function absoluteUrl(path: string): string {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL || "https://rhyshaney.com";
  return `${base}${path.startsWith("/") ? "" : "/"}${path}`;
}

/**
 * Slugify a string for category URLs.
 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
