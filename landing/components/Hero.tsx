'use client';

import Link from 'next/link';

export function Hero() {
  return (
    <section className="min-h-[100dvh] flex flex-col justify-center px-6 py-24">
      <div className="max-w-5xl mx-auto w-full">
        <div className="mb-8">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
            Signature Maker
          </span>
        </div>

        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-mono font-bold tracking-tighter leading-[0.9] uppercase mb-8">
          Create Your
          <br />
          Signature
          <br />
          <span className="text-muted">Digitally</span>
        </h1>

        <p className="text-sm sm:text-base font-mono text-muted-foreground max-w-md mb-12 leading-relaxed">
          Professional signature maker with ink simulation,
          <br />
          export to PNG, JPG, and PDF.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="https://app-signatureink.vercel.app"
            className="inline-flex items-center justify-center px-8 py-4 text-sm font-mono uppercase tracking-[0.15em] bg-foreground text-background hover:bg-muted-foreground transition-colors"
          >
            Start Signing →
          </Link>

          <a
            href="#features"
            className="inline-flex items-center justify-center px-8 py-4 text-sm font-mono uppercase tracking-[0.15em] border border-border text-foreground hover:bg-foreground hover:text-background transition-colors"
          >
            Learn More
          </a>
        </div>

        <div className="mt-24 flex items-center gap-8 text-xs font-mono text-muted-foreground uppercase tracking-[0.15em]">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-foreground" />
            <span>Local Only</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-foreground" />
            <span>No Signup</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-foreground" />
            <span>Free</span>
          </div>
        </div>
      </div>
    </section>
  );
}
