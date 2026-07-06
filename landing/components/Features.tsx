const FEATURES = [
  {
    id: 'canvas',
    title: 'Canvas',
    description: 'Draw your signature with smooth bezier curve simulation',
    icon: '▢',
  },
  {
    id: 'export',
    title: 'Export',
    description: 'Save as PNG, JPG, or PDF with custom scale and quality',
    icon: '↓',
  },
  {
    id: 'themes',
    title: 'Themes',
    description: 'Switch between light, dark, and system theme',
    icon: '◐',
  },
  {
    id: 'ink',
    title: 'Ink Spec',
    description: 'Customize color, width, opacity, and smoothing',
    icon: '●',
  },
  {
    id: 'preview',
    title: 'Preview',
    description: 'See your signature on light and dark paper',
    icon: '◫',
  },
  {
    id: 'caption',
    title: 'Caption',
    description: 'Add name, title, date with custom fonts and alignment',
    icon: 'T',
  },
];

export function Features() {
  return (
    <section id="features" className="px-6 py-24 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-mono font-bold tracking-tighter uppercase mt-4">
            Everything You Need
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {FEATURES.map((feature) => (
            <div
              key={feature.id}
              className="bg-background p-8 hover:bg-foreground hover:text-background transition-colors group"
            >
              <div className="text-3xl mb-4 font-mono">{feature.icon}</div>
              <h3 className="text-sm font-mono uppercase tracking-[0.15em] font-bold mb-2">
                {feature.title}
              </h3>
              <p className="text-xs font-mono text-muted-foreground group-hover:text-muted leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
