'use client';

import React from 'react';
import { QrCode, ScanLine, History, Sparkles, RefreshCw, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  historyCount: number;
  onOpenHistory: () => void;
  onOpenScanner: () => void;
  onReset: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  historyCount,
  onOpenHistory,
  onOpenScanner,
  onReset,
  isDark,
  onToggleTheme,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center space-x-3 group cursor-pointer select-none">
          <div className="relative w-10 h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            {/* Brand logo without border or background box */}
            <img
              src="/images/01.png"
              alt="M-QR Logo"
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <QrCode className="w-8 h-8 text-brand-600 dark:text-brand-400 absolute pointer-events-none -z-10" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white transition-colors group-hover:text-brand-600 dark:group-hover:text-brand-400">
                M<span className="text-brand-500">-QR</span>
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-300 border border-brand-200 dark:border-brand-800 transition-transform duration-200 group-hover:scale-105">
                <Sparkles className="w-3 h-3 mr-1" /> Pro v2
              </span>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:inline-block">
              Professional QR Code Generator Suite
            </span>
          </div>
        </div>

        {/* Right Navigation Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Light / Dark Mode Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="p-2 sm:px-3 sm:py-2 rounded-xl text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 active:scale-95 flex items-center space-x-1.5 shadow-sm"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {isDark ? (
              <>
                <Sun className="w-4 h-4 text-amber-400 animate-in spin-in-90 duration-300 hover:rotate-45 transition-transform" />
                <span className="text-xs font-semibold hidden md:inline">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-slate-700 dark:text-slate-300 animate-in spin-in-90 duration-300 hover:-rotate-12 transition-transform" />
                <span className="text-xs font-semibold hidden md:inline">Dark</span>
              </>
            )}
          </button>

          {/* Scan QR Button */}
          <button
            onClick={onOpenScanner}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/50 hover:bg-brand-100/80 dark:hover:bg-brand-900/40 border border-brand-200 dark:border-brand-800 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-95 shadow-sm"
            title="Scan or Upload existing QR code"
          >
            <ScanLine className="w-4 h-4 text-brand-600 dark:text-brand-400 transition-transform group-hover:scale-110" />
            <span className="hidden sm:inline">Scan QR</span>
          </button>

          {/* History Button */}
          <button
            onClick={onOpenHistory}
            className="relative flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-95 shadow-sm"
            title="View History of generated QR codes"
          >
            <History className="w-4 h-4 text-slate-600 dark:text-slate-300 transition-transform group-hover:rotate-12" />
            <span className="hidden sm:inline">History</span>
            {historyCount > 0 && (
              <span className="ml-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold text-white bg-brand-600 rounded-full animate-pulse">
                {historyCount}
              </span>
            )}
          </button>

          {/* Reset Button */}
          <button
            onClick={onReset}
            className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 hover:rotate-180"
            title="Reset to default settings"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
