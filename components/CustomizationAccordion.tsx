'use client';

import React, { useState } from 'react';
import {
  QRStyleOptions,
  DotType,
  CornerSquareType,
  CornerDotType,
  FrameType,
  ErrorCorrectionLevel,
} from '@/types/qr';
import {
  Palette,
  Shapes,
  Image as ImageIcon,
  Frame,
  Sliders,
  ChevronDown,
  Upload,
  X,
  Sparkles,
} from 'lucide-react';

interface CustomizationAccordionProps {
  style: QRStyleOptions;
  onChange: (updated: Partial<QRStyleOptions>) => void;
}

const COLOR_PRESETS = [
  { name: 'M-QR Blue', color: '#00519d' },
  { name: 'Navy Deep', color: '#092f58' },
  { name: 'Sky Electric', color: '#0072ce' },
  { name: 'Pitch Black', color: '#000000' },
  { name: 'Emerald', color: '#059669' },
  { name: 'Purple Dream', color: '#7c3aed' },
  { name: 'Crimson', color: '#dc2626' },
  { name: 'Midnight', color: '#1e293b' },
];

const DOT_OPTIONS: { id: DotType; label: string }[] = [
  { id: 'square', label: 'Classic Square' },
  { id: 'rounded', label: 'Smooth Rounded' },
  { id: 'dots', label: 'Circles / Dots' },
  { id: 'classy', label: 'Classy Rhombus' },
  { id: 'classy-rounded', label: 'Classy Rounded' },
  { id: 'extra-rounded', label: 'Extra Rounded' },
];

const CORNER_SQUARE_OPTIONS: { id: CornerSquareType; label: string }[] = [
  { id: 'square', label: 'Square' },
  { id: 'extra-rounded', label: 'Rounded' },
  { id: 'dot', label: 'Circle' },
];

const CORNER_DOT_OPTIONS: { id: CornerDotType; label: string }[] = [
  { id: 'square', label: 'Square' },
  { id: 'dot', label: 'Circle' },
];

const FRAME_OPTIONS: { id: FrameType; label: string }[] = [
  { id: 'none', label: 'Frameless' },
  { id: 'bottom-badge', label: 'Bottom Banner' },
  { id: 'bottom-pill', label: 'Pill Frame' },
  { id: 'top-badge', label: 'Top Banner' },
  { id: 'polaroid', label: 'Polaroid Card' },
  { id: 'bordered', label: 'Outer Border' },
];

const LOGO_PRESETS = [
  { name: 'M-QR Logo', url: '/images/01.png' },
  { name: 'M-QR Animated', url: '/images/logo_gif.gif' },
  {
    name: 'Link',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="%2300519d" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
  },
  {
    name: 'Wi-Fi',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="%2300519d" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13a10 10 0 0 1 14 0"/><path d="M8.5 16.5a5 5 0 0 1 7 0"/><path d="M2 8.82a15 15 0 0 1 20 0"/><line x1="12" x2="12.01" y1="20" y2="20"/></svg>',
  },
  {
    name: 'WhatsApp',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="%2325D366"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67Z"/></svg>',
  },
];

export const CustomizationAccordion: React.FC<CustomizationAccordionProps> = ({
  style,
  onChange,
}) => {
  const [openSection, setOpenSection] = useState<'colors' | 'shapes' | 'logo' | 'frame' | 'specs'>(
    'colors'
  );

  const toggleSection = (section: 'colors' | 'shapes' | 'logo' | 'frame' | 'specs') => {
    setOpenSection(openSection === section ? 'colors' : section);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onChange({ logoUrl: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden transition-all duration-200">
      {/* 1. Colors & Gradient Section */}
      <div>
        <button
          onClick={() => toggleSection('colors')}
          className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 transition-transform duration-200 group-hover:scale-110">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white transition-colors group-hover:text-brand-600 dark:group-hover:text-brand-400">Colors & Gradients</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Foreground, background, and eye colors</p>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-slate-400 dark:text-slate-500 transition-transform duration-200 ${
              openSection === 'colors' ? 'transform rotate-180 text-brand-600 dark:text-brand-400' : ''
            }`}
          />
        </button>

        {openSection === 'colors' && (
          <div className="p-5 bg-slate-50/50 dark:bg-slate-950/40 space-y-4 border-t border-slate-100 dark:border-slate-800">
            {/* Presets */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Color Presets</label>
              <div className="flex flex-wrap gap-2">
                {COLOR_PRESETS.map((p) => (
                  <button
                    key={p.color}
                    type="button"
                    onClick={() => onChange({ fgColor: p.color })}
                    className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-all duration-150 hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 active:scale-95 ${
                      style.fgColor === p.color
                        ? 'border-brand-600 dark:border-brand-500 bg-white dark:bg-slate-800 ring-2 ring-brand-500/20 font-bold text-brand-600 dark:text-brand-400'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/10 dark:border-white/10"
                      style={{ backgroundColor: p.color }}
                    />
                    <span>{p.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Foreground & Background Color */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  QR Pattern Color
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={style.fgColor}
                    onChange={(e) => onChange({ fgColor: e.target.value })}
                    className="w-9 h-9 rounded-lg cursor-pointer border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-0.5"
                  />
                  <input
                    type="text"
                    value={style.fgColor}
                    onChange={(e) => onChange({ fgColor: e.target.value })}
                    className="flex-1 px-3 py-1.5 text-xs font-mono font-medium uppercase bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white outline-none focus:border-brand-600 dark:focus:border-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Background Color
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={style.bgColor}
                    disabled={style.isTransparentBg}
                    onChange={(e) => onChange({ bgColor: e.target.value })}
                    className="w-9 h-9 rounded-lg cursor-pointer border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-0.5 disabled:opacity-50"
                  />
                  <input
                    type="text"
                    value={style.isTransparentBg ? 'Transparent' : style.bgColor}
                    disabled={style.isTransparentBg}
                    onChange={(e) => onChange({ bgColor: e.target.value })}
                    className="flex-1 px-3 py-1.5 text-xs font-mono font-medium uppercase bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white outline-none focus:border-brand-600 dark:focus:border-brand-500 disabled:bg-slate-100 dark:disabled:bg-slate-800/40 disabled:text-slate-400 dark:disabled:text-slate-500"
                  />
                </div>
                <label className="flex items-center space-x-2 text-xs text-slate-600 dark:text-slate-400 mt-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={style.isTransparentBg}
                    onChange={(e) => onChange({ isTransparentBg: e.target.checked })}
                    className="rounded text-brand-600 focus:ring-brand-500 border-slate-300 dark:border-slate-700 dark:bg-slate-800"
                  />
                  <span>Transparent Background</span>
                </label>
              </div>
            </div>

            {/* Gradient Options */}
            <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800">
              <label className="flex items-center justify-between cursor-pointer mb-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center">
                  <Sparkles className="w-3.5 h-3.5 mr-1 text-brand-600 dark:text-brand-400" /> Use Color Gradient
                </span>
                <input
                  type="checkbox"
                  checked={style.useGradient}
                  onChange={(e) => onChange({ useGradient: e.target.checked })}
                  className="rounded text-brand-600 focus:ring-brand-500 border-slate-300 dark:border-slate-700 dark:bg-slate-800"
                />
              </label>

              {style.useGradient && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">Secondary Color</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={style.gradientColor2}
                        onChange={(e) => onChange({ gradientColor2: e.target.value })}
                        className="w-8 h-8 rounded-lg cursor-pointer border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-0.5"
                      />
                      <input
                        type="text"
                        value={style.gradientColor2}
                        onChange={(e) => onChange({ gradientColor2: e.target.value })}
                        className="flex-1 px-2.5 py-1 text-xs font-mono uppercase bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">Gradient Type</label>
                    <select
                      value={style.gradientType}
                      onChange={(e) =>
                        onChange({ gradientType: e.target.value as 'linear' | 'radial' })
                      }
                      className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white outline-none focus:border-brand-600 dark:focus:border-brand-500"
                    >
                      <option value="linear">Linear Gradient</option>
                      <option value="radial">Radial Gradient</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Custom Eye Colors */}
            <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800">
              <label className="flex items-center justify-between cursor-pointer mb-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Custom Corner Eye Colors</span>
                <input
                  type="checkbox"
                  checked={style.customEyeColors}
                  onChange={(e) => onChange({ customEyeColors: e.target.checked })}
                  className="rounded text-brand-600 focus:ring-brand-500 border-slate-300 dark:border-slate-700 dark:bg-slate-800"
                />
              </label>

              {style.customEyeColors && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">Outer Eye Frame</label>
                    <input
                      type="color"
                      value={style.cornerSquareColor}
                      onChange={(e) => onChange({ cornerSquareColor: e.target.value })}
                      className="w-full h-8 rounded-lg cursor-pointer border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-0.5"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">Inner Eye Center</label>
                    <input
                      type="color"
                      value={style.cornerDotColor}
                      onChange={(e) => onChange({ cornerDotColor: e.target.value })}
                      className="w-full h-8 rounded-lg cursor-pointer border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-0.5"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 2. Patterns & Shapes Section */}
      <div>
        <button
          onClick={() => toggleSection('shapes')}
          className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400">
              <Shapes className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Pattern & Corner Shapes</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Customize dots, eye frames, and corners</p>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-slate-400 dark:text-slate-500 transition-transform duration-200 ${
              openSection === 'shapes' ? 'transform rotate-180 text-brand-600 dark:text-brand-400' : ''
            }`}
          />
        </button>

        {openSection === 'shapes' && (
          <div className="p-5 bg-slate-50/50 dark:bg-slate-950/40 space-y-4 border-t border-slate-100 dark:border-slate-800">
            {/* Body Dots */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                QR Body Pattern Style
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {DOT_OPTIONS.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => onChange({ dotType: d.id })}
                    className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                      style.dotType === d.id
                        ? 'border-brand-600 dark:border-brand-500 bg-brand-50/80 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 ring-2 ring-brand-500/20'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Corner Outer Shape */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                Corner Outer Eye Shape
              </label>
              <div className="grid grid-cols-3 gap-2">
                {CORNER_SQUARE_OPTIONS.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => onChange({ cornerSquareType: c.id })}
                    className={`p-2 rounded-xl border text-xs font-semibold text-center transition-all ${
                      style.cornerSquareType === c.id
                        ? 'border-brand-600 dark:border-brand-500 bg-brand-50/80 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 ring-2 ring-brand-500/20'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Corner Inner Shape */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                Corner Inner Dot Shape
              </label>
              <div className="grid grid-cols-2 gap-2">
                {CORNER_DOT_OPTIONS.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => onChange({ cornerDotType: c.id })}
                    className={`p-2 rounded-xl border text-xs font-semibold text-center transition-all ${
                      style.cornerDotType === c.id
                        ? 'border-brand-600 dark:border-brand-500 bg-brand-50/80 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 ring-2 ring-brand-500/20'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. Logo & Watermark Section */}
      <div>
        <button
          onClick={() => toggleSection('logo')}
          className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Center Logo & Icons</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Upload your brand logo or choose a preset</p>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-slate-400 dark:text-slate-500 transition-transform duration-200 ${
              openSection === 'logo' ? 'transform rotate-180 text-brand-600 dark:text-brand-400' : ''
            }`}
          />
        </button>

        {openSection === 'logo' && (
          <div className="p-5 bg-slate-50/50 dark:bg-slate-950/40 space-y-4 border-t border-slate-100 dark:border-slate-800">
            {/* File Upload */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Upload Custom Logo
              </label>
              <div className="flex items-center space-x-3">
                <label className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-brand-600 dark:hover:border-brand-500 rounded-xl cursor-pointer bg-white dark:bg-slate-800/80 transition-colors">
                  <Upload className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Upload PNG, JPG, or SVG
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </label>

                {style.logoUrl && (
                  <button
                    type="button"
                    onClick={() => onChange({ logoUrl: undefined })}
                    className="p-3 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 border border-red-200 dark:border-red-900/40 rounded-xl transition-colors"
                    title="Remove Logo"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Presets */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Preset Icons</label>
              <div className="flex flex-wrap gap-2">
                {LOGO_PRESETS.map((lp) => (
                  <button
                    key={lp.name}
                    type="button"
                    onClick={() => onChange({ logoUrl: lp.url })}
                    className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                      style.logoUrl === lp.url
                        ? 'border-brand-600 dark:border-brand-500 bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 ring-2 ring-brand-500/20 font-bold'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <img src={lp.url} alt={lp.name} className="w-4 h-4 object-contain" />
                    <span>{lp.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sizing & Margin Sliders */}
            {style.logoUrl && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200/60 dark:border-slate-800">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    <span>Logo Size</span>
                    <span>{Math.round(style.logoSize * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="0.4"
                    step="0.02"
                    value={style.logoSize}
                    onChange={(e) => onChange({ logoSize: parseFloat(e.target.value) })}
                    className="w-full accent-brand-600 dark:accent-brand-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    <span>Logo Margin / Clearance</span>
                    <span>{style.logoMargin}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    step="2"
                    value={style.logoMargin}
                    onChange={(e) => onChange({ logoMargin: parseInt(e.target.value) })}
                    className="w-full accent-brand-600 dark:accent-brand-500"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 4. Frame & Badges Section */}
      <div>
        <button
          onClick={() => toggleSection('frame')}
          className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400">
              <Frame className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">"SCAN ME" Frame & Badges</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Add call-to-action borders and banners</p>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-slate-400 dark:text-slate-500 transition-transform duration-200 ${
              openSection === 'frame' ? 'transform rotate-180 text-brand-600 dark:text-brand-400' : ''
            }`}
          />
        </button>

        {openSection === 'frame' && (
          <div className="p-5 bg-slate-50/50 dark:bg-slate-950/40 space-y-4 border-t border-slate-100 dark:border-slate-800">
            {/* Frame Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Frame Style</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {FRAME_OPTIONS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => onChange({ frameType: f.id })}
                    className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                      style.frameType === f.id
                        ? 'border-brand-600 dark:border-brand-500 bg-brand-50/80 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 ring-2 ring-brand-500/20'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {style.frameType !== 'none' && (
              <div className="space-y-3 pt-2 border-t border-slate-200/60 dark:border-slate-800">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Frame Text</label>
                  <input
                    type="text"
                    value={style.frameText}
                    onChange={(e) => onChange({ frameText: e.target.value })}
                    placeholder="SCAN ME"
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-bold tracking-wide uppercase text-slate-900 dark:text-white outline-none focus:border-brand-600 dark:focus:border-brand-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Frame Background Color
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={style.frameColor}
                        onChange={(e) => onChange({ frameColor: e.target.value })}
                        className="w-8 h-8 rounded-lg cursor-pointer border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-0.5"
                      />
                      <input
                        type="text"
                        value={style.frameColor}
                        onChange={(e) => onChange({ frameColor: e.target.value })}
                        className="flex-1 px-2.5 py-1 text-xs font-mono uppercase bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Frame Text Color
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={style.frameTextColor}
                        onChange={(e) => onChange({ frameTextColor: e.target.value })}
                        className="w-8 h-8 rounded-lg cursor-pointer border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-0.5"
                      />
                      <input
                        type="text"
                        value={style.frameTextColor}
                        onChange={(e) => onChange({ frameTextColor: e.target.value })}
                        className="flex-1 px-2.5 py-1 text-xs font-mono uppercase bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 5. Precision, Size & Error Correction */}
      <div>
        <button
          onClick={() => toggleSection('specs')}
          className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Output Quality & Margins</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Resolution, quiet zone, and error tolerance</p>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-slate-400 dark:text-slate-500 transition-transform duration-200 ${
              openSection === 'specs' ? 'transform rotate-180 text-brand-600 dark:text-brand-400' : ''
            }`}
          />
        </button>

        {openSection === 'specs' && (
          <div className="p-5 bg-slate-50/50 dark:bg-slate-950/40 space-y-4 border-t border-slate-100 dark:border-slate-800">
            {/* Size Slider */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                <span>Output Resolution</span>
                <span>
                  {style.size}px × {style.size}px
                </span>
              </div>
              <input
                type="range"
                min="300"
                max="1200"
                step="50"
                value={style.size}
                onChange={(e) => onChange({ size: parseInt(e.target.value) })}
                className="w-full accent-brand-600 dark:accent-brand-500"
              />
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                Higher resolution makes QR codes sharper for print, signage, and billboards.
              </p>
            </div>

            {/* Margins */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                <span>Quiet Zone / Margin</span>
                <span>{style.margin}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                step="4"
                value={style.margin}
                onChange={(e) => onChange({ margin: parseInt(e.target.value) })}
                className="w-full accent-brand-600 dark:accent-brand-500"
              />
            </div>

            {/* Error Correction Level */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                Error Correction Level
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(
                  [
                    { id: 'L', label: 'Low 7%' },
                    { id: 'M', label: 'Medium 15%' },
                    { id: 'Q', label: 'Quartile 25%' },
                    { id: 'H', label: 'High 30%' },
                  ] as { id: ErrorCorrectionLevel; label: string }[]
                ).map((ec) => (
                  <button
                    key={ec.id}
                    type="button"
                    onClick={() => onChange({ errorCorrectionLevel: ec.id })}
                    className={`py-2 px-1 text-xs font-bold rounded-xl border text-center transition-all ${
                      style.errorCorrectionLevel === ec.id
                        ? 'border-brand-600 dark:border-brand-500 bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 ring-2 ring-brand-500/20'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {ec.label}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1.5">
                Use <strong>High (30%)</strong> if embedding center logos so the QR remains 100%
                scannable even if partially covered.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
