/**
 * JSON-LD structured data builders.
 * Inject via a <script type="application/ld+json"> in each page layout.
 */
import { SITE } from "./constants";

export function getPhotographerSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Photograph",
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    creator: {
      "@type": "Person",
      name: "Rhys Haney",
      jobTitle: "Photographer",
      sameAs: [SITE.instagramUrl],
    },
  };
}

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE.url}#business`,
    name: SITE.name,
    image: `${SITE.url}/og-image.jpg`,
    description: SITE.description,
    url: SITE.url,
    email: SITE.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Boulder",
      addressRegion: "CO",
      addressCountry: "US",
    },
    sameAs: [SITE.instagramUrl],
    geo: {
      "@type": "GeoCoordinates",
      latitude: 40.0150,
      longitude: -105.2705,
    },
    areaServed: {
      "@type": "Place",
      name: "Boulder, CO and surrounding Front Range",
    },
  };
}

export function getServiceSchema(opts: {
  title: string;
  description: string;
  priceFrom: number;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: opts.title,
    description: opts.description,
    provider: {
      "@type": "Person",
      name: "Rhys Haney",
    },
    areaServed: "Boulder, CO",
    url: `${SITE.url}/portfolio/${opts.slug}`,
    offers: {
      "@type": "Offer",
      price: opts.priceFrom,
      priceCurrency: "USD",
    },
  };
}
