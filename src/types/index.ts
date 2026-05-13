/**
 * Shared type definitions for the portfolio.
 */

export interface Category {
  slug: string;
  title: string;
  description: string;
  priceFrom: number;
  priceFull: number;
  heroAlt: string;
}

export interface PortfolioData {
  instagramHandle: string;
  email: string;
  location: string;
  categories: Category[];
}

export interface Testimonial {
  name: string;
  location: string;
  quote: string;
  rating: number;
  service?: string;
}

export interface ContactFormValues {
  name: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
  date?: string;
}
