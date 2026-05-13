import fs from "fs";
import path from "path";

/**
 * Auto-discovery for portfolio photos. Reads the file tree under
 * public/images/portfolio/<category>/ at request time (server-side only)
 * so Rhys can drag-and-drop new photos without touching code.
 *
 * Featured photos live in any subfolder named exactly `_featured`
 * and are sorted to the top.
 */

export interface GalleryImage {
  src: string;
  alt: string;
  category: string;
  subcategory: string;
  featured: boolean;
  filename: string;
  width?: number;
  height?: number;
}

const SUPPORTED = /\.(webp|jpe?g|png|avif)$/i;
const IGNORE = new Set([".DS_Store", "README.md", ".gitkeep"]);

export function getGalleryImages(category: string): GalleryImage[] {
  const categoryPath = path.join(
    process.cwd(),
    "public",
    "images",
    "portfolio",
    category
  );

  if (!fs.existsSync(categoryPath)) return [];

  const out: GalleryImage[] = [];

  function walk(dir: string, subcategory: string, featured: boolean) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (IGNORE.has(entry.name)) continue;
      const full = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        const isFeatured = entry.name === "_featured";
        walk(
          full,
          isFeatured ? subcategory : entry.name,
          featured || isFeatured
        );
        continue;
      }

      if (!SUPPORTED.test(entry.name)) continue;

      const rel = path.relative(
        path.join(process.cwd(), "public"),
        full
      );

      out.push({
        src: "/" + rel.replace(/\\/g, "/"),
        alt: generateAlt(entry.name, category),
        category,
        subcategory: subcategory || category,
        featured,
        filename: entry.name,
      });
    }
  }

  walk(categoryPath, "", false);

  // Featured first, then by filename (which encodes a numeric suffix).
  return out.sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return a.filename.localeCompare(b.filename);
  });
}

/**
 * Get the featured photos for the homepage. Pulls the top N featured
 * images across all categories.
 */
export function getHomepageFeatured(limit = 9): GalleryImage[] {
  const portfolioRoot = path.join(
    process.cwd(),
    "public",
    "images",
    "portfolio"
  );
  if (!fs.existsSync(portfolioRoot)) return [];

  const categories = fs
    .readdirSync(portfolioRoot, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const all: GalleryImage[] = [];
  for (const cat of categories) {
    const imgs = getGalleryImages(cat).filter((i) => i.featured);
    all.push(...imgs);
  }
  return all.slice(0, limit);
}

/**
 * Get every portfolio photo across every category. Featured images
 * float to the top so the homepage opens with the strongest work.
 */
export function getAllGalleryImages(): GalleryImage[] {
  const portfolioRoot = path.join(
    process.cwd(),
    "public",
    "images",
    "portfolio"
  );
  if (!fs.existsSync(portfolioRoot)) return [];

  const categories = fs
    .readdirSync(portfolioRoot, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const all: GalleryImage[] = [];
  for (const cat of categories) {
    all.push(...getGalleryImages(cat));
  }

  // Featured first, then by category, then by filename.
  return all.sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    if (a.category !== b.category) return a.category.localeCompare(b.category);
    return a.filename.localeCompare(b.filename);
  });
}

/**
 * Read images dropped in public/images/hero/ for the cinematic homepage hero.
 */
export function getHeroImages(): GalleryImage[] {
  const heroPath = path.join(process.cwd(), "public", "images", "hero");
  if (!fs.existsSync(heroPath)) return [];

  return fs
    .readdirSync(heroPath, { withFileTypes: true })
    .filter((e) => e.isFile() && !IGNORE.has(e.name) && SUPPORTED.test(e.name))
    .map((e) => ({
      src: `/images/hero/${e.name}`,
      alt: generateAlt(e.name, "hero"),
      category: "hero",
      subcategory: "hero",
      featured: true,
      filename: e.name,
    }))
    .sort((a, b) => a.filename.localeCompare(b.filename));
}

function generateAlt(filename: string, category: string): string {
  const base = filename
    .replace(/\.[^.]+$/, "")
    .replace(/-?\d+$/, "")
    .replace(/[-_]+/g, " ")
    .trim();

  if (!base) return `${category} photo`;
  return base
    .split(" ")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
