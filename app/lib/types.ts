export interface InkSettings {
  color: string;
  width: number;
  opacity: number;
  smoothing: number;
  pressureSensitivity: boolean;
}

export type CaptionAlign = 'left' | 'center' | 'right' | 'manual';

export type CaptionFont = 'monospace' | 'sans-serif' | 'serif' | 'Georgia' | 'Courier New' | 'Arial';

export interface CaptionDetails {
  name: string;
  title: string;
  date: string;
  notes: string;
  align: CaptionAlign;
  offsetX: number;
  offsetY: number;
  font: CaptionFont;
  fontSize: number;
}

export interface Point {
  x: number;
  y: number;
  pressure?: number;
  timestamp?: number;
}

export interface Stroke {
  points: Point[];
  settings: InkSettings;
}

export interface SignatureData {
  imageData: string;
  inkSettings: InkSettings;
  caption: CaptionDetails;
  history: string[];
  historyIndex: number;
  updatedAt: number;
}

export type PaperTheme = 'light' | 'dark';

export type AppTheme = 'light' | 'dark' | 'system';

export type ExportFormat = 'png' | 'jpg' | 'pdf';

export interface ExportOptions {
  format: ExportFormat;
  withBackground: boolean;
  withCaption: boolean;
  quality: number;
  scale: number;
}

export const DEFAULT_INK_SETTINGS: InkSettings = {
  color: '#000000',
  width: 2,
  opacity: 1,
  smoothing: 0.5,
  pressureSensitivity: true,
};

export const DEFAULT_CAPTION: CaptionDetails = {
  name: '',
  title: '',
  date: new Date().toISOString().split('T')[0],
  notes: '',
  align: 'left',
  offsetX: 10,
  offsetY: 10,
  font: 'monospace',
  fontSize: 12,
};

export const DEFAULT_EXPORT_OPTIONS: ExportOptions = {
  format: 'png',
  withBackground: false,
  withCaption: false,
  quality: 0.92,
  scale: 2,
};
