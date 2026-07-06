'use client';

import { CaptionDetails, CaptionAlign, CaptionFont } from '@/lib/types';

interface SignatureDetailsProps {
  caption: CaptionDetails;
  onChange: (caption: CaptionDetails) => void;
  showPreview: boolean;
  onTogglePreview: () => void;
}

const ALIGN_OPTIONS: { value: CaptionAlign; label: string }[] = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' },
  { value: 'manual', label: 'Manual' },
];

const FONT_OPTIONS: { value: CaptionFont; label: string }[] = [
  { value: 'monospace', label: 'Monospace' },
  { value: 'sans-serif', label: 'Sans Serif' },
  { value: 'serif', label: 'Serif' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Courier New', label: 'Courier New' },
  { value: 'Arial', label: 'Arial' },
];

export function SignatureDetails({ caption, onChange, showPreview, onTogglePreview }: SignatureDetailsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-zinc-400">
          Caption Details
        </h3>
        <button
          onClick={onTogglePreview}
          className={`px-3 py-1.5 text-xs font-mono uppercase tracking-[0.1em] border transition-all ${
            showPreview
              ? 'bg-white text-black border-white'
              : 'bg-transparent text-zinc-400 border-zinc-600 hover:bg-zinc-800 hover:text-white hover:border-white'
          }`}
        >
          Preview {showPreview ? 'ON' : 'OFF'}
        </button>
      </div>

      <div className="space-y-3">
        <div className="space-y-1">
          <label className="text-xs font-mono uppercase tracking-[0.15em] text-zinc-500">
            Name
          </label>
          <input
            type="text"
            value={caption.name}
            onChange={(e) => onChange({ ...caption, name: e.target.value })}
            placeholder="John Doe"
            className="w-full px-3 py-2 text-sm font-mono bg-transparent border border-zinc-700 text-white placeholder-zinc-600 focus:outline-none focus:border-white"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono uppercase tracking-[0.15em] text-zinc-500">
            Title
          </label>
          <input
            type="text"
            value={caption.title}
            onChange={(e) => onChange({ ...caption, title: e.target.value })}
            placeholder="Software Engineer"
            className="w-full px-3 py-2 text-sm font-mono bg-transparent border border-zinc-700 text-white placeholder-zinc-600 focus:outline-none focus:border-white"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono uppercase tracking-[0.15em] text-zinc-500">
            Date
          </label>
          <input
            type="date"
            value={caption.date}
            onChange={(e) => onChange({ ...caption, date: e.target.value })}
            className="w-full px-3 py-2 text-sm font-mono bg-transparent border border-zinc-700 text-white focus:outline-none focus:border-white"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono uppercase tracking-[0.15em] text-zinc-500">
            Notes
          </label>
          <textarea
            value={caption.notes}
            onChange={(e) => onChange({ ...caption, notes: e.target.value })}
            placeholder="Additional notes..."
            rows={3}
            className="w-full px-3 py-2 text-sm font-mono bg-transparent border border-zinc-700 text-white placeholder-zinc-600 focus:outline-none focus:border-white resize-none"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono uppercase tracking-[0.15em] text-zinc-500">
            Alignment
          </label>
          <div className="flex gap-1">
            {ALIGN_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => onChange({ ...caption, align: option.value })}
                className={`flex-1 px-2 py-1.5 text-xs font-mono uppercase tracking-[0.1em] border transition-colors ${
                  caption.align === option.value
                    ? 'border-white text-white'
                    : 'border-zinc-700 text-zinc-400 hover:text-white hover:border-white'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {caption.align === 'manual' && (
          <div className="flex gap-2">
            <div className="flex-1 space-y-1">
              <label className="text-xs font-mono uppercase tracking-[0.15em] text-zinc-500">
                X
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={caption.offsetX.toString()}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === '' || val === '-') return;
                  const num = parseInt(val, 10);
                  if (!isNaN(num)) onChange({ ...caption, offsetX: num });
                }}
                onBlur={(e) => {
                  if (e.target.value === '' || e.target.value === '-') {
                    onChange({ ...caption, offsetX: 0 });
                  }
                }}
                className="w-full px-3 py-2 text-sm font-mono bg-transparent border border-zinc-700 text-white focus:outline-none focus:border-white"
              />
            </div>
            <div className="flex-1 space-y-1">
              <label className="text-xs font-mono uppercase tracking-[0.15em] text-zinc-500">
                Y
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={caption.offsetY.toString()}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === '' || val === '-') return;
                  const num = parseInt(val, 10);
                  if (!isNaN(num)) onChange({ ...caption, offsetY: num });
                }}
                onBlur={(e) => {
                  if (e.target.value === '' || e.target.value === '-') {
                    onChange({ ...caption, offsetY: 0 });
                  }
                }}
                className="w-full px-3 py-2 text-sm font-mono bg-transparent border border-zinc-700 text-white focus:outline-none focus:border-white"
              />
            </div>
          </div>
        )}

        <div className="space-y-1">
          <label className="text-xs font-mono uppercase tracking-[0.15em] text-zinc-500">
            Font
          </label>
          <select
            value={caption.font}
            onChange={(e) => onChange({ ...caption, font: e.target.value as CaptionFont })}
            className="w-full px-3 py-2 text-sm font-mono bg-black border border-zinc-700 text-white focus:outline-none focus:border-white"
          >
            {FONT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono uppercase tracking-[0.15em] text-zinc-500">
            Font Size: {caption.fontSize}px
          </label>
          <input
            type="range"
            min="8"
            max="24"
            value={caption.fontSize}
            onChange={(e) => onChange({ ...caption, fontSize: parseInt(e.target.value) })}
            className="w-full h-1 bg-zinc-800 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white"
          />
        </div>
      </div>
    </div>
  );
}
