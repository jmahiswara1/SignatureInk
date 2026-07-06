import { Point, PaperTheme } from './types';

export function getCanvasPoint(
  canvas: HTMLCanvasElement,
  event: MouseEvent | TouchEvent
): Point {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  let clientX: number, clientY: number;
  let pressure = 0.5;

  if ('touches' in event) {
    const touch = event.touches[0] || event.changedTouches[0];
    clientX = touch.clientX;
    clientY = touch.clientY;
    if ('force' in touch && (touch as any).force > 0) {
      pressure = (touch as any).force;
    }
  } else {
    clientX = event.clientX;
    clientY = event.clientY;
    if ('pressure' in event && (event as any).pressure > 0) {
      pressure = (event as any).pressure;
    }
  }

  return {
    x: (clientX - rect.left) * scaleX,
    y: (clientY - rect.top) * scaleY,
    pressure,
    timestamp: Date.now(),
  };
}

export function clearCanvas(canvas: HTMLCanvasElement): void {
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

export function drawBackground(
  canvas: HTMLCanvasElement,
  theme: PaperTheme
): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.fillStyle = theme === 'dark' ? '#1a1a1a' : '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

export function drawGuides(
  canvas: HTMLCanvasElement,
  theme: PaperTheme,
  type: 'baseline' | 'grid' | 'none'
): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const guideColor = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

  ctx.strokeStyle = guideColor;
  ctx.lineWidth = 1;

  if (type === 'baseline') {
    const baselineY = canvas.height * 0.7;
    ctx.beginPath();
    ctx.moveTo(0, baselineY);
    ctx.lineTo(canvas.width, baselineY);
    ctx.stroke();

    const topLineY = canvas.height * 0.3;
    ctx.beginPath();
    ctx.setLineDash([5, 5]);
    ctx.moveTo(0, topLineY);
    ctx.lineTo(canvas.width, topLineY);
    ctx.stroke();
    ctx.setLineDash([]);
  } else if (type === 'grid') {
    const gridSize = 20;
    for (let x = 0; x < canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  }
}

export function resizeCanvas(
  canvas: HTMLCanvasElement,
  width: number,
  height: number
): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  canvas.width = width;
  canvas.height = height;

  ctx.putImageData(imageData, 0, 0);
}
