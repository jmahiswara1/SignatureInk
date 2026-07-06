'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { SignatureCanvas } from '@/components/Canvas/SignatureCanvas';
import { InkSpec } from '@/components/Toolbar/InkSpec';
import { Tools } from '@/components/Toolbar/Tools';
import { Templates } from '@/components/Toolbar/Templates';
import { ExportPanel } from '@/components/Export/ExportPanel';
import { SignatureDetails } from '@/components/Caption/SignatureDetails';
import { Modal } from '@/components/ui/Modal';
import { ThemeSelector } from '@/components/ThemeSelector';
import { InkSettings, CaptionDetails, ExportOptions, PaperTheme, Point } from '@/lib/types';
import { DEFAULT_INK_SETTINGS, DEFAULT_CAPTION, DEFAULT_EXPORT_OPTIONS } from '@/lib/types';
import { loadSignatureData, saveSignatureData } from '@/lib/storage';
import { exportSignature } from '@/lib/export';
import { useCanvas } from '@/hooks/useCanvas';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useCanvasSize } from '@/hooks/useCanvasSize';

export default function Home() {
  const { theme: appTheme, setTheme: setAppTheme } = useAppTheme();
  const responsiveCanvasSize = useCanvasSize();
  const [inkSettings, setInkSettings] = useState<InkSettings>(DEFAULT_INK_SETTINGS);
  const [caption, setCaption] = useState<CaptionDetails>(DEFAULT_CAPTION);
  const [exportOptions, setExportOptions] = useState<ExportOptions>(DEFAULT_EXPORT_OPTIONS);
  const [theme, setTheme] = useState<PaperTheme>('light');
  const [showGuides, setShowGuides] = useState<'baseline' | 'grid' | 'none'>('none');
  const [showCaptionPreview, setShowCaptionPreview] = useState(false);
  const [isCanvasExpanded, setIsCanvasExpanded] = useState(false);
  const previewLightRef = useRef<HTMLCanvasElement>(null);
  const previewDarkRef = useRef<HTMLCanvasElement>(null);
  const onDrawRef = useRef<(() => void) | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showExportConfirm, setShowExportConfirm] = useState(false);
  const [expandedSize, setExpandedSize] = useState({ width: 800, height: 400 });

  useEffect(() => {
    if (isCanvasExpanded) {
      const updateExpandedSize = () => {
        setExpandedSize({
          width: window.innerWidth - 32,
          height: window.innerHeight - 100,
        });
      };
      updateExpandedSize();
      window.addEventListener('resize', updateExpandedSize);
      return () => window.removeEventListener('resize', updateExpandedSize);
    }
  }, [isCanvasExpanded]);

  const canvasSize = isCanvasExpanded ? expandedSize : responsiveCanvasSize;

  const captionHeight = 80;
  const previewHeight = showCaptionPreview
    ? canvasSize.height + captionHeight
    : canvasSize.height;

  const {
    canvasRef,
    startDrawing,
    draw,
    stopDrawing,
    undo,
    redo,
    clear,
    loadTemplate,
    canUndo,
    canRedo,
  } = useCanvas({
    width: canvasSize.width,
    height: canvasSize.height,
    theme,
    showGuides,
    inkSettings,
    onStrokeEnd: () => onDrawRef.current?.(),
    onDraw: () => onDrawRef.current?.(),
  });

  const updatePreview = useCallback(() => {
    const mainCanvas = canvasRef.current;
    if (!mainCanvas) return;

    const getCaptionX = (text: string, ctx: CanvasRenderingContext2D, canvasWidth: number): number => {
      if (caption.align === 'left') return 10;
      if (caption.align === 'center') {
        const textWidth = ctx.measureText(text).width;
        return (canvasWidth - textWidth) / 2;
      }
      if (caption.align === 'right') {
        const textWidth = ctx.measureText(text).width;
        return canvasWidth - textWidth - 10;
      }
      return caption.offsetX;
    };

    const lightCanvas = previewLightRef.current;
    if (lightCanvas) {
      lightCanvas.height = previewHeight;
      const ctx = lightCanvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, lightCanvas.width, lightCanvas.height);
        ctx.drawImage(mainCanvas, 0, 0, lightCanvas.width, canvasSize.height);

        if (showCaptionPreview) {
          const captionY = canvasSize.height + caption.offsetY;
          ctx.fillStyle = '#000000';
          ctx.textAlign = 'left';

          if (caption.name) {
            ctx.font = `bold ${caption.fontSize}px ${caption.font}`;
            ctx.fillText(caption.name, getCaptionX(caption.name, ctx, lightCanvas.width), captionY);
          }
          if (caption.title) {
            ctx.font = `${caption.fontSize}px ${caption.font}`;
            ctx.fillText(caption.title, getCaptionX(caption.title, ctx, lightCanvas.width), captionY + caption.fontSize + 6);
          }
          if (caption.date) {
            ctx.font = `${caption.fontSize - 2}px ${caption.font}`;
            ctx.globalAlpha = 0.6;
            ctx.fillText(caption.date, getCaptionX(caption.date, ctx, lightCanvas.width), captionY + (caption.fontSize + 6) * 2);
            ctx.globalAlpha = 1;
          }
          if (caption.notes) {
            ctx.font = `${caption.fontSize - 2}px ${caption.font}`;
            ctx.globalAlpha = 0.5;
            ctx.fillText(caption.notes, getCaptionX(caption.notes, ctx, lightCanvas.width), captionY + (caption.fontSize + 6) * 3);
            ctx.globalAlpha = 1;
          }
        }
      }
    }

    const darkCanvas = previewDarkRef.current;
    if (darkCanvas) {
      darkCanvas.height = previewHeight;
      const ctx = darkCanvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(0, 0, darkCanvas.width, darkCanvas.height);
        ctx.drawImage(mainCanvas, 0, 0, darkCanvas.width, canvasSize.height);

        if (showCaptionPreview) {
          const captionY = canvasSize.height + caption.offsetY;
          ctx.fillStyle = '#ffffff';
          ctx.textAlign = 'left';

          if (caption.name) {
            ctx.font = `bold ${caption.fontSize}px ${caption.font}`;
            ctx.fillText(caption.name, getCaptionX(caption.name, ctx, darkCanvas.width), captionY);
          }
          if (caption.title) {
            ctx.font = `${caption.fontSize}px ${caption.font}`;
            ctx.fillText(caption.title, getCaptionX(caption.title, ctx, darkCanvas.width), captionY + caption.fontSize + 6);
          }
          if (caption.date) {
            ctx.font = `${caption.fontSize - 2}px ${caption.font}`;
            ctx.globalAlpha = 0.6;
            ctx.fillText(caption.date, getCaptionX(caption.date, ctx, darkCanvas.width), captionY + (caption.fontSize + 6) * 2);
            ctx.globalAlpha = 1;
          }
          if (caption.notes) {
            ctx.font = `${caption.fontSize - 2}px ${caption.font}`;
            ctx.globalAlpha = 0.5;
            ctx.fillText(caption.notes, getCaptionX(caption.notes, ctx, darkCanvas.width), captionY + (caption.fontSize + 6) * 3);
            ctx.globalAlpha = 1;
          }
        }
      }
    }
  }, [canvasRef, showCaptionPreview, caption, theme, canvasSize.height, previewHeight]);

  onDrawRef.current = updatePreview;

  useEffect(() => {
    const data = loadSignatureData();
    if (data.inkSettings) setInkSettings(data.inkSettings);
    if (data.caption) setCaption(data.caption);
  }, []);

  useEffect(() => {
    saveSignatureData({ inkSettings, caption });
  }, [inkSettings, caption]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  useEffect(() => {
    updatePreview();
  }, [updatePreview]);

  const handleExportClick = () => {
    setShowExportConfirm(true);
  };

  const handleExportConfirm = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    await exportSignature(canvas, exportOptions, theme, exportOptions.withCaption ? caption : undefined);
  };

  const handleClearClick = () => {
    setShowClearConfirm(true);
  };

  const handleClearConfirm = () => {
    clear();
  };

  const handleLoadTemplate = (strokes: Point[][]) => {
    loadTemplate(strokes);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-base sm:text-lg font-mono tracking-[0.2em] uppercase">
              SignatureInk
            </h1>
            <p className="text-[10px] sm:text-xs font-mono text-muted tracking-[0.15em] uppercase mt-1">
              Signature Maker
            </p>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeSelector theme={appTheme} onThemeChange={setAppTheme} />
            <span className="hidden sm:inline text-xs font-mono text-muted-foreground tracking-[0.1em] uppercase">
              Local Only
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6 sm:gap-8">
          <div className="space-y-4 sm:space-y-6">
            <div className={`border border-border p-3 sm:p-4 ${isCanvasExpanded ? 'fixed inset-0 z-50 bg-background flex flex-col' : ''}`}>
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.1em] text-muted">
                  Canvas
                </span>
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-[10px] sm:text-xs font-mono text-muted-foreground">
                    {canvasSize.width} x {canvasSize.height}
                  </span>
                  <button
                    onClick={() => setIsCanvasExpanded(!isCanvasExpanded)}
                    className="px-2 py-1 text-[10px] sm:text-xs font-mono uppercase tracking-[0.1em] border border-border text-muted hover:text-foreground hover:border-foreground transition-colors"
                  >
                    {isCanvasExpanded ? 'Collapse' : 'Expand'}
                  </button>
                </div>
              </div>
              <div className={isCanvasExpanded ? 'flex-1 flex items-center justify-center' : ''}>
                <SignatureCanvas
                  canvasRef={canvasRef}
                  startDrawing={startDrawing}
                  draw={draw}
                  stopDrawing={stopDrawing}
                  theme={theme}
                />
              </div>
            </div>

            {!isCanvasExpanded && (
              <>
                <div className="border border-border p-3 sm:p-4">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.1em] text-muted">
                      Preview
                    </span>
                    <div className="flex gap-3 sm:gap-4">
                      <span className="text-[10px] sm:text-xs font-mono text-muted-foreground">
                        Light
                      </span>
                      <span className="text-[10px] sm:text-xs font-mono text-muted-foreground">
                        Dark
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="border border-border p-2 sm:p-3 bg-white">
                      <canvas
                        ref={previewLightRef}
                        width={canvasSize.width}
                        height={previewHeight}
                        className="w-full"
                      />
                    </div>
                    <div className="border border-border p-2 sm:p-3 bg-canvas-bg">
                      <canvas
                        ref={previewDarkRef}
                        width={canvasSize.width}
                        height={previewHeight}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                <div className="border border-border p-3 sm:p-4">
                  <SignatureDetails
                    caption={caption}
                    onChange={setCaption}
                    showPreview={showCaptionPreview}
                    onTogglePreview={() => setShowCaptionPreview(!showCaptionPreview)}
                  />
                </div>
              </>
            )}
          </div>

          {!isCanvasExpanded && (
            <div className="space-y-3 sm:space-y-4">
              <div className="border border-border p-3 sm:p-4">
                <InkSpec settings={inkSettings} onChange={setInkSettings} />
              </div>

              <div className="border border-border p-3 sm:p-4">
                <Tools
                  canUndo={canUndo}
                  canRedo={canRedo}
                  onUndo={undo}
                  onRedo={redo}
                  onClear={handleClearClick}
                  theme={theme}
                  onThemeChange={setTheme}
                  showGuides={showGuides}
                  onGuidesChange={setShowGuides}
                />
              </div>

              <div className="border border-border p-3 sm:p-4">
                <Templates onLoadTemplate={handleLoadTemplate} />
              </div>

              <div className="border border-border p-3 sm:p-4">
                <ExportPanel
                  options={exportOptions}
                  onChange={setExportOptions}
                  onExport={handleExportClick}
                />
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-border px-4 sm:px-6 py-3 sm:py-4 mt-6 sm:mt-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="text-[10px] sm:text-xs font-mono text-muted-foreground tracking-[0.1em] uppercase">
            SignatureInk v1.0
          </span>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/jmahiswara1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </a>
            <a
              href="mailto:gadangjatumahiswara@gmail.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>
            <a
              href="https://instagram.com/j.mahiswara_"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>
          <span className="text-[10px] sm:text-xs font-mono text-muted-foreground tracking-[0.1em] uppercase">
            All data stored locally
          </span>
        </div>
      </footer>

      <Modal
        open={showClearConfirm}
        onClose={() => setShowClearConfirm(false)}
        onConfirm={handleClearConfirm}
        title="Clear Canvas"
        description="This will erase your signature. This action cannot be undone."
        confirmLabel="Clear"
        cancelLabel="Cancel"
        variant="confirm"
      />

      <Modal
        open={showExportConfirm}
        onClose={() => setShowExportConfirm(false)}
        onConfirm={handleExportConfirm}
        title="Export Signature"
        description={`Export as ${exportOptions.format.toUpperCase()} with ${exportOptions.scale}x scale?`}
        confirmLabel="Export"
        cancelLabel="Cancel"
        variant="confirm"
      />
    </div>
  );
}
