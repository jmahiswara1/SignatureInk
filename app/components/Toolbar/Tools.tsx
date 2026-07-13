'use client';

import { PaperTheme } from '@/lib/types';

interface ToolsProps {
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
  theme: PaperTheme;
  onThemeChange: (theme: PaperTheme) => void;
  showGuides: 'baseline' | 'grid' | 'none';
  onGuidesChange: (guides: 'baseline' | 'grid' | 'none') => void;
}

export function Tools({
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onClear,
  theme,
  onThemeChange,
  showGuides,
  onGuidesChange,
}: ToolsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground">
        Tools
      </h3>

      <div className="space-y-3">
        <div className="flex gap-2">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className="flex-1 px-3 py-2 text-xs font-mono uppercase tracking-[0.15em] border border-border text-muted-foreground hover:text-foreground hover:border-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Undo
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className="flex-1 px-3 py-2 text-xs font-mono uppercase tracking-[0.15em] border border-border text-muted-foreground hover:text-foreground hover:border-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Redo
          </button>
        </div>

        <button
          onClick={onClear}
          className="w-full px-3 py-2 text-xs font-mono uppercase tracking-[0.15em] border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
        >
          Clear Canvas
        </button>

        <div className="space-y-1">
          <label className="text-xs font-mono uppercase tracking-[0.15em] text-muted">
            Paper Theme
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => onThemeChange('light')}
                className={`flex-1 px-3 py-2 text-xs font-mono uppercase tracking-[0.15em] border transition-colors ${
                theme === 'light'
                  ? 'border-foreground text-foreground'
                  : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground'
              }`}
            >
              Light
            </button>
            <button
              onClick={() => onThemeChange('dark')}
              className={`flex-1 px-3 py-2 text-xs font-mono uppercase tracking-[0.15em] border transition-colors ${
                theme === 'dark'
                  ? 'border-foreground text-foreground'
                  : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground'
              }`}
            >
              Dark
            </button>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono uppercase tracking-[0.15em] text-muted">
            Drawing Guides
          </label>
          <div className="flex gap-1">
            {(['none', 'baseline', 'grid'] as const).map((guide) => (
              <button
                key={guide}
                onClick={() => onGuidesChange(guide)}
                className={`flex-1 px-2 py-1.5 text-xs font-mono uppercase tracking-[0.1em] border transition-colors ${
                  showGuides === guide
                    ? 'border-foreground text-foreground'
                    : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground'
                }`}
              >
                {guide}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
