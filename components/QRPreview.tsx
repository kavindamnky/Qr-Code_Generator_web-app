'use client';

import React, { useEffect, useRef, useState } from 'react';
import { QRStyleOptions } from '@/types/qr';
import {
  downloadCanvasAsPng,
  copyCanvasToClipboard,
  downloadAsPdf,
  renderFramedCanvas,
  fireConfetti,
} from '@/utils/exportUtils';
import {
  Download,
  Copy,
  Check,
  Share2,
  FileCode,
  FileText,
  Eye,
  AlertCircle,
} from 'lucide-react';

interface QRPreviewProps {
  payload: string;
  style: QRStyleOptions;
  title: string;
  onSaveHistory: (previewDataUrl?: string) => void;
}

export const QRPreview: React.FC<QRPreviewProps> = ({
  payload,
  style,
  title,
  onSaveHistory,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const qrCodeInstanceRef = useRef<any>(null);
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Initialize and update qr-code-styling
  useEffect(() => {
    let isMounted = true;

    async function initQRCode() {
      if (!payload) return;

      try {
        const QRCodeStyling = (await import('qr-code-styling')).default;

        const qrOptions: any = {
          width: 320,
          height: 320,
          data: payload,
          margin: style.margin,
          qrOptions: {
            typeNumber: 0,
            mode: 'Byte',
            errorCorrectionLevel: style.errorCorrectionLevel,
          },
          imageOptions: {
            hideBackgroundDots: true,
            imageSize: style.logoSize,
            margin: style.logoMargin,
            crossOrigin: 'anonymous',
          },
          dotsOptions: {
            type: style.dotType,
            color: style.useGradient ? undefined : style.fgColor,
            gradient: style.useGradient
              ? {
                  type: style.gradientType,
                  rotation: (style.gradientRotation * Math.PI) / 180,
                  colorStops: [
                    { offset: 0, color: style.fgColor },
                    { offset: 1, color: style.gradientColor2 },
                  ],
                }
              : undefined,
          },
          backgroundOptions: {
            color: style.isTransparentBg ? 'transparent' : style.bgColor,
          },
          cornersSquareOptions: {
            type: style.cornerSquareType,
            color: style.customEyeColors ? style.cornerSquareColor : style.fgColor,
          },
          cornersDotOptions: {
            type: style.cornerDotType,
            color: style.customEyeColors ? style.cornerDotColor : style.fgColor,
          },
        };

        if (style.logoUrl) {
          qrOptions.image = style.logoUrl;
        } else {
          qrOptions.image = undefined;
        }

        if (!qrCodeInstanceRef.current) {
          qrCodeInstanceRef.current = new QRCodeStyling(qrOptions);
          if (containerRef.current && isMounted) {
            containerRef.current.innerHTML = '';
            qrCodeInstanceRef.current.append(containerRef.current);
          }
        } else {
          qrCodeInstanceRef.current.update(qrOptions);
        }

        setErrorMessage(null);
      } catch (err: any) {
        console.error('Error generating QR code:', err);
        setErrorMessage('Failed to generate QR code with current options.');
      }
    }

    initQRCode();

    return () => {
      isMounted = false;
    };
  }, [payload, style]);

  // Helper to get raw canvas from qr-code-styling or export
  const getRenderedCanvas = async (exportSize?: number): Promise<HTMLCanvasElement | null> => {
    if (!qrCodeInstanceRef.current || !payload) return null;

    const QRCodeStyling = (await import('qr-code-styling')).default;
    const targetSize = exportSize || style.size || 500;

    const exportOptions: any = {
      width: targetSize,
      height: targetSize,
      data: payload,
      margin: style.margin,
      qrOptions: {
        typeNumber: 0,
        mode: 'Byte',
        errorCorrectionLevel: style.errorCorrectionLevel,
      },
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: style.logoSize,
        margin: style.logoMargin,
        crossOrigin: 'anonymous',
      },
      dotsOptions: {
        type: style.dotType,
        color: style.useGradient ? undefined : style.fgColor,
        gradient: style.useGradient
          ? {
              type: style.gradientType,
              rotation: (style.gradientRotation * Math.PI) / 180,
              colorStops: [
                { offset: 0, color: style.fgColor },
                { offset: 1, color: style.gradientColor2 },
              ],
            }
          : undefined,
      },
      backgroundOptions: {
        color: style.isTransparentBg ? 'transparent' : style.bgColor,
      },
      cornersSquareOptions: {
        type: style.cornerSquareType,
        color: style.customEyeColors ? style.cornerSquareColor : style.fgColor,
      },
      cornersDotOptions: {
        type: style.cornerDotType,
        color: style.customEyeColors ? style.cornerDotColor : style.fgColor,
      },
    };

    if (style.logoUrl) {
      exportOptions.image = style.logoUrl;
    }

    const exportQR = new QRCodeStyling(exportOptions);
    const blob = await exportQR.getRawData('png');
    if (!blob) return null;

    return new Promise((resolve) => {
      const img = new Image();
      img.onload = async () => {
        const canvas = document.createElement('canvas');
        canvas.width = targetSize;
        canvas.height = targetSize;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const framedCanvas = await renderFramedCanvas(canvas, style);
          resolve(framedCanvas);
        } else {
          resolve(null);
        }
      };
      img.src = URL.createObjectURL(blob as Blob);
    });
  };

  const handleDownloadPng = async () => {
    if (!payload) return;
    setIsExporting(true);
    try {
      const canvas = await getRenderedCanvas();
      if (canvas) {
        await downloadCanvasAsPng(canvas, `m-qr-${Date.now()}.png`);
        onSaveHistory(canvas.toDataURL('image/png'));
      }
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadSvg = async () => {
    if (!qrCodeInstanceRef.current || !payload) return;
    setIsExporting(true);
    try {
      await qrCodeInstanceRef.current.download({
        name: `m-qr-${Date.now()}`,
        extension: 'svg',
      });
      fireConfetti();
      onSaveHistory();
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadPdf = async () => {
    if (!payload) return;
    setIsExporting(true);
    try {
      const canvas = await getRenderedCanvas(600);
      if (canvas) {
        await downloadAsPdf(canvas, title || 'M-QR Code', `m-qr-${Date.now()}.pdf`);
        onSaveHistory(canvas.toDataURL('image/png'));
      }
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyClipboard = async () => {
    if (!payload) return;
    setIsExporting(true);
    try {
      const canvas = await getRenderedCanvas();
      if (canvas) {
        const success = await copyCanvasToClipboard(canvas);
        if (success) {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
          onSaveHistory(canvas.toDataURL('image/png'));
        }
      }
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = async () => {
    if (!navigator.share || !payload) return;
    try {
      const canvas = await getRenderedCanvas();
      if (canvas) {
        canvas.toBlob(async (blob) => {
          if (!blob) return;
          const file = new File([blob], 'm-qr.png', { type: 'image/png' });
          await navigator.share({
            title: title || 'M-QR Code',
            text: 'Here is your custom M-QR Code',
            files: [file],
          });
        });
      }
    } catch {
      // User dismissed share
    }
  };

  const hasPayload = Boolean(payload && payload.trim().length > 0);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-brand space-y-5 sticky top-20 transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-black tracking-tight text-slate-900 dark:text-white flex items-center">
          <Eye className="w-5 h-5 text-brand-600 dark:text-brand-400 mr-2" /> Live QR Preview
        </h3>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700">
          {style.size}×{style.size}px
        </span>
      </div>

      {/* Frame / Visual Container */}
      <div className="relative flex flex-col items-center justify-center p-4 sm:p-6 bg-slate-50/70 dark:bg-slate-950/70 rounded-2xl border border-slate-200/80 dark:border-slate-800 min-h-[360px] overflow-hidden transition-colors">
        {hasPayload ? (
          <div
            className={`transition-all duration-300 flex flex-col items-center justify-center ${
              style.frameType === 'polaroid'
                ? 'bg-white p-4 pb-6 rounded-xl shadow-lg border border-slate-200'
                : style.frameType === 'bottom-pill'
                ? 'bg-white p-4 pb-5 rounded-2xl shadow-md border border-slate-200'
                : style.frameType === 'bordered'
                ? 'p-2 rounded-xl shadow-md'
                : ''
            }`}
            style={{
              borderColor: style.frameType === 'bordered' ? style.frameColor : undefined,
              borderWidth: style.frameType === 'bordered' ? '6px' : undefined,
            }}
          >
            {/* Top Banner Frame */}
            {style.frameType === 'top-badge' && (
              <div
                className="w-full py-2 px-4 rounded-t-xl text-center text-xs font-bold tracking-wider uppercase mb-1 shadow-sm"
                style={{
                  backgroundColor: style.frameColor,
                  color: style.frameTextColor,
                }}
              >
                {style.frameText || 'SCAN ME'}
              </div>
            )}

            {/* QR Canvas Container */}
            <div
              ref={containerRef}
              className="flex items-center justify-center max-w-full [&>svg]:max-w-full [&>svg]:h-auto [&>canvas]:max-w-full [&>canvas]:h-auto"
            />

            {/* Bottom Badge Frame */}
            {style.frameType === 'bottom-badge' && (
              <div
                className="w-full py-2 px-4 rounded-b-xl text-center text-xs font-bold tracking-wider uppercase mt-1 shadow-sm"
                style={{
                  backgroundColor: style.frameColor,
                  color: style.frameTextColor,
                }}
              >
                {style.frameText || 'SCAN ME'}
              </div>
            )}

            {/* Bottom Pill Frame */}
            {style.frameType === 'bottom-pill' && (
              <div
                className="mt-3 px-6 py-1.5 rounded-full text-center text-xs font-bold tracking-wider uppercase shadow-sm"
                style={{
                  backgroundColor: style.frameColor,
                  color: style.frameTextColor,
                }}
              >
                {style.frameText || 'SCAN ME'}
              </div>
            )}

            {/* Polaroid Frame Text */}
            {style.frameType === 'polaroid' && (
              <div
                className="mt-3 text-center text-sm font-bold tracking-wide"
                style={{ color: style.frameTextColor }}
              >
                {style.frameText || 'SCAN ME'}
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-6 space-y-3 text-slate-400 dark:text-slate-500">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-300 dark:text-slate-600">
              <AlertCircle className="w-8 h-8" />
            </div>
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Enter Content to Generate QR</p>
            <p className="text-xs max-w-xs text-slate-400 dark:text-slate-500">
              Fill in the input fields on the left to instantly see your custom QR code preview.
            </p>
          </div>
        )}

        {errorMessage && (
          <div className="mt-3 text-xs text-red-600 bg-red-50 dark:bg-red-950/40 p-2 rounded-lg border border-red-200 dark:border-red-900/50">
            {errorMessage}
          </div>
        )}
      </div>

      {/* Payload Summary info */}
      {hasPayload && (
        <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200/60 dark:border-slate-700 text-xs transition-colors">
          <div className="flex justify-between items-center text-slate-500 dark:text-slate-400 font-semibold mb-1">
            <span>Encoded Payload</span>
            <span>{payload.length} chars</span>
          </div>
          <p className="font-mono text-[11px] text-slate-700 dark:text-slate-200 truncate select-all">{payload}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-2.5">
        {/* Primary PNG Download */}
        <button
          onClick={handleDownloadPng}
          disabled={!hasPayload || isExporting}
          className="w-full py-3.5 px-4 bg-brand-600 hover:bg-brand-700 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none text-white font-bold rounded-xl shadow-brand hover:shadow-brand-lg transition-all duration-200 flex items-center justify-center space-x-2 group hover:-translate-y-0.5"
        >
          <Download className="w-5 h-5 transition-transform duration-200 group-hover:translate-y-0.5 group-hover:scale-110" />
          <span>Download PNG Image</span>
        </button>

        {/* Secondary Downloads (SVG & PDF) */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleDownloadSvg}
            disabled={!hasPayload || isExporting}
            className="py-2.5 px-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 disabled:opacity-50 disabled:pointer-events-none font-semibold rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 active:scale-95 border border-slate-200 dark:border-slate-700 group"
          >
            <FileCode className="w-4 h-4 text-brand-600 dark:text-brand-400 transition-transform group-hover:scale-110" />
            <span>Vector (SVG)</span>
          </button>

          <button
            onClick={handleDownloadPdf}
            disabled={!hasPayload || isExporting}
            className="py-2.5 px-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 disabled:opacity-50 disabled:pointer-events-none font-semibold rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 active:scale-95 border border-slate-200 dark:border-slate-700 group"
          >
            <FileText className="w-4 h-4 text-red-600 dark:text-red-400 transition-transform group-hover:scale-110" />
            <span>Print Sheet (PDF)</span>
          </button>
        </div>

        {/* Copy to Clipboard & Native Share */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleCopyClipboard}
            disabled={!hasPayload || isExporting}
            className="py-2.5 px-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 disabled:opacity-50 disabled:pointer-events-none font-semibold rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 active:scale-95 border border-slate-200 dark:border-slate-700 shadow-sm group"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-700 dark:text-emerald-300 font-bold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-600 dark:text-slate-300 transition-transform group-hover:scale-110" />
                <span>Copy Image</span>
              </>
            )}
          </button>

          {typeof navigator !== 'undefined' && 'share' in navigator ? (
            <button
              onClick={handleShare}
              disabled={!hasPayload || isExporting}
              className="py-2.5 px-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 disabled:opacity-50 disabled:pointer-events-none font-semibold rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 active:scale-95 border border-slate-200 dark:border-slate-700 shadow-sm group"
            >
              <Share2 className="w-4 h-4 text-slate-600 dark:text-slate-300 transition-transform group-hover:scale-110" />
              <span>Share QR</span>
            </button>
          ) : (
            <div className="py-2.5 px-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-xs text-slate-400 dark:text-slate-500 font-medium text-center border border-slate-200/50 dark:border-slate-700/50 flex items-center justify-center">
              100% Client-Side
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
