import type { Metadata } from "next";
import ContactForm from "@/components/forms/ContactForm";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Rhys Haney Photography in Boulder, CO. Book weddings, action sports, families, graduations, headshots, sports, and events.",
};

export default function ContactPage() {
  return (
    <div className="px-5 md:px-8 pt-16 md:pt-24 pb-24 max-w-3xl">
      <p className="font-mono-display text-[11px] text-muted">Contact</p>
      <h1 className="mt-4 font-mono-display text-3xl md:text-5xl text-text leading-tight">
        Start a conversation
      </h1>
      <p className="mt-6 text-base md:text-lg text-muted max-w-xl">
        Tell me about the shoot. The more I know about the moment
        you&rsquo;re trying to capture, the better I can plan. I respond
        within 24 hours.
      </p>

      <div className="mt-10 md:mt-14">
        <ContactForm />
      </div>

      <div className="mt-16 pt-10 border-t border-line grid sm:grid-cols-3 gap-6 text-sm">
        <div>
          <p className="font-mono-display text-[10px] text-muted mb-2">
            Email
          </p>
          <a
            href={`mailto:${SITE.email}`}
            className="text-text hover:text-accent transition-colors"
          >
            {SITE.email}
          </a>
        </div>
        <div>
          <p className="font-mono-display text-[10px] text-muted mb-2">
            Instagram
          </p>
          <a
            href={SITE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text hover:text-accent transition-colors"
          >
            {SITE.instagramHandle}
          </a>
        </div>
        <div>
          <p className="font-mono-display text-[10px] text-muted mb-2">
            Based in
          </p>
          <p className="text-text">{SITE.location}</p>
        </div>
      </div>
    </div>
  );
}
