import { Point } from './types';

export interface SignatureTemplate {
  id: string;
  name: string;
  strokes: Point[][];
}

export const SIGNATURE_TEMPLATES: SignatureTemplate[] = [
  {
    id: 'elegant-loop',
    name: 'Elegant Loop',
    strokes: [
      generateElegantLoop(),
    ],
  },
  {
    id: 'sharp-minimal',
    name: 'Sharp Minimal',
    strokes: [
      generateSharpMinimal(),
    ],
  },
  {
    id: 'flowing-cursive',
    name: 'Flowing Cursive',
    strokes: [
      generateFlowingCursive(),
    ],
  },
  {
    id: 'bold-initials',
    name: 'Bold Initials',
    strokes: [
      generateBoldInitials(),
    ],
  },
  {
    id: 'simple-line',
    name: 'Simple Line',
    strokes: [
      generateSimpleLine(),
    ],
  },
];

function generateElegantLoop(): Point[] {
  const points: Point[] = [];
  for (let t = 0; t <= 1; t += 0.02) {
    points.push({
      x: 100 + t * 300,
      y: 100 + Math.sin(t * Math.PI * 2) * 30 + t * 20,
      pressure: 0.5 + Math.sin(t * Math.PI) * 0.3,
    });
  }
  return points;
}

function generateSharpMinimal(): Point[] {
  const points: Point[] = [];
  points.push({ x: 100, y: 120, pressure: 0.8 });
  points.push({ x: 200, y: 80, pressure: 0.6 });
  points.push({ x: 300, y: 110, pressure: 0.4 });
  points.push({ x: 400, y: 90, pressure: 0.3 });
  return points;
}

function generateFlowingCursive(): Point[] {
  const points: Point[] = [];
  for (let t = 0; t <= 1; t += 0.01) {
    const x = 100 + t * 300;
    const y = 100 + Math.sin(t * Math.PI * 3) * 25 + Math.sin(t * Math.PI * 1.5) * 15;
    points.push({ x, y, pressure: 0.5 + Math.sin(t * Math.PI * 2) * 0.2 });
  }
  return points;
}

function generateBoldInitials(): Point[] {
  const points: Point[] = [];
  for (let t = 0; t <= 0.3; t += 0.02) {
    points.push({
      x: 100 + t * 100,
      y: 100 + Math.sin(t * Math.PI) * 40,
      pressure: 0.8,
    });
  }
  for (let t = 0; t <= 0.3; t += 0.02) {
    points.push({
      x: 250 + t * 150,
      y: 100 + Math.sin(t * Math.PI) * 30,
      pressure: 0.6,
    });
  }
  return points;
}

function generateSimpleLine(): Point[] {
  const points: Point[] = [];
  for (let t = 0; t <= 1; t += 0.05) {
    points.push({
      x: 100 + t * 300,
      y: 100 + t * 10,
      pressure: 0.5,
    });
  }
  return points;
}
