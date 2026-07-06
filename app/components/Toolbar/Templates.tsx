'use client';

import { SIGNATURE_TEMPLATES } from '@/lib/templates';
import { Point } from '@/lib/types';

interface TemplatesProps {
  onLoadTemplate: (strokes: Point[][]) => void;
}

export function Templates({ onLoadTemplate }: TemplatesProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-zinc-400">
        Templates
      </h3>

      <div className="space-y-2">
        {SIGNATURE_TEMPLATES.map((template) => (
          <button
            key={template.id}
            onClick={() => onLoadTemplate(template.strokes)}
            className="w-full px-3 py-2 text-xs font-mono uppercase tracking-[0.15em] border border-zinc-700 text-zinc-400 hover:text-white hover:border-white transition-colors text-left"
          >
            {template.name}
          </button>
        ))}
      </div>
    </div>
  );
}
