'use client';

import { PaperTheme } from '@/lib/types';

interface PaperPreviewProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  theme: PaperTheme;
  width: number;
  height: number;
}

export function PaperPreview({ canvasRef, theme, width, height }: PaperPreviewProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-400">
        Preview
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <span className="text-[9px] font-mono uppercase tracking-[0.1em] text-zinc-500">
            Light Paper
          </span>
          <div className="border border-zinc-700 p-2 bg-white">
            <canvas
              ref={canvasRef}
              width={width}
              height={height}
              className="w-full"
              style={{ background: 'white' }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-[9px] font-mono uppercase tracking-[0.1em] text-zinc-500">
            Dark Paper
          </span>
          <div className="border border-zinc-700 p-2 bg-zinc-900">
            <canvas
              ref={canvasRef}
              width={width}
              height={height}
              className="w-full"
              style={{ background: '#1a1a1a' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
