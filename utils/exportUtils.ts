import { QRStyleOptions } from '@/types/qr';
import confetti from 'canvas-confetti';

export function fireConfetti() {
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#00519d', '#3999db', '#7cbbe8', '#ffffff', '#002e5a'],
  });
}

/**
 * Draws the QR code and any selected frame (e.g. "SCAN ME") onto a canvas
 */
export async function renderFramedCanvas(
  rawCanvas: HTMLCanvasElement,
  options: QRStyleOptions
): Promise<HTMLCanvasElement> {
  const { frameType, frameText, frameColor, frameTextColor, bgColor, isTransparentBg } = options;

  if (frameType === 'none') {
    return rawCanvas;
  }

  const qrSize = rawCanvas.width;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return rawCanvas;

  const text = (frameText || 'SCAN ME').toUpperCase();
  const fontSize = Math.max(16, Math.round(qrSize * 0.065));
  const font = `bold ${fontSize}px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;

  switch (frameType) {
    case 'bottom-badge': {
      const bannerHeight = Math.round(qrSize * 0.16);
      const totalWidth = qrSize;
      const totalHeight = qrSize + bannerHeight;

      canvas.width = totalWidth;
      canvas.height = totalHeight;

      // Draw background
      if (!isTransparentBg) {
        ctx.fillStyle = bgColor || '#ffffff';
        ctx.fillRect(0, 0, totalWidth, totalHeight);
      }

      // Draw QR code
      ctx.drawImage(rawCanvas, 0, 0);

      // Draw badge background
      ctx.fillStyle = frameColor || '#00519d';
      ctx.fillRect(0, qrSize, totalWidth, bannerHeight);

      // Draw text
      ctx.font = font;
      ctx.fillStyle = frameTextColor || '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, totalWidth / 2, qrSize + bannerHeight / 2);
      break;
    }

    case 'bottom-pill': {
      const padding = Math.round(qrSize * 0.08);
      const pillHeight = Math.round(qrSize * 0.14);
      const totalWidth = qrSize + padding * 2;
      const totalHeight = qrSize + padding * 2 + pillHeight;

      canvas.width = totalWidth;
      canvas.height = totalHeight;

      // Draw card background
      ctx.fillStyle = isTransparentBg ? '#ffffff' : bgColor || '#ffffff';
      ctx.fillRect(0, 0, totalWidth, totalHeight);

      // Draw QR code centered
      ctx.drawImage(rawCanvas, padding, padding);

      // Draw pill shape
      const pillW = totalWidth - padding * 2;
      const pillX = padding;
      const pillY = qrSize + padding * 1.2;
      const radius = pillHeight / 2;

      ctx.fillStyle = frameColor || '#00519d';
      ctx.beginPath();
      ctx.roundRect(pillX, pillY, pillW, pillHeight, radius);
      ctx.fill();

      // Draw text
      ctx.font = font;
      ctx.fillStyle = frameTextColor || '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, totalWidth / 2, pillY + pillHeight / 2);
      break;
    }

    case 'top-badge': {
      const bannerHeight = Math.round(qrSize * 0.16);
      const totalWidth = qrSize;
      const totalHeight = qrSize + bannerHeight;

      canvas.width = totalWidth;
      canvas.height = totalHeight;

      // Draw banner
      ctx.fillStyle = frameColor || '#00519d';
      ctx.fillRect(0, 0, totalWidth, bannerHeight);

      // Draw text
      ctx.font = font;
      ctx.fillStyle = frameTextColor || '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, totalWidth / 2, bannerHeight / 2);

      // Draw background behind QR
      if (!isTransparentBg) {
        ctx.fillStyle = bgColor || '#ffffff';
        ctx.fillRect(0, bannerHeight, totalWidth, qrSize);
      }

      // Draw QR
      ctx.drawImage(rawCanvas, 0, bannerHeight);
      break;
    }

    case 'polaroid': {
      const border = Math.round(qrSize * 0.07);
      const bottomArea = Math.round(qrSize * 0.22);
      const totalWidth = qrSize + border * 2;
      const totalHeight = qrSize + border + bottomArea;

      canvas.width = totalWidth;
      canvas.height = totalHeight;

      // Polaroid white background with subtle border
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, totalWidth, totalHeight);

      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 2;
      ctx.strokeRect(1, 1, totalWidth - 2, totalHeight - 2);

      // Draw QR
      ctx.drawImage(rawCanvas, border, border);

      // Draw handwritten/clean label
      ctx.font = `600 ${fontSize}px system-ui, sans-serif`;
      ctx.fillStyle = frameTextColor || '#00519d';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, totalWidth / 2, qrSize + border + bottomArea / 2);
      break;
    }

    case 'bordered': {
      const border = Math.round(qrSize * 0.05);
      const totalWidth = qrSize + border * 2;
      const totalHeight = qrSize + border * 2;

      canvas.width = totalWidth;
      canvas.height = totalHeight;

      ctx.fillStyle = isTransparentBg ? 'transparent' : bgColor || '#ffffff';
      ctx.fillRect(0, 0, totalWidth, totalHeight);

      ctx.drawImage(rawCanvas, border, border);

      ctx.strokeStyle = frameColor || '#00519d';
      ctx.lineWidth = border / 2;
      ctx.strokeRect(border / 4, border / 4, totalWidth - border / 2, totalHeight - border / 2);
      break;
    }

    default:
      return rawCanvas;
  }

  return canvas;
}

export async function downloadCanvasAsPng(canvas: HTMLCanvasElement, filename = 'm-qr-code.png') {
  const url = canvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  fireConfetti();
}

export async function copyCanvasToClipboard(canvas: HTMLCanvasElement): Promise<boolean> {
  try {
    return new Promise((resolve) => {
      canvas.toBlob(async (blob) => {
        if (!blob) {
          resolve(false);
          return;
        }
        try {
          await navigator.clipboard.write([
            new ClipboardItem({
              [blob.type]: blob,
            }),
          ]);
          fireConfetti();
          resolve(true);
        } catch {
          resolve(false);
        }
      });
    });
  } catch {
    return false;
  }
}

export async function downloadAsPdf(
  canvas: HTMLCanvasElement,
  title = 'M-QR Code',
  filename = 'm-qr-code.pdf'
) {
  const { jsPDF } = await import('jspdf');
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Header banner (#00519d)
  pdf.setFillColor(0, 81, 157);
  pdf.rect(0, 0, pageWidth, 28, 'F');

  pdf.setTextColor(255, 255, 255);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(18);
  pdf.text('M-QR Code Generator', pageWidth / 2, 14, { align: 'center' });
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text('High Resolution Printable QR Code', pageWidth / 2, 21, { align: 'center' });

  // Center QR code image
  const imgData = canvas.toDataURL('image/png');
  const qrMmSize = 100;
  const qrX = (pageWidth - qrMmSize) / 2;
  const qrY = 60;

  // Add light card background
  pdf.setFillColor(248, 250, 252);
  pdf.setDrawColor(226, 232, 240);
  pdf.roundedRect(qrX - 10, qrY - 10, qrMmSize + 20, qrMmSize + 20, 4, 4, 'FD');

  pdf.addImage(imgData, 'PNG', qrX, qrY, qrMmSize, qrMmSize);

  // Title / Label under QR
  pdf.setTextColor(15, 23, 42);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(14);
  pdf.text(title || 'Scan with your smartphone camera', pageWidth / 2, qrY + qrMmSize + 22, {
    align: 'center',
  });

  // Footer note
  pdf.setTextColor(100, 116, 139);
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9);
  pdf.text(
    'Generated by M-QR Pro • https://m-qr.builds • M"Builds Studios',
    pageWidth / 2,
    pageHeight - 12,
    { align: 'center' }
  );

  pdf.save(filename);
  fireConfetti();
}
