"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import portfolio from "@/data/portfolio.json";
import type { PortfolioData } from "@/types";

const data = portfolio as PortfolioData;

const INPUT =
  "w-full px-0 py-3 bg-transparent border-0 border-b border-line text-text placeholder:text-muted text-base focus:outline-none focus:border-accent transition-colors";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.email("Please enter a valid email"),
  phone: z.string().optional(),
  service: z.string().min(1, "Please choose a service"),
  date: z.string().optional(),
  message: z.string().min(10, "Tell me a bit more (at least 10 characters)"),
});

type FormValues = z.infer<typeof schema>;

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      date: "",
      message: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    const parsed = schema.safeParse(values);
    if (!parsed.success) return;

    // No backend wired up yet. Replace with /api/contact when ready.
    await new Promise((r) => setTimeout(r, 600));
    console.info("Contact form submitted:", parsed.data);
    setSubmitted(true);
    reset();
  };

  if (submitted) {
    return (
      <div className="py-16 border-t border-b border-line text-center">
        <p className="font-mono-display text-[11px] text-muted">
          Message sent
        </p>
        <h3 className="mt-4 font-mono-display text-2xl text-text">
          Thanks.
        </h3>
        <p className="mt-4 text-muted max-w-md mx-auto">
          Rhys typically responds within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 font-mono-display text-[11px] text-text border-b border-text hover:text-accent hover:border-accent transition-colors pb-1"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-8"
      aria-label="Contact form"
    >
      <div className="grid sm:grid-cols-2 gap-x-8 gap-y-8">
        <Field label="Name" error={errors.name?.message}>
          <input
            {...register("name")}
            type="text"
            autoComplete="name"
            placeholder="Your name"
            className={INPUT}
          />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input
            {...register("email")}
            type="email"
            autoComplete="email"
            placeholder="you@email.com"
            className={INPUT}
          />
        </Field>
        <Field label="Phone (optional)" error={errors.phone?.message}>
          <input
            {...register("phone")}
            type="tel"
            autoComplete="tel"
            placeholder="(303) 555-0100"
            className={INPUT}
          />
        </Field>
        <Field label="Preferred date (optional)" error={errors.date?.message}>
          <input
            {...register("date")}
            type="date"
            className={INPUT}
          />
        </Field>
      </div>

      <Field label="Service" error={errors.service?.message}>
        <select {...register("service")} className={INPUT} defaultValue="">
          <option value="" disabled>
            Choose a service…
          </option>
          {data.categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.title}
            </option>
          ))}
          <option value="other">Something else</option>
        </select>
      </Field>

      <Field label="Tell me about your shoot" error={errors.message?.message}>
        <textarea
          {...register("message")}
          rows={5}
          placeholder="Location, ideas, mood, the moment you're trying to capture…"
          className={`${INPUT} resize-none`}
        />
      </Field>

      <div className="flex items-center justify-between gap-4 pt-2">
        <p className="font-mono-display text-[10px] text-muted">
          Replies within 24h
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="font-mono-display text-[11px] text-text border-b border-text hover:text-accent hover:border-accent transition-colors pb-1 disabled:opacity-50"
        >
          {isSubmitting ? "Sending…" : "Send →"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block font-mono-display text-[10px] text-muted mb-1">
        {label}
      </span>
      {children}
      {error && (
        <span className="block text-xs text-accent mt-2">{error}</span>
      )}
    </label>
  );
}
