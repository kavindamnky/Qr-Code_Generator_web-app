'use client';

import React from 'react';
import { X, ShieldCheck, Cookie, Lock, Eye } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-brand-600" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Privacy & Cookie Policy</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="px-6 py-5 overflow-y-auto space-y-5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white flex items-center mb-1">
              <Lock className="w-4 h-4 mr-1.5 text-emerald-500" /> 1. Client-Side Processing & Privacy
            </h4>
            <p>
              M-QR Pro values your privacy. All QR code generation, styling, and scanning are performed <strong>100% on your device</strong> inside your browser. We never collect, transmit, or store your text payloads, Wi-Fi credentials, vCard contact information, or scanned images on any remote server.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white flex items-center mb-1">
              <Eye className="w-4 h-4 mr-1.5 text-blue-500" /> 2. Local Storage
            </h4>
            <p>
              Our QR history feature uses standard browser <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono text-xs">localStorage</code> to remember your recently created codes on this device. This data remains on your browser and can be cleared at any time with the &ldquo;Clear All&rdquo; button in the History drawer.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white flex items-center mb-1">
              <Cookie className="w-4 h-4 mr-1.5 text-amber-500" /> 3. Google AdSense & Third-Party Cookies
            </h4>
            <p className="mb-2">
              We partner with Google AdSense to serve advertisements when you visit our website. Google, as a third-party vendor, uses cookies to serve ads based on your prior visits to this website or other websites.
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-xs text-slate-500 dark:text-slate-400">
              <li>Google&apos;s use of advertising cookies enables it and its partners to serve ads to you based on your visit to this and/or other sites on the Internet.</li>
              <li>You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">Google Ads Settings</a>.</li>
              <li>Alternatively, you can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">www.aboutads.info</a>.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-1">
              4. Contact Us
            </h4>
            <p>
              If you have any questions or feedback regarding this policy or the application, feel free to visit our project repository on GitHub.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
