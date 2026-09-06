'use client';

import React from 'react';
import { QRType } from '@/types/qr';
import {
  Link as LinkIcon,
  FileText,
  Wifi,
  Contact,
  Mail,
  Phone,
  MessageSquare,
  Coins,
  Share2,
} from 'lucide-react';

interface TypeSelectorProps {
  selectedType: QRType;
  onSelectType: (type: QRType) => void;
}

const TYPES: { id: QRType; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'url', label: 'URL / Link', icon: LinkIcon },
  { id: 'text', label: 'Plain Text', icon: FileText },
  { id: 'wifi', label: 'Wi-Fi', icon: Wifi },
  { id: 'vcard', label: 'vCard / Contact', icon: Contact },
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'phone', label: 'Phone Call', icon: Phone },
  { id: 'sms', label: 'SMS', icon: MessageSquare },
  { id: 'crypto', label: 'Crypto & UPI', icon: Coins },
  { id: 'social', label: 'Social Profile', icon: Share2 },
];

export const TypeSelector: React.FC<TypeSelectorProps> = ({ selectedType, onSelectType }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-2 sm:p-3 border border-slate-200/80 dark:border-slate-800 shadow-sm transition-colors">
      <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2 mb-2">
        Select QR Content Type
      </p>
      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-1.5 sm:gap-2">
        {TYPES.map((t) => {
          const Icon = t.icon;
          const isSelected = selectedType === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onSelectType(t.id)}
              className={`flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl transition-all duration-200 text-xs font-semibold select-none group hover:-translate-y-0.5 active:translate-y-0 active:scale-95 ${
                isSelected
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-600/25 ring-2 ring-brand-600/30'
                  : 'bg-slate-50 dark:bg-slate-800/70 hover:bg-slate-100 dark:hover:bg-slate-800 hover:shadow-sm text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 border border-slate-200/60 dark:border-slate-700/60'
              }`}
            >
              <Icon
                className={`w-5 h-5 mb-1.5 transition-transform duration-200 group-hover:scale-115 group-hover:-translate-y-0.5 ${
                  isSelected ? 'text-white' : 'text-slate-600 dark:text-slate-400 group-hover:text-brand-600 dark:group-hover:text-brand-400'
                }`}
              />
              <span className="truncate max-w-full text-[11px] leading-tight text-center">
                {t.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
