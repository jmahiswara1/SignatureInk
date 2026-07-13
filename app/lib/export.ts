import { jsPDF } from 'jspdf';
import { ExportOptions, PaperTheme, CaptionDetails } from './types';

function createExportCanvas(
  canvas: HTMLCanvasElement,
  options: ExportOptions,
  theme: PaperTheme,
  caption?: CaptionDetails
): HTMLCanvasElement {
  const { withBackground, withCaption, scale } = options;

  const exportCanvas = document.createElement('canvas');
  const ctx = exportCanvas.getContext('2d')!;

  const padding = 40 * scale;
  const captionHeight = withCaption && caption ? 100 * scale : 0;

  exportCanvas.width = canvas.width * scale + padding * 2;
  exportCanvas.height = canvas.height * scale + padding * 2 + captionHeight;

  if (withBackground) {
    ctx.fillStyle = theme === 'dark' ? '#1a1a1a' : '#ffffff';
    ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
  }

  ctx.drawImage(canvas, padding, padding, canvas.width * scale, canvas.height * scale);

  if (withCaption && caption) {
    ctx.fillStyle = theme === 'dark' ? '#ffffff' : '#000000';
    ctx.textAlign = 'left';

    const baseY = canvas.height * scale + padding + 20 * scale;

    if (caption.name) {
      ctx.font = `bold ${14 * scale}px monospace`;
      ctx.fillText(caption.name, padding, baseY);
    }

    if (caption.title) {
      ctx.font = `${12 * scale}px monospace`;
      ctx.fillText(caption.title, padding, baseY + 20 * scale);
    }

    if (caption.date) {
      ctx.font = `${10 * scale}px monospace`;
      ctx.globalAlpha = 0.6;
      ctx.fillText(caption.date, padding, baseY + 40 * scale);
      ctx.globalAlpha = 1;
    }

    if (caption.notes) {
      ctx.font = `${10 * scale}px monospace`;
      ctx.globalAlpha = 0.5;
      const maxWidth = exportCanvas.width - padding * 2;
      wrapText(ctx, caption.notes, padding, baseY + 60 * scale, maxWidth, 14 * scale);
      ctx.globalAlpha = 1;
    }
  }

  return exportCanvas;
}

export async function exportSignature(
  canvas: HTMLCanvasElement,
  options: ExportOptions,
  theme: PaperTheme,
  caption?: CaptionDetails
): Promise<void> {
  const { format, quality } = options;
  const exportCanvas = createExportCanvas(canvas, options, theme, caption);

  switch (format) {
    case 'png':
      downloadCanvas(exportCanvas, 'signature.png', 'image/png');
      break;
    case 'jpg':
      downloadCanvas(exportCanvas, 'signature.jpg', 'image/jpeg', quality);
      break;
    case 'pdf':
      exportPDF(exportCanvas);
      break;
  }
}

export async function copySignatureToClipboard(
  canvas: HTMLCanvasElement,
  format: 'png' | 'jpg',
  options: ExportOptions,
  theme: PaperTheme,
  caption?: CaptionDetails
): Promise<boolean> {
  try {
    const exportCanvas = createExportCanvas(canvas, options, theme, caption);
    const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';

    const blob = await new Promise<Blob | null>((resolve) => {
      exportCanvas.toBlob(resolve, mimeType, options.quality);
    });

    if (!blob) return false;

    await navigator.clipboard.write([
      new ClipboardItem({ [mimeType]: blob }),
    ]);

    return true;
  } catch {
    return false;
  }
}

function downloadCanvas(canvas: HTMLCanvasElement, filename: string, mimeType: string, quality?: number): void {
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL(mimeType, quality);
  link.click();
}

function exportPDF(canvas: HTMLCanvasElement): void {
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
    unit: 'px',
    format: [canvas.width, canvas.height],
  });

  pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
  pdf.save('signature.pdf');
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): void {
  const words = text.split(' ');
  let line = '';
  let currentY = y;

  for (const word of words) {
    const testLine = line + (line ? ' ' : '') + word;
    const metrics = ctx.measureText(testLine);

    if (metrics.width > maxWidth && line) {
      ctx.fillText(line, x, currentY);
      line = word;
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }

  if (line) {
    ctx.fillText(line, x, currentY);
  }
}
