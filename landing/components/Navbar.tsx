'use client';

import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-sm font-mono uppercase tracking-[0.15em] font-bold">
          SignatureInk
        </Link>

        <div className="flex items-center gap-6">
          <a
            href="#features"
            className="text-xs font-mono uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
          >
            Features
          </a>
          <Link
            href="https://signatureink.vercel.app/editor"
            className="text-xs font-mono uppercase tracking-[0.1em] px-4 py-2 bg-foreground text-background hover:bg-muted-foreground transition-colors"
          >
            Launch App →
          </Link>
        </div>
      </div>
    </nav>
  );
}
