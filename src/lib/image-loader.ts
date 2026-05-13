/**
 * Custom Next.js Image loader. Wired in next.config.ts.
 * Returns the original path; Next still optimizes / serves modern formats
 * via the built-in image optimizer. This is a placeholder for when Rhys
 * migrates to a CDN (Cloudinary, imgix) — swap implementation here.
 */
export default function imageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  const q = quality ?? 80;
  // Locally-hosted images: let Next.js handle resizing.
  if (src.startsWith("/")) return src;

  // Future: route through CDN.
  // Example: return `https://res.cloudinary.com/<cloud>/image/upload/w_${width},q_${q}/${src}`;
  return `${src}?w=${width}&q=${q}`;
}
