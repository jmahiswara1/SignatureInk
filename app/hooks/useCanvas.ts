'use client';

import { useRef, useCallback, useState, useEffect } from 'react';
import { Point, InkSettings, Stroke, PaperTheme } from '@/lib/types';
import { drawSmoothLine } from '@/lib/smoothing';
import { getCanvasPoint, clearCanvas, drawGuides } from '@/lib/canvas';
import { saveCanvasToHistory, saveSignatureData, loadSignatureData } from '@/lib/storage';

interface UseCanvasOptions {
  width: number;
  height: number;
  theme: PaperTheme;
  showGuides: 'baseline' | 'grid' | 'none';
  inkSettings: InkSettings;
  onStrokeEnd?: () => void;
  onDraw?: () => void;
}

export function useCanvas(options: UseCanvasOptions) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const currentStroke = useRef<Point[]>([]);
  const strokes = useRef<Stroke[]>([]);

  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  useEffect(() => {
    const data = loadSignatureData();
    if (data.history.length > 0) {
      setHistory(data.history);
      setHistoryIndex(data.historyIndex);
      setCanUndo(data.historyIndex > 0);
      setCanRedo(data.historyIndex < data.history.length - 1);

      if (data.imageData && canvasRef.current) {
        const img = new Image();
        img.onload = () => {
          const ctx = canvasRef.current?.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0);
          }
        };
        img.src = data.imageData;
      }
    }
  }, []);

  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    clearCanvas(canvas);
    drawGuides(canvas, options.theme, options.showGuides);

    strokes.current.forEach((stroke) => {
      drawSmoothLine(ctx, stroke.points, stroke.settings);
    });
  }, [options.theme, options.showGuides]);

  const saveState = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { history: newHistory, historyIndex: newIndex } = saveCanvasToHistory(
      canvas,
      history,
      historyIndex
    );

    setHistory(newHistory);
    setHistoryIndex(newIndex);
    setCanUndo(newIndex > 0);
    setCanRedo(false);

    saveSignatureData({
      imageData: canvas.toDataURL('image/png'),
      history: newHistory,
      historyIndex: newIndex,
    });
  }, [history, historyIndex]);

  const startDrawing = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      event.preventDefault();
      const canvas = canvasRef.current;
      if (!canvas) return;

      isDrawing.current = true;
      const point = getCanvasPoint(canvas, event.nativeEvent);
      currentStroke.current = [point];

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
      }
    },
    []
  );

  const draw = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      event.preventDefault();
      if (!isDrawing.current) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const point = getCanvasPoint(canvas, event.nativeEvent);
      currentStroke.current.push(point);

      const ctx = canvas.getContext('2d');
      if (ctx) {
        drawSmoothLine(ctx, currentStroke.current, options.inkSettings);
        options.onDraw?.();
      }
    },
    [options.inkSettings, options.onDraw]
  );

  const stopDrawing = useCallback(() => {
    if (!isDrawing.current) return;
    isDrawing.current = false;

    if (currentStroke.current.length > 1) {
      strokes.current.push({
        points: [...currentStroke.current],
        settings: { ...options.inkSettings },
      });
      saveState();
      options.onStrokeEnd?.();
    }

    currentStroke.current = [];
  }, [options.inkSettings, saveState, options.onStrokeEnd]);

  const undo = useCallback(() => {
    if (historyIndex <= 0) return;

    const newIndex = historyIndex - 1;
    setHistoryIndex(newIndex);
    setCanUndo(newIndex > 0);
    setCanRedo(true);

    const img = new Image();
    img.onload = () => {
      const ctx = canvasRef.current?.getContext('2d');
      if (ctx) {
        clearCanvas(canvasRef.current!);
        drawGuides(canvasRef.current!, options.theme, options.showGuides);
        ctx.drawImage(img, 0, 0);
        options.onDraw?.();
      }
    };
    img.src = history[newIndex];

    saveSignatureData({
      imageData: history[newIndex],
      historyIndex: newIndex,
    });
  }, [historyIndex, history, options.theme, options.showGuides, options.onDraw]);

  const redo = useCallback(() => {
    if (historyIndex >= history.length - 1) return;

    const newIndex = historyIndex + 1;
    setHistoryIndex(newIndex);
    setCanUndo(true);
    setCanRedo(newIndex < history.length - 1);

    const img = new Image();
    img.onload = () => {
      const ctx = canvasRef.current?.getContext('2d');
      if (ctx) {
        clearCanvas(canvasRef.current!);
        drawGuides(canvasRef.current!, options.theme, options.showGuides);
        ctx.drawImage(img, 0, 0);
        options.onDraw?.();
      }
    };
    img.src = history[newIndex];

    saveSignatureData({
      imageData: history[newIndex],
      historyIndex: newIndex,
    });
  }, [historyIndex, history, options.theme, options.showGuides, options.onDraw]);

  const clear = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    strokes.current = [];
    clearCanvas(canvas);
    drawGuides(canvas, options.theme, options.showGuides);
    saveState();
    options.onDraw?.();
  }, [options.theme, options.showGuides, saveState, options.onDraw]);

  const loadTemplate = useCallback(
    (templateStrokes: Point[][]) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      strokes.current = templateStrokes.map((points) => ({
        points,
        settings: { ...options.inkSettings },
      }));

      redrawCanvas();
      saveState();
    },
    [options.inkSettings, redrawCanvas, saveState]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = options.width;
    canvas.height = options.height;

    redrawCanvas();
  }, [options.width, options.height, redrawCanvas]);

  return {
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
    history,
    historyIndex,
  };
}
