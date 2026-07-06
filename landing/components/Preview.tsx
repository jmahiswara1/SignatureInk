export function Preview() {
  return (
    <section className="px-6 py-24 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
            Preview
          </span>
          <h2 className="text-3xl sm:text-4xl font-mono font-bold tracking-tighter uppercase mt-4">
            The Interface
          </h2>
        </div>

        <div className="border border-border">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono uppercase tracking-[0.15em] font-bold">
                SignatureInk
              </span>
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.1em]">
                Signature Maker
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-2 py-1 text-[10px] font-mono border border-border">
                Light
              </div>
              <div className="px-2 py-1 text-[10px] font-mono border border-border">
                Dark
              </div>
              <div className="px-2 py-1 text-[10px] font-mono border border-border bg-foreground text-background">
                System
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px]">
            {/* Main */}
            <div className="p-4 space-y-4">
              {/* Canvas */}
              <div className="border border-border p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-muted-foreground">
                    Canvas
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-muted-foreground">
                      600 x 200
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 border border-border">
                      Expand
                    </span>
                  </div>
                </div>
                <div className="h-32 border border-border bg-white flex items-center justify-center">
                  <svg
                    width="200"
                    height="60"
                    viewBox="0 0 200 60"
                    className="text-black"
                  >
                    <path
                      d="M 20 40 Q 50 10 80 35 Q 110 60 140 30 Q 160 10 180 35"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Preview */}
              <div className="border border-border p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-muted-foreground">
                    Preview
                  </span>
                  <div className="flex gap-3">
                    <span className="text-[10px] font-mono text-muted-foreground">
                      Light
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      Dark
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-20 border border-border bg-white flex items-center justify-center">
                    <svg
                      width="100"
                      height="30"
                      viewBox="0 0 100 30"
                      className="text-black"
                    >
                      <path
                        d="M 10 20 Q 25 5 40 17 Q 55 30 70 15 Q 80 5 90 17"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div className="h-20 border border-border bg-zinc-900 flex items-center justify-center">
                    <svg
                      width="100"
                      height="30"
                      viewBox="0 0 100 30"
                      className="text-white"
                    >
                      <path
                        d="M 10 20 Q 25 5 40 17 Q 55 30 70 15 Q 80 5 90 17"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="border-l border-border p-4 space-y-4">
              <div className="border border-border p-3">
                <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-muted-foreground block mb-2">
                  Ink Specification
                </span>
                <div className="space-y-2">
                  <div className="flex gap-1">
                    <div className="w-4 h-4 bg-black border border-border" />
                    <div className="w-4 h-4 bg-zinc-800 border border-border" />
                    <div className="w-4 h-4 bg-zinc-600 border border-border" />
                    <div className="w-4 h-4 bg-zinc-400 border border-border" />
                  </div>
                  <div className="h-1 bg-border" />
                  <div className="text-[10px] font-mono text-muted-foreground">
                    Width: 2px
                  </div>
                </div>
              </div>

              <div className="border border-border p-3">
                <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-muted-foreground block mb-2">
                  Tools
                </span>
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-[10px] font-mono px-2 py-1 border border-border text-center">
                    Undo
                  </div>
                  <div className="text-[10px] font-mono px-2 py-1 border border-border text-center">
                    Redo
                  </div>
                </div>
              </div>

              <div className="border border-border p-3">
                <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-muted-foreground block mb-2">
                  Export
                </span>
                <div className="flex gap-1">
                  <div className="text-[10px] font-mono px-2 py-1 border border-border bg-foreground text-background">
                    PNG
                  </div>
                  <div className="text-[10px] font-mono px-2 py-1 border border-border">
                    JPG
                  </div>
                  <div className="text-[10px] font-mono px-2 py-1 border border-border">
                    PDF
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
