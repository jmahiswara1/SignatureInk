'use client';

import { AppTheme } from '@/lib/types';

interface ThemeSelectorProps {
  theme: AppTheme;
  onThemeChange: (theme: AppTheme) => void;
}

const THEME_OPTIONS: { value: AppTheme; label: string }[] = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' },
];

export function ThemeSelector({ theme, onThemeChange }: ThemeSelectorProps) {
  return (
    <select
      value={theme}
      onChange={(e) => onThemeChange(e.target.value as AppTheme)}
      className="pl-2 pr-6 py-1 text-xs font-mono uppercase tracking-[0.1em] border border-border bg-background text-foreground focus:outline-none focus:border-foreground cursor-pointer appearance-none bg-no-repeat bg-[right_0.5rem_center] bg-[length:0.75rem]"
      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2371717a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")` }}
    >
      {THEME_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
