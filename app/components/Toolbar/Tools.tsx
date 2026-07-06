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
      <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-zinc-400">
        Tools
      </h3>

      <div className="space-y-3">
        <div className="flex gap-2">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className="flex-1 px-3 py-2 text-xs font-mono uppercase tracking-[0.15em] border border-zinc-700 text-zinc-400 hover:text-white hover:border-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Undo
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className="flex-1 px-3 py-2 text-xs font-mono uppercase tracking-[0.15em] border border-zinc-700 text-zinc-400 hover:text-white hover:border-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Redo
          </button>
        </div>

        <button
          onClick={onClear}
          className="w-full px-3 py-2 text-xs font-mono uppercase tracking-[0.15em] border border-zinc-700 text-zinc-400 hover:text-white hover:border-white transition-colors"
        >
          Clear Canvas
        </button>

        <div className="space-y-1">
          <label className="text-xs font-mono uppercase tracking-[0.15em] text-zinc-500">
            Paper Theme
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => onThemeChange('light')}
              className={`flex-1 px-3 py-2 text-xs font-mono uppercase tracking-[0.15em] border transition-colors ${
                theme === 'light'
                  ? 'border-white text-white'
                  : 'border-zinc-700 text-zinc-400 hover:text-white hover:border-white'
              }`}
            >
              Light
            </button>
            <button
              onClick={() => onThemeChange('dark')}
              className={`flex-1 px-3 py-2 text-xs font-mono uppercase tracking-[0.15em] border transition-colors ${
                theme === 'dark'
                  ? 'border-white text-white'
                  : 'border-zinc-700 text-zinc-400 hover:text-white hover:border-white'
              }`}
            >
              Dark
            </button>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono uppercase tracking-[0.15em] text-zinc-500">
            Drawing Guides
          </label>
          <div className="flex gap-1">
            {(['none', 'baseline', 'grid'] as const).map((guide) => (
              <button
                key={guide}
                onClick={() => onGuidesChange(guide)}
                className={`flex-1 px-2 py-1.5 text-xs font-mono uppercase tracking-[0.1em] border transition-colors ${
                  showGuides === guide
                    ? 'border-white text-white'
                    : 'border-zinc-700 text-zinc-400 hover:text-white hover:border-white'
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
