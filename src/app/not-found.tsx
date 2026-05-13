import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-5">
      <div className="text-center max-w-lg">
        <p className="font-mono-display text-[11px] text-muted">404</p>
        <h1 className="mt-4 font-mono-display text-4xl md:text-6xl text-text">
          Out of frame.
        </h1>
        <p className="mt-6 text-muted">
          That page is somewhere off the edge of the lens.
        </p>
        <div className="mt-8 flex flex-wrap gap-6 justify-center font-mono-display text-[11px]">
          <Link
            href="/"
            className="text-text border-b border-text hover:text-accent hover:border-accent transition-colors pb-1"
          >
            Back home
          </Link>
          <Link
            href="/portfolio"
            className="text-text border-b border-text hover:text-accent hover:border-accent transition-colors pb-1"
          >
            See the work
          </Link>
        </div>
      </div>
    </div>
  );
}
