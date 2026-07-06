'use client';

import { InkSettings } from '@/lib/types';

interface InkSpecProps {
  settings: InkSettings;
  onChange: (settings: InkSettings) => void;
}

export function InkSpec({ settings, onChange }: InkSpecProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-zinc-400">
        Ink Specification
      </h3>

      <div className="space-y-3">
        <div className="space-y-1">
          <label className="text-xs font-mono uppercase tracking-[0.15em] text-zinc-500">
            Color
          </label>
          <div className="flex gap-2">
            {['#000000', '#1a1a1a', '#333333', '#666666', '#999999'].map((color) => (
              <button
                key={color}
                className="w-6 h-6 border border-zinc-700 hover:border-white transition-colors"
                style={{ backgroundColor: color }}
                onClick={() => onChange({ ...settings, color })}
              />
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono uppercase tracking-[0.15em] text-zinc-500">
            Width: {settings.width}px
          </label>
          <input
            type="range"
            min="0.5"
            max="8"
            step="0.5"
            value={settings.width}
            onChange={(e) => onChange({ ...settings, width: parseFloat(e.target.value) })}
            className="w-full h-1 bg-zinc-800 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono uppercase tracking-[0.15em] text-zinc-500">
            Opacity: {Math.round(settings.opacity * 100)}%
          </label>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={settings.opacity}
            onChange={(e) => onChange({ ...settings, opacity: parseFloat(e.target.value) })}
            className="w-full h-1 bg-zinc-800 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono uppercase tracking-[0.15em] text-zinc-500">
            Smoothing: {Math.round(settings.smoothing * 100)}%
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={settings.smoothing}
            onChange={(e) => onChange({ ...settings, smoothing: parseFloat(e.target.value) })}
            className="w-full h-1 bg-zinc-800 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="pressure"
            checked={settings.pressureSensitivity}
            onChange={(e) => onChange({ ...settings, pressureSensitivity: e.target.checked })}
            className="w-3 h-3 border border-zinc-700 bg-transparent checked:bg-white"
          />
          <label htmlFor="pressure" className="text-xs font-mono uppercase tracking-[0.15em] text-zinc-500">
            Pressure Sensitivity
          </label>
        </div>
      </div>
    </div>
  );
}
