'use client';

import React, { useState } from 'react';
import { ShieldCheck, Heart, Sparkles, FileText } from 'lucide-react';
import { PrivacyPolicyModal } from './PrivacyPolicyModal';

export const Footer: React.FC = () => {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-800">
          {/* Brand Column */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-black tracking-tight text-white">
                M<span className="text-brand-400">-QR</span> Pro
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-brand-900 text-brand-300 border border-brand-700">
                v2.0
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Professional QR code generator engineered with React, Next.js & Tailwind CSS. Designed
              for high-resolution print, business cards, Wi-Fi sharing, and digital marketing.
            </p>
          </div>

          {/* Privacy & Security */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center">
              <ShieldCheck className="w-4 h-4 text-emerald-400 mr-2" /> Privacy & Local Processing
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              All QR codes are synthesized 100% on your device using client-side vector rendering.
              Your Wi-Fi passwords, contact cards, and private links are never stored or transmitted
              to any third-party server.
            </p>
            <div>
              <button
                onClick={() => setIsPrivacyOpen(true)}
                className="inline-flex items-center text-xs font-semibold text-brand-400 hover:text-brand-300 underline underline-offset-4 transition-colors"
              >
                <FileText className="w-3.5 h-3.5 mr-1" /> View Privacy & Cookie Policy
              </button>
            </div>
          </div>

          {/* Credits & Origin */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center">
              <Sparkles className="w-4 h-4 text-amber-400 mr-2" /> M"Builds Projects
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Originated by <strong>M"Builds Studios</strong> by <strong>V.Kavinda [MNKY]</strong>.
              Re-engineered with modern web technologies, `#00519d` brand palette, and advanced vector
              customization.
            </p>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 space-y-3 sm:space-y-0">
          <div className="flex flex-wrap items-center gap-4">
            <p>© {new Date().getFullYear()} M"Builds Studios. All Rights Reserved.</p>
            <span>•</span>
            <button
              onClick={() => setIsPrivacyOpen(true)}
              className="hover:text-slate-400 transition-colors"
            >
              Privacy Policy
            </button>
          </div>
          <div className="flex items-center space-x-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline mx-0.5" />
            <span>for the web community</span>
          </div>
        </div>
      </div>

      <PrivacyPolicyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </footer>
  );
};
