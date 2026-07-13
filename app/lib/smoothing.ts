import { Point } from './types';

function distance(a: Point, b: Point): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function interpolatePoints(points: Point[], smoothing: number): Point[] {
  if (points.length < 2) return points;

  const maxDistance = 20 - smoothing * 15;
  const result: Point[] = [points[0]];

  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const dist = distance(prev, curr);

    if (dist > maxDistance) {
      const steps = Math.ceil(dist / maxDistance);
      for (let s = 1; s <= steps; s++) {
        const t = s / steps;
        result.push({
          x: prev.x + (curr.x - prev.x) * t,
          y: prev.y + (curr.y - prev.y) * t,
          pressure: (prev.pressure || 0.5) + ((curr.pressure || 0.5) - (prev.pressure || 0.5)) * t,
          timestamp: (prev.timestamp || 0) + ((curr.timestamp || 0) - (prev.timestamp || 0)) * t,
        });
      }
    } else {
      result.push(curr);
    }
  }

  return result;
}

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

function catmullRomPoint(p0: Point, p1: Point, p2: Point, p3: Point, t: number): Point {
  const t2 = t * t;
  const t3 = t2 * t;

  return {
    x: 0.5 * ((2 * p1.x) + (-p0.x + p2.x) * t + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
    y: 0.5 * ((2 * p1.y) + (-p0.y + p2.y) * t + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3),
    pressure: p1.pressure,
    timestamp: p1.timestamp,
  };
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

  const interpolated = interpolatePoints(points, settings.smoothing);
  const smoothed = smoothPoints(interpolated, settings.smoothing);

  ctx.strokeStyle = settings.color;
  ctx.globalAlpha = settings.opacity;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  ctx.beginPath();
  ctx.moveTo(smoothed[0].x, smoothed[0].y);

  if (smoothed.length === 2) {
    ctx.lineTo(smoothed[1].x, smoothed[1].y);
  } else if (smoothed.length === 3) {
    ctx.quadraticCurveTo(smoothed[1].x, smoothed[1].y, smoothed[2].x, smoothed[2].y);
  } else {
    for (let i = 0; i < smoothed.length - 1; i++) {
      const p0 = smoothed[Math.max(0, i - 1)];
      const p1 = smoothed[i];
      const p2 = smoothed[Math.min(smoothed.length - 1, i + 1)];
      const p3 = smoothed[Math.min(smoothed.length - 1, i + 2)];

      const segments = 8;
      for (let s = 1; s <= segments; s++) {
        const t = s / segments;
        const point = catmullRomPoint(p0, p1, p2, p3, t);
        ctx.lineTo(point.x, point.y);
      }
    }
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
