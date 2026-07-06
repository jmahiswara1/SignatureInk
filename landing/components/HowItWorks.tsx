const STEPS = [
  {
    number: '01',
    title: 'Draw',
    description: 'Draw your signature on the canvas with smooth ink simulation',
  },
  {
    number: '02',
    title: 'Customize',
    description: 'Adjust ink settings, add caption, choose paper theme',
  },
  {
    number: '03',
    title: 'Export',
    description: 'Save as PNG, JPG, or PDF with your preferred settings',
  },
];

export function HowItWorks() {
  return (
    <section className="px-6 py-24 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
            Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-mono font-bold tracking-tighter uppercase mt-4">
            How It Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {STEPS.map((step, index) => (
            <div key={index} className="bg-background p-8">
              <div className="text-6xl font-mono font-bold text-border mb-4">
                {step.number}
              </div>
              <h3 className="text-sm font-mono uppercase tracking-[0.15em] font-bold mb-2">
                {step.title}
              </h3>
              <p className="text-xs font-mono text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
