'use client';

import { ExportOptions, ExportFormat } from '@/lib/types';

interface ExportPanelProps {
  options: ExportOptions;
  onChange: (options: ExportOptions) => void;
  onExport: () => void;
}

export function ExportPanel({ options, onChange, onExport }: ExportPanelProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-zinc-400">
        Export
      </h3>

      <div className="space-y-3">
        <div className="space-y-1">
          <label className="text-xs font-mono uppercase tracking-[0.15em] text-zinc-500">
            Format
          </label>
          <div className="flex gap-1">
            {(['png', 'jpg', 'pdf'] as const).map((format) => (
              <button
                key={format}
                onClick={() => onChange({ ...options, format })}
                className={`flex-1 px-2 py-1.5 text-xs font-mono uppercase tracking-[0.1em] border transition-colors ${
                  options.format === format
                    ? 'border-white text-white'
                    : 'border-zinc-700 text-zinc-400 hover:text-white hover:border-white'
                }`}
              >
                {format}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="withBg"
            checked={options.withBackground}
            onChange={(e) => onChange({ ...options, withBackground: e.target.checked })}
            className="w-3 h-3 border border-zinc-700 bg-transparent checked:bg-white"
          />
          <label htmlFor="withBg" className="text-xs font-mono uppercase tracking-[0.15em] text-zinc-500">
            With Background
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="withCaption"
            checked={options.withCaption}
            onChange={(e) => onChange({ ...options, withCaption: e.target.checked })}
            className="w-3 h-3 border border-zinc-700 bg-transparent checked:bg-white"
          />
          <label htmlFor="withCaption" className="text-xs font-mono uppercase tracking-[0.15em] text-zinc-500">
            With Caption
          </label>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono uppercase tracking-[0.15em] text-zinc-500">
            Quality: {Math.round(options.quality * 100)}%
          </label>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={options.quality}
            onChange={(e) => onChange({ ...options, quality: parseFloat(e.target.value) })}
            className="w-full h-1 bg-zinc-800 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono uppercase tracking-[0.15em] text-zinc-500">
            Scale: {options.scale}x
          </label>
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((scale) => (
              <button
                key={scale}
                onClick={() => onChange({ ...options, scale })}
                className={`flex-1 px-2 py-1.5 text-xs font-mono uppercase tracking-[0.1em] border transition-colors ${
                  options.scale === scale
                    ? 'border-white text-white'
                    : 'border-zinc-700 text-zinc-400 hover:text-white hover:border-white'
                }`}
              >
                {scale}x
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onExport}
          className="w-full px-4 py-2.5 text-xs font-mono uppercase tracking-[0.2em] bg-white text-black hover:bg-zinc-200 transition-colors"
        >
          Export {options.format.toUpperCase()}
        </button>
      </div>
    </div>
  );
}
