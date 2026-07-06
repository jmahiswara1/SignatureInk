'use client';

import React from 'react';
import { PaperTheme } from '@/lib/types';

interface SignatureCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  startDrawing: (event: React.MouseEvent | React.TouchEvent) => void;
  draw: (event: React.MouseEvent | React.TouchEvent) => void;
  stopDrawing: () => void;
  theme: PaperTheme;
}

export function SignatureCanvas({
  canvasRef,
  startDrawing,
  draw,
  stopDrawing,
  theme,
}: SignatureCanvasProps) {
  return (
    <div className={`border border-border p-1.5 sm:p-2 ${theme === 'light' ? 'bg-white' : 'bg-canvas-bg'}`}>
      <canvas
        ref={canvasRef}
        className="cursor-crosshair touch-none w-full"
        style={{ height: 'auto', maxHeight: '400px' }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />
    </div>
  );
}
