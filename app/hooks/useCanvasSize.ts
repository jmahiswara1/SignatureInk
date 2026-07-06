'use client';

import { useState, useEffect } from 'react';

interface CanvasSize {
  width: number;
  height: number;
}

export function useCanvasSize(): CanvasSize {
  const [canvasSize, setCanvasSize] = useState<CanvasSize>({ width: 600, height: 200 });

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCanvasSize({ width: Math.min(width - 48, 400), height: 150 });
      } else if (width < 1024) {
        setCanvasSize({ width: 500, height: 180 });
      } else {
        setCanvasSize({ width: 600, height: 200 });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return canvasSize;
}
