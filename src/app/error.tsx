"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-5">
      <div className="text-center max-w-lg">
        <p className="font-mono-display text-[11px] text-muted">
          Something went sideways
        </p>
        <h1 className="mt-4 font-mono-display text-3xl md:text-5xl text-text">
          A frame got dropped.
        </h1>
        <p className="mt-6 text-muted">
          Try reloading. If it sticks around, drop Rhys a note.
        </p>
        <div className="mt-8 flex flex-wrap gap-6 justify-center font-mono-display text-[11px]">
          <button
            type="button"
            onClick={() => reset()}
            className="text-text border-b border-text hover:text-accent hover:border-accent transition-colors pb-1"
          >
            Try again
          </button>
          <Link
            href="/"
            className="text-text border-b border-text hover:text-accent hover:border-accent transition-colors pb-1"
          >
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}
