import { SignatureData, InkSettings, CaptionDetails, DEFAULT_INK_SETTINGS, DEFAULT_CAPTION } from './types';

const STORAGE_KEY = 'signatureink-data';

const defaultData: SignatureData = {
  imageData: '',
  inkSettings: DEFAULT_INK_SETTINGS,
  caption: DEFAULT_CAPTION,
  history: [],
  historyIndex: -1,
  updatedAt: Date.now(),
};

export function loadSignatureData(): SignatureData {
  if (typeof window === 'undefined') return defaultData;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultData;

    const parsed = JSON.parse(stored) as SignatureData;
    return {
      ...defaultData,
      ...parsed,
      inkSettings: { ...defaultData.inkSettings, ...parsed.inkSettings },
      caption: { ...defaultData.caption, ...parsed.caption },
    };
  } catch {
    return defaultData;
  }
}

export function saveSignatureData(data: Partial<SignatureData>): void {
  if (typeof window === 'undefined') return;

  try {
    const current = loadSignatureData();
    const updated = {
      ...current,
      ...data,
      updatedAt: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save signature data:', e);
  }
}

export function saveCanvasToHistory(canvas: HTMLCanvasElement, history: string[], historyIndex: number): { history: string[]; historyIndex: number } {
  const imageData = canvas.toDataURL('image/png');
  const newHistory = history.slice(0, historyIndex + 1);
  newHistory.push(imageData);

  if (newHistory.length > 50) {
    newHistory.shift();
  }

  return {
    history: newHistory,
    historyIndex: newHistory.length - 1,
  };
}

export function clearStorage(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}
