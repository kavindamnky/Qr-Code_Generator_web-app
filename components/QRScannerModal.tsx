'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, Camera, Copy, ExternalLink, Check, AlertCircle } from 'lucide-react';
import jsQR from 'jsqr';

interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadPayload?: (text: string) => void;
}

export const QRScannerModal: React.FC<QRScannerModalProps> = ({
  isOpen,
  onClose,
  onLoadPayload,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'camera'>('upload');
  const [decodedResult, setDecodedResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Stop camera when closing modal or switching tab
  useEffect(() => {
    if (!isOpen || activeTab !== 'camera') {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isOpen, activeTab]);

  const stopCamera = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const startCamera = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', 'true');
        await videoRef.current.play();
        setCameraActive(true);
        scanFrame();
      }
    } catch (err: any) {
      setError('Camera access was denied or is not supported in this browser.');
      setCameraActive(false);
    }
  };

  const scanFrame = () => {
    if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code) {
          setDecodedResult(code.data);
          stopCamera();
          return;
        }
      }
    }
    animFrameRef.current = requestAnimationFrame(scanFrame);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setError('Failed to process image context.');
        return;
      }
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (code) {
        setDecodedResult(code.data);
      } else {
        setError('No QR code could be found in this image. Please try a clearer picture.');
      }
    };
    img.src = URL.createObjectURL(file);
  };

  const copyResult = async () => {
    if (!decodedResult) return;
    await navigator.clipboard.writeText(decodedResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-800 transition-colors">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">QR Code Scanner & Decoder</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60">
          <button
            onClick={() => {
              setActiveTab('upload');
              stopCamera();
            }}
            className={`flex-1 py-3 text-xs font-bold flex items-center justify-center space-x-2 border-b-2 transition-colors ${
              activeTab === 'upload'
                ? 'border-brand-600 dark:border-brand-500 text-brand-600 dark:text-brand-400 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Upload QR Image</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('camera');
              startCamera();
            }}
            className={`flex-1 py-3 text-xs font-bold flex items-center justify-center space-x-2 border-b-2 transition-colors ${
              activeTab === 'camera'
                ? 'border-brand-600 dark:border-brand-500 text-brand-600 dark:text-brand-400 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Webcam / Camera</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {activeTab === 'upload' && (
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-brand-600 dark:hover:border-brand-500 rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-colors bg-slate-50/50 dark:bg-slate-950/40">
              <Upload className="w-10 h-10 text-brand-600 dark:text-brand-400 mb-3" />
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                Upload or drop QR Code image here
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mb-4">Supports PNG, JPG, WEBP, and SVG</p>
              <label className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl cursor-pointer shadow-sm transition-colors">
                Browse Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          )}

          {activeTab === 'camera' && (
            <div className="relative rounded-2xl overflow-hidden bg-black aspect-square flex items-center justify-center">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay
                playsInline
                muted
              />
              {cameraActive && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-48 h-48 border-2 border-brand-400 rounded-2xl ring-4 ring-black/30 animate-pulse" />
                </div>
              )}
              {!cameraActive && (
                <button
                  onClick={startCamera}
                  className="px-4 py-2 bg-brand-600 text-white rounded-xl text-xs font-bold shadow-md"
                >
                  Enable Camera
                </button>
              )}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 rounded-xl text-xs text-red-700 dark:text-red-400 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Result Card */}
          {decodedResult && (
            <div className="p-4 bg-brand-50/60 dark:bg-slate-800/80 border border-brand-200 dark:border-slate-700 rounded-xl space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300">
                  Decoded Result:
                </span>
                <button
                  onClick={copyResult}
                  className="flex items-center space-x-1 text-xs font-semibold text-brand-700 dark:text-brand-300 hover:text-brand-900 dark:hover:text-white bg-white dark:bg-slate-700 px-2 py-1 rounded-md border border-brand-200 dark:border-slate-600 shadow-sm"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200 break-all max-h-36 overflow-y-auto select-all">
                {decodedResult}
              </div>

              <div className="flex items-center space-x-2 pt-1">
                {decodedResult.startsWith('http://') || decodedResult.startsWith('https://') ? (
                  <a
                    href={decodedResult}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2 text-center text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-lg flex items-center justify-center space-x-1.5"
                  >
                    <span>Open Link</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : null}

                {onLoadPayload && (
                  <button
                    onClick={() => {
                      onLoadPayload(decodedResult);
                      onClose();
                    }}
                    className="flex-1 py-2 text-center text-xs font-bold text-brand-700 dark:text-brand-300 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 border border-brand-300 dark:border-slate-600 rounded-lg"
                  >
                    Load into Generator
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
