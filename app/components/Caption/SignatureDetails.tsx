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
        <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground">
          Caption Details
        </h3>
        <button
          onClick={onTogglePreview}
          className={`px-3 py-1.5 text-xs font-mono uppercase tracking-[0.1em] border transition-all ${
            showPreview
              ? 'bg-foreground text-background border-foreground'
              : 'bg-transparent text-muted-foreground border-border hover:bg-muted hover:text-foreground hover:border-foreground'
          }`}
        >
          Preview {showPreview ? 'ON' : 'OFF'}
        </button>
      </div>

      <div className="space-y-3">
        <div className="space-y-1">
          <label className="text-xs font-mono uppercase tracking-[0.15em] text-muted">
            Name
          </label>
          <input
            type="text"
            value={caption.name}
            onChange={(e) => onChange({ ...caption, name: e.target.value })}
            placeholder="John Doe"
            className="w-full px-3 py-2 text-sm font-mono bg-transparent border border-border text-foreground placeholder-muted focus:outline-none focus:border-foreground"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono uppercase tracking-[0.15em] text-muted">
            Title
          </label>
          <input
            type="text"
            value={caption.title}
            onChange={(e) => onChange({ ...caption, title: e.target.value })}
            placeholder="Software Engineer"
            className="w-full px-3 py-2 text-sm font-mono bg-transparent border border-border text-foreground placeholder-muted focus:outline-none focus:border-foreground"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono uppercase tracking-[0.15em] text-muted">
            Date
          </label>
          <input
            type="date"
            value={caption.date}
            onChange={(e) => onChange({ ...caption, date: e.target.value })}
            className="w-full px-3 py-2 text-sm font-mono bg-transparent border border-border text-foreground focus:outline-none focus:border-foreground"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono uppercase tracking-[0.15em] text-muted">
            Notes
          </label>
          <textarea
            value={caption.notes}
            onChange={(e) => onChange({ ...caption, notes: e.target.value })}
            placeholder="Additional notes..."
            rows={3}
            className="w-full px-3 py-2 text-sm font-mono bg-transparent border border-border text-foreground placeholder-muted focus:outline-none focus:border-foreground resize-none"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono uppercase tracking-[0.15em] text-muted">
            Alignment
          </label>
          <div className="flex gap-1">
            {ALIGN_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => onChange({ ...caption, align: option.value })}
                className={`flex-1 px-2 py-1.5 text-xs font-mono uppercase tracking-[0.1em] border transition-colors ${
                  caption.align === option.value
                    ? 'border-foreground text-foreground'
                    : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground'
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
              <label className="text-xs font-mono uppercase tracking-[0.15em] text-muted">
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
                className="w-full px-3 py-2 text-sm font-mono bg-transparent border border-border text-foreground focus:outline-none focus:border-foreground"
              />
            </div>
            <div className="flex-1 space-y-1">
              <label className="text-xs font-mono uppercase tracking-[0.15em] text-muted">
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
                className="w-full px-3 py-2 text-sm font-mono bg-transparent border border-border text-foreground focus:outline-none focus:border-foreground"
              />
            </div>
          </div>
        )}

        <div className="space-y-1">
          <label className="text-xs font-mono uppercase tracking-[0.15em] text-muted">
            Font
          </label>
          <select
            value={caption.font}
            onChange={(e) => onChange({ ...caption, font: e.target.value as CaptionFont })}
            className="w-full px-3 py-2 text-sm font-mono bg-background border border-border text-foreground focus:outline-none focus:border-foreground"
          >
            {FONT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono uppercase tracking-[0.15em] text-muted">
            Font Size: {caption.fontSize}px
          </label>
          <input
            type="range"
            min="8"
            max="24"
            value={caption.fontSize}
            onChange={(e) => onChange({ ...caption, fontSize: parseInt(e.target.value) })}
            className="w-full h-1 bg-border appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-foreground"
          />
        </div>
      </div>
    </div>
  );
}
