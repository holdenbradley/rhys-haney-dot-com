/**
 * Sanity CMS migration scaffold.
 *
 * Today the portfolio reads from `src/data/portfolio.json` + the filesystem.
 * When Rhys is ready to manage content from a CMS, install @sanity/client
 * and implement the stub below. The page-level data shape (Category type)
 * stays the same, so pages only need to swap the import.
 */

import portfolio from "@/data/portfolio.json";
import type { Category, PortfolioData } from "@/types";

const data = portfolio as PortfolioData;

export async function getCategories(): Promise<Category[]> {
  // Future:
  //   return sanityClient.fetch(`*[_type == "category"]`);
  return data.categories;
}

export async function getCategoryBySlug(
  slug: string
): Promise<Category | null> {
  // Future:
  //   return sanityClient.fetch(`*[_type == "category" && slug.current == $slug][0]`, { slug });
  return data.categories.find((c) => c.slug === slug) ?? null;
}

export async function getSiteMeta() {
  return {
    instagramHandle: data.instagramHandle,
    email: data.email,
    location: data.location,
  };
}
