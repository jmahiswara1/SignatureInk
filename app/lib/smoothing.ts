import { Point } from './types';

export function smoothPoints(points: Point[], smoothing: number): Point[] {
  if (points.length < 3) return points;

  const result: Point[] = [points[0]];
  const strength = smoothing * 0.5;

  for (let i = 1; i < points.length - 1; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const next = points[i + 1];

    result.push({
      x: curr.x + (prev.x + next.x - 2 * curr.x) * strength,
      y: curr.y + (prev.y + next.y - 2 * curr.y) * strength,
      pressure: curr.pressure,
      timestamp: curr.timestamp,
    });
  }

  result.push(points[points.length - 1]);
  return result;
}

export function getStrokeWidth(
  baseWidth: number,
  pressure: number | undefined,
  speed: number,
  pressureSensitivity: boolean
): number {
  if (!pressureSensitivity) return baseWidth;

  const pressureFactor = pressure !== undefined ? pressure : 0.5;
  const speedFactor = Math.max(0.3, Math.min(1, 1 - speed * 0.002));

  return baseWidth * pressureFactor * speedFactor;
}

export function drawSmoothLine(
  ctx: CanvasRenderingContext2D,
  points: Point[],
  settings: { color: string; width: number; opacity: number; smoothing: number; pressureSensitivity: boolean }
) {
  if (points.length < 2) return;

  const smoothed = smoothPoints(points, settings.smoothing);

  ctx.strokeStyle = settings.color;
  ctx.globalAlpha = settings.opacity;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  ctx.beginPath();
  ctx.moveTo(smoothed[0].x, smoothed[0].y);

  if (smoothed.length === 2) {
    ctx.lineTo(smoothed[1].x, smoothed[1].y);
  } else {
    for (let i = 1; i < smoothed.length - 1; i++) {
      const xc = (smoothed[i].x + smoothed[i + 1].x) / 2;
      const yc = (smoothed[i].y + smoothed[i + 1].y) / 2;
      ctx.quadraticCurveTo(smoothed[i].x, smoothed[i].y, xc, yc);
    }
    const last = smoothed[smoothed.length - 1];
    ctx.lineTo(last.x, last.y);
  }

  const avgPressure = points.reduce((sum, p) => sum + (p.pressure || 0.5), 0) / points.length;
  const avgSpeed = calculateSpeed(points);
  ctx.lineWidth = getStrokeWidth(settings.width, avgPressure, avgSpeed, settings.pressureSensitivity);

  ctx.stroke();
  ctx.globalAlpha = 1;
}

function calculateSpeed(points: Point[]): number {
  if (points.length < 2) return 0;

  let totalDist = 0;
  for (let i = 1; i < points.length; i++) {
    const dx = points[i].x - points[i - 1].x;
    const dy = points[i].y - points[i - 1].y;
    totalDist += Math.sqrt(dx * dx + dy * dy);
  }

  const time = (points[points.length - 1].timestamp || 0) - (points[0].timestamp || 0);
  return time > 0 ? totalDist / time : 0;
}
