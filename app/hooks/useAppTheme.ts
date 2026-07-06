'use client';

import { useState, useEffect, useCallback } from 'react';
import { AppTheme } from '@/lib/types';

const STORAGE_KEY = 'signatureink-app-theme';

export function useAppTheme() {
  const [theme, setThemeState] = useState<AppTheme>('system');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as AppTheme | null;
    if (saved && ['light', 'dark', 'system'].includes(saved)) {
      setThemeState(saved);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const setTheme = useCallback((newTheme: AppTheme) => {
    setThemeState(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
  }, []);

  return { theme, setTheme };
}
