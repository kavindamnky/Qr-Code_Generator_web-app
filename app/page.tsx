'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  QRType,
  QRStyleOptions,
  WifiData,
  VCardData,
  EmailData,
  SmsData,
  CryptoData,
  SocialData,
  QRHistoryItem,
} from '@/types/qr';
import { generatePayload } from '@/utils/qrGenerators';
import { Navbar } from '@/components/Navbar';
import { TypeSelector } from '@/components/TypeSelector';
import { TypeForms } from '@/components/forms/TypeForms';
import { CustomizationAccordion } from '@/components/CustomizationAccordion';
import { QRPreview } from '@/components/QRPreview';
import { HistoryDrawer } from '@/components/HistoryDrawer';
import { QRScannerModal } from '@/components/QRScannerModal';
import { Footer } from '@/components/Footer';
import { Sparkles } from 'lucide-react';

const DEFAULT_STYLES: QRStyleOptions = {
  fgColor: '#00519d', // Base blue requested by user
  bgColor: '#ffffff',
  isTransparentBg: false,
  useGradient: false,
  gradientType: 'linear',
  gradientColor2: '#0072ce',
  gradientRotation: 45,
  dotType: 'rounded',
  cornerSquareType: 'extra-rounded',
  cornerDotType: 'dot',
  cornerSquareColor: '#00519d',
  cornerDotColor: '#00519d',
  customEyeColors: false,
  logoUrl: undefined,
  logoSize: 0.25,
  logoMargin: 0,
  frameType: 'none',
  frameText: 'SCAN ME',
  frameColor: '#00519d',
  frameTextColor: '#ffffff',
  size: 600,
  margin: 10,
  errorCorrectionLevel: 'Q',
};

export default function HomePage() {
  const [selectedType, setSelectedType] = useState<QRType>('url');

  // Dark / Light Mode state
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Input states
  const [url, setUrl] = useState('https://github.com');
  const [text, setText] = useState('Welcome to M-QR Code Generator!');
  const [wifi, setWifi] = useState<WifiData>({
    ssid: 'Office-5G',
    password: 'securepassword123',
    encryption: 'WPA',
    hidden: false,
  });
  const [vcard, setVcard] = useState<VCardData>({
    firstName: 'Alex',
    lastName: 'Morgan',
    organization: 'M"Builds Studios',
    title: 'Lead Architect',
    phone: '+1 800 555 0199',
    email: 'alex@example.com',
    website: 'https://example.com',
    address: 'San Francisco, CA',
  });
  const [email, setEmail] = useState<EmailData>({
    email: 'hello@mbuilds.org',
    subject: 'Project Inquiry',
    body: 'Hi, I would like to learn more about your services.',
  });
  const [phone, setPhone] = useState('+1 800 555 0199');
  const [sms, setSms] = useState<SmsData>({
    phone: '+1 800 555 0199',
    message: 'Hello! I scanned your QR code.',
  });
  const [crypto, setCrypto] = useState<CryptoData>({
    currency: 'BTC',
    address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    amount: '0.005',
    note: 'Invoice #102',
  });
  const [social, setSocial] = useState<SocialData>({
    platform: 'instagram',
    handleOrNumber: 'mqr_builds',
  });

  // Style state
  const [style, setStyle] = useState<QRStyleOptions>(DEFAULT_STYLES);

  // History & Modals
  const [historyItems, setHistoryItems] = useState<QRHistoryItem[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  // Initialize theme from storage or system preference
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('m_qr_theme') as 'light' | 'dark' | null;
      if (savedTheme) {
        setTheme(savedTheme);
        if (savedTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
        document.documentElement.classList.add('dark');
      }
    } catch {
      // Ignore in SSR
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('m_qr_theme', next);
        if (next === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch {
        // Ignore
      }
      return next;
    });
  };

  // Load history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('m_qr_history');
      if (saved) {
        setHistoryItems(JSON.parse(saved));
      }
    } catch {
      // LocalStorage unavailable
    }
  }, []);

  const saveHistoryToStorage = (items: QRHistoryItem[]) => {
    setHistoryItems(items);
    try {
      localStorage.setItem('m_qr_history', JSON.stringify(items));
    } catch {
      // Ignore quota errors
    }
  };

  // Compute live payload string
  const currentPayload = useMemo(() => {
    return generatePayload(selectedType, {
      url,
      text,
      wifi,
      vcard,
      email,
      phone,
      sms,
      crypto,
      social,
    });
  }, [selectedType, url, text, wifi, vcard, email, phone, sms, crypto, social]);

  // Compute title for QR
  const currentTitle = useMemo(() => {
    switch (selectedType) {
      case 'url':
        return url || 'Web Link';
      case 'text':
        return text.slice(0, 30) || 'Text Note';
      case 'wifi':
        return `Wi-Fi: ${wifi.ssid || 'Network'}`;
      case 'vcard':
        return `Contact: ${vcard.firstName} ${vcard.lastName}`.trim() || 'Contact Card';
      case 'email':
        return `Email: ${email.email || 'Message'}`;
      case 'phone':
        return `Call: ${phone || 'Phone'}`;
      case 'sms':
        return `SMS: ${sms.phone || 'Number'}`;
      case 'crypto':
        return `${crypto.currency} Payment`;
      case 'social':
        return `${social.platform}: ${social.handleOrNumber}`;
      default:
        return 'M-QR Code';
    }
  }, [selectedType, url, text, wifi, vcard, email, phone, sms, crypto, social]);

  const handleUpdateStyle = (updated: Partial<QRStyleOptions>) => {
    setStyle((prev) => ({ ...prev, ...updated }));
  };

  const handleSaveHistory = (previewDataUrl?: string) => {
    if (!currentPayload) return;
    const newItem: QRHistoryItem = {
      id: `qr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      type: selectedType,
      title: currentTitle,
      rawPayload: currentPayload,
      timestamp: Date.now(),
      previewDataUrl,
      style: { ...style },
    };

    const updated = [newItem, ...historyItems.filter((i) => i.rawPayload !== currentPayload)].slice(
      0,
      30
    );
    saveHistoryToStorage(updated);
  };

  const handleRestoreHistory = (item: QRHistoryItem) => {
    setSelectedType(item.type);
    if (item.style) {
      setStyle(item.style);
    }
    // Attempt to restore field value
    if (item.type === 'url') setUrl(item.rawPayload);
    else if (item.type === 'text') setText(item.rawPayload);
  };

  const handleClearHistory = () => {
    saveHistoryToStorage([]);
  };

  const handleDeleteOneHistory = (id: string) => {
    const updated = historyItems.filter((item) => item.id !== id);
    saveHistoryToStorage(updated);
  };

  const handleResetSettings = () => {
    if (confirm('Reset all styles to default (#00519d blue theme)?')) {
      setStyle(DEFAULT_STYLES);
    }
  };

  const handleLoadScannedPayload = (scannedText: string) => {
    if (!scannedText) return;
    if (scannedText.startsWith('WIFI:')) {
      setSelectedType('wifi');
      // Parse SSID
      const ssidMatch = scannedText.match(/S:([^;]+);/);
      const passMatch = scannedText.match(/P:([^;]*);/);
      if (ssidMatch) {
        setWifi((prev) => ({
          ...prev,
          ssid: ssidMatch[1],
          password: passMatch ? passMatch[1] : '',
        }));
      }
    } else if (scannedText.startsWith('BEGIN:VCARD')) {
      setSelectedType('vcard');
    } else if (scannedText.startsWith('mailto:')) {
      setSelectedType('email');
      const emailMatch = scannedText.replace(/^mailto:/, '').split('?')[0];
      setEmail((prev) => ({ ...prev, email: emailMatch }));
    } else if (scannedText.startsWith('tel:')) {
      setSelectedType('phone');
      setPhone(scannedText.replace(/^tel:/, ''));
    } else if (scannedText.startsWith('smsto:')) {
      setSelectedType('sms');
      const parts = scannedText.replace(/^smsto:/, '').split(':');
      setSms({ phone: parts[0] || '', message: parts[1] || '' });
    } else if (/^https?:\/\//i.test(scannedText)) {
      setSelectedType('url');
      setUrl(scannedText);
    } else {
      setSelectedType('text');
      setText(scannedText);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-x-hidden">
      {/* High-Tech Background Grid Pattern & Subtle Ambient Glows */}
      <div className="fixed inset-0 bg-grid-pattern mask-radial-fade pointer-events-none -z-10" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[360px] bg-brand-500/10 dark:bg-brand-500/15 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="fixed -bottom-24 right-0 w-[550px] h-[350px] bg-brand-600/5 dark:bg-brand-400/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Top Navigation */}
      <Navbar
        historyCount={historyItems.length}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenScanner={() => setIsScannerOpen(true)}
        onReset={handleResetSettings}
        isDark={theme === 'dark'}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-brand-200/80 dark:border-brand-800/80 text-brand-700 dark:text-brand-300 text-xs font-bold mb-3 shadow-sm hover:shadow-brand hover:-translate-y-0.5 transition-all duration-200 animate-float cursor-default">
            <Sparkles className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400 animate-pulse" />
            <span>Modern QR Generator Rebuilt with Next.js & Tailwind</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Create Custom <span className="text-brand-600 dark:text-brand-400">M-QR Codes</span> in Seconds
          </h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Generate high-resolution vector QR codes with custom styling, colors, center logos, and
            instant downloads in PNG, SVG, and PDF.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: QR Type + Inputs + Customization Accordion (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Type Selector Bar */}
            <TypeSelector selectedType={selectedType} onSelectType={setSelectedType} />

            {/* Input Forms */}
            <TypeForms
              type={selectedType}
              url={url}
              setUrl={setUrl}
              text={text}
              setText={setText}
              wifi={wifi}
              setWifi={setWifi}
              vcard={vcard}
              setVcard={setVcard}
              email={email}
              setEmail={setEmail}
              phone={phone}
              setPhone={setPhone}
              sms={sms}
              setSms={setSms}
              crypto={crypto}
              setCrypto={setCrypto}
              social={social}
              setSocial={setSocial}
            />

            {/* Design & Style Customization Accordion */}
            <CustomizationAccordion style={style} onChange={handleUpdateStyle} />
          </div>

          {/* Right Column: Sticky Live Preview & Action Buttons (5 cols) */}
          <div className="lg:col-span-5">
            <QRPreview
              payload={currentPayload}
              style={style}
              title={currentTitle}
              onSaveHistory={handleSaveHistory}
            />
          </div>
        </div>
      </main>

      {/* History Drawer Modal */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        items={historyItems}
        onSelect={handleRestoreHistory}
        onClear={handleClearHistory}
        onDeleteOne={handleDeleteOneHistory}
      />

      {/* Scanner & Decoder Modal */}
      <QRScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onLoadPayload={handleLoadScannedPayload}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
