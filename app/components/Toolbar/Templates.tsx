'use client';

import { SIGNATURE_TEMPLATES } from '@/lib/templates';
import { Point } from '@/lib/types';

interface TemplatesProps {
  onLoadTemplate: (strokes: Point[][]) => void;
}

export function Templates({ onLoadTemplate }: TemplatesProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground">
        Templates
      </h3>

      <div className="space-y-2">
        {SIGNATURE_TEMPLATES.map((template) => (
          <button
            key={template.id}
            onClick={() => onLoadTemplate(template.strokes)}
            className="w-full px-3 py-2 text-xs font-mono uppercase tracking-[0.15em] border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors text-left"
          >
            {template.name}
          </button>
        ))}
      </div>
    </div>
  );
}
