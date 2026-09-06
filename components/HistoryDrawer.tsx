'use client';

import React from 'react';
import { QRHistoryItem } from '@/types/qr';
import { X, Trash2, Clock, ArrowRight } from 'lucide-react';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: QRHistoryItem[];
  onSelect: (item: QRHistoryItem) => void;
  onClear: () => void;
  onDeleteOne: (id: string) => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onSelect,
  onClear,
  onDeleteOne,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200 border-l border-slate-200 dark:border-slate-800 transition-colors">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-brand-600 dark:text-brand-400" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Generation History</h2>
            <span className="text-xs bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-300 font-bold px-2 py-0.5 rounded-full border border-brand-200 dark:border-brand-800">
              {items.length}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            {items.length > 0 && (
              <button
                onClick={onClear}
                className="text-xs font-semibold text-red-600 dark:text-red-400 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 px-2.5 py-1.5 rounded-lg border border-red-200 dark:border-red-900/40 transition-colors flex items-center space-x-1"
                title="Clear all saved history"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400 dark:text-slate-500 space-y-2">
              <Clock className="w-12 h-12 text-slate-200 dark:text-slate-800 stroke-1" />
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">No QR Codes Generated Yet</p>
              <p className="text-xs max-w-xs text-slate-400 dark:text-slate-500">
                Any QR codes you download or copy will be saved here in your browser for easy
                recovery.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="group relative p-3.5 bg-slate-50 dark:bg-slate-800/60 hover:bg-brand-50/50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 hover:border-brand-300 dark:hover:border-brand-500/50 rounded-xl transition-all duration-150 flex items-center space-x-3.5"
              >
                {/* Thumbnail */}
                {item.previewDataUrl ? (
                  <img
                    src={item.previewDataUrl}
                    alt="QR Thumbnail"
                    className="w-14 h-14 rounded-lg bg-white p-1 border border-slate-200 dark:border-slate-700 object-contain shrink-0"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-xs text-brand-600 dark:text-brand-400 shrink-0 uppercase">
                    {item.type}
                  </div>
                )}

                {/* Details */}
                <div
                  className="flex-1 min-w-0 cursor-pointer"
                  onClick={() => {
                    onSelect(item);
                    onClose();
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold uppercase tracking-wide text-brand-700 dark:text-brand-300 bg-brand-100/70 dark:bg-brand-950/60 px-1.5 py-0.5 rounded">
                      {item.type}
                    </span>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500">
                      {new Date(item.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate mt-1">{item.title}</h4>
                  <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate">{item.rawPayload}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-1 shrink-0">
                  <button
                    onClick={() => {
                      onSelect(item);
                      onClose();
                    }}
                    className="p-1.5 rounded-lg text-brand-600 dark:text-brand-400 hover:bg-brand-100 dark:hover:bg-brand-950/50 transition-colors"
                    title="Load this QR Code"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteOne(item.id);
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                    title="Delete item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
