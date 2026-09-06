'use client';

import React, { useState } from 'react';
import {
  QRType,
  WifiData,
  VCardData,
  EmailData,
  SmsData,
  CryptoData,
  SocialData,
} from '@/types/qr';
import {
  Link as LinkIcon,
  Wifi,
  Eye,
  EyeOff,
  User,
  Building,
  Mail,
  Phone,
  Globe,
  MapPin,
  MessageSquare,
  Lock,
} from 'lucide-react';

interface TypeFormsProps {
  type: QRType;
  url: string;
  setUrl: (v: string) => void;
  text: string;
  setText: (v: string) => void;
  wifi: WifiData;
  setWifi: (v: WifiData) => void;
  vcard: VCardData;
  setVcard: (v: VCardData) => void;
  email: EmailData;
  setEmail: (v: EmailData) => void;
  phone: string;
  setPhone: (v: string) => void;
  sms: SmsData;
  setSms: (v: SmsData) => void;
  crypto: CryptoData;
  setCrypto: (v: CryptoData) => void;
  social: SocialData;
  setSocial: (v: SocialData) => void;
}

export const TypeForms: React.FC<TypeFormsProps> = ({
  type,
  url,
  setUrl,
  text,
  setText,
  wifi,
  setWifi,
  vcard,
  setVcard,
  email,
  setEmail,
  phone,
  setPhone,
  sms,
  setSms,
  crypto,
  setCrypto,
  social,
  setSocial,
}) => {
  const [showWifiPassword, setShowWifiPassword] = useState(false);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-200 space-y-4">
      {/* 1. URL / Website */}
      {type === 'url' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center">
              <LinkIcon className="w-4 h-4 text-brand-600 dark:text-brand-400 mr-2" /> Website URL
            </label>
            <span className="text-xs text-slate-400 dark:text-slate-500">e.g. https://mywebsite.com</span>
          </div>
          <div className="relative">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com or paste any link"
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 focus:border-brand-600 dark:focus:border-brand-500 focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-brand-100 dark:focus:ring-brand-900/30 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm transition-all duration-150 outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {['https://', 'www.', '.com', '.org', '.io'].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => {
                  if (preset === 'https://' || preset === 'www.') {
                    if (!url.startsWith(preset)) setUrl(`${preset}${url}`);
                  } else {
                    if (!url.endsWith(preset)) setUrl(`${url}${preset}`);
                  }
                }}
                className="px-2.5 py-1 text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-brand-50 dark:hover:bg-brand-950/50 hover:text-brand-600 dark:hover:text-brand-400 text-slate-600 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-700 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 active:scale-95"
              >
                +{preset}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 2. Plain Text */}
      {type === 'text' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-slate-800 dark:text-slate-200">Plain Text or Note</label>
            <span className="text-xs text-slate-400 dark:text-slate-500">{text.length} characters</span>
          </div>
          <textarea
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste any text message, coupon code, or notes..."
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 focus:border-brand-600 dark:focus:border-brand-500 focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-brand-100 dark:focus:ring-brand-900/30 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm transition-all duration-150 outline-none resize-none"
          />
        </div>
      )}

      {/* 3. Wi-Fi Access */}
      {type === 'wifi' && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-brand-600 dark:text-brand-400">
            <Wifi className="w-5 h-5" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Wi-Fi Network Credentials</h4>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Network Name (SSID) *
              </label>
              <input
                type="text"
                value={wifi.ssid}
                onChange={(e) => setWifi({ ...wifi, ssid: e.target.value })}
                placeholder="My Home Wi-Fi"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 focus:border-brand-600 dark:focus:border-brand-500 focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-brand-100 dark:focus:ring-brand-900/30 rounded-xl text-slate-900 dark:text-white text-sm transition-all outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showWifiPassword ? 'text' : 'password'}
                  value={wifi.password || ''}
                  disabled={wifi.encryption === 'nopass'}
                  onChange={(e) => setWifi({ ...wifi, password: e.target.value })}
                  placeholder={wifi.encryption === 'nopass' ? 'No password required' : '••••••••'}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 focus:border-brand-600 dark:focus:border-brand-500 focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-brand-100 dark:focus:ring-brand-900/30 rounded-xl text-slate-900 dark:text-white text-sm transition-all outline-none disabled:bg-slate-100 dark:disabled:bg-slate-800/40 disabled:text-slate-400 dark:disabled:text-slate-500"
                />
                {wifi.encryption !== 'nopass' && (
                  <button
                    type="button"
                    onClick={() => setShowWifiPassword(!showWifiPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    {showWifiPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Security Encryption
                </label>
                <select
                  value={wifi.encryption}
                  onChange={(e) =>
                    setWifi({
                      ...wifi,
                      encryption: e.target.value as 'WPA' | 'WEP' | 'nopass',
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-200 outline-none focus:border-brand-600 dark:focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-900/30"
                >
                  <option value="WPA">WPA / WPA2 / WPA3 (Standard)</option>
                  <option value="WEP">WEP (Legacy)</option>
                  <option value="nopass">None (Open Network)</option>
                </select>
              </div>

              <div className="flex items-center pt-5">
                <label className="flex items-center space-x-2 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={wifi.hidden}
                    onChange={(e) => setWifi({ ...wifi, hidden: e.target.checked })}
                    className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300 dark:border-slate-700 dark:bg-slate-800"
                  />
                  <span>Hidden Network (SSID is not broadcast)</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. vCard / Contact Card */}
      {type === 'vcard' && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-brand-600 dark:text-brand-400">
            <User className="w-5 h-5" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Contact / Business Card Information</h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">First Name *</label>
              <input
                type="text"
                value={vcard.firstName}
                onChange={(e) => setVcard({ ...vcard, firstName: e.target.value })}
                placeholder="John"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white outline-none focus:border-brand-600 dark:focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Last Name</label>
              <input
                type="text"
                value={vcard.lastName}
                onChange={(e) => setVcard({ ...vcard, lastName: e.target.value })}
                placeholder="Doe"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white outline-none focus:border-brand-600 dark:focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center">
                <Phone className="w-3.5 h-3.5 mr-1 text-slate-400" /> Phone Number
              </label>
              <input
                type="tel"
                value={vcard.phone}
                onChange={(e) => setVcard({ ...vcard, phone: e.target.value })}
                placeholder="+1 (555) 000-0000"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white outline-none focus:border-brand-600 dark:focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center">
                <Mail className="w-3.5 h-3.5 mr-1 text-slate-400" /> Email
              </label>
              <input
                type="email"
                value={vcard.email}
                onChange={(e) => setVcard({ ...vcard, email: e.target.value })}
                placeholder="john@example.com"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white outline-none focus:border-brand-600 dark:focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center">
                <Building className="w-3.5 h-3.5 mr-1 text-slate-400" /> Company / Org
              </label>
              <input
                type="text"
                value={vcard.organization}
                onChange={(e) => setVcard({ ...vcard, organization: e.target.value })}
                placeholder="Acme Inc."
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white outline-none focus:border-brand-600 dark:focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Job Title</label>
              <input
                type="text"
                value={vcard.title}
                onChange={(e) => setVcard({ ...vcard, title: e.target.value })}
                placeholder="Product Designer"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white outline-none focus:border-brand-600 dark:focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center">
                <Globe className="w-3.5 h-3.5 mr-1 text-slate-400" /> Website
              </label>
              <input
                type="text"
                value={vcard.website}
                onChange={(e) => setVcard({ ...vcard, website: e.target.value })}
                placeholder="https://john.design"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white outline-none focus:border-brand-600 dark:focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center">
                <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" /> City / Address
              </label>
              <input
                type="text"
                value={vcard.address}
                onChange={(e) => setVcard({ ...vcard, address: e.target.value })}
                placeholder="New York, NY"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white outline-none focus:border-brand-600 dark:focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              />
            </div>
          </div>
        </div>
      )}

      {/* 5. Email */}
      {type === 'email' && (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Recipient Email *</label>
            <input
              type="email"
              value={email.email}
              onChange={(e) => setEmail({ ...email, email: e.target.value })}
              placeholder="contact@business.com"
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white outline-none focus:border-brand-600 dark:focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Subject</label>
            <input
              type="text"
              value={email.subject}
              onChange={(e) => setEmail({ ...email, subject: e.target.value })}
              placeholder="Inquiry about services"
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white outline-none focus:border-brand-600 dark:focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Message Body</label>
            <textarea
              rows={3}
              value={email.body}
              onChange={(e) => setEmail({ ...email, body: e.target.value })}
              placeholder="Hi there, I'd like to get in touch..."
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white outline-none focus:border-brand-600 dark:focus:border-brand-500 focus:ring-2 focus:ring-brand-100 resize-none"
            />
          </div>
        </div>
      )}

      {/* 6. Phone */}
      {type === 'phone' && (
        <div className="space-y-3">
          <label className="block text-sm font-bold text-slate-800 dark:text-slate-200">Phone Number to Call</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 234 567 8900"
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white outline-none focus:border-brand-600 dark:focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
          />
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Scanning this QR code immediately prompts the user's mobile device to place a call.
          </p>
        </div>
      )}

      {/* 7. SMS */}
      {type === 'sms' && (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Phone Number *</label>
            <input
              type="tel"
              value={sms.phone}
              onChange={(e) => setSms({ ...sms, phone: e.target.value })}
              placeholder="+1 234 567 8900"
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white outline-none focus:border-brand-600 dark:focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Pre-filled SMS Text</label>
            <textarea
              rows={3}
              value={sms.message}
              onChange={(e) => setSms({ ...sms, message: e.target.value })}
              placeholder="START or HELP..."
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white outline-none focus:border-brand-600 dark:focus:border-brand-500 focus:ring-2 focus:ring-brand-100 resize-none"
            />
          </div>
        </div>
      )}

      {/* 8. Crypto & UPI */}
      {type === 'crypto' && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Payment Method</label>
              <select
                value={crypto.currency}
                onChange={(e) =>
                  setCrypto({
                    ...crypto,
                    currency: e.target.value as 'BTC' | 'ETH' | 'SOL' | 'UPI',
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-900 dark:text-white outline-none focus:border-brand-600 dark:focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              >
                <option value="BTC">Bitcoin (BTC)</option>
                <option value="ETH">Ethereum (ETH / ERC-20)</option>
                <option value="SOL">Solana (SOL)</option>
                <option value="UPI">UPI ID (VPA)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {crypto.currency === 'UPI' ? 'UPI VPA ID *' : `${crypto.currency} Wallet Address *`}
              </label>
              <input
                type="text"
                value={crypto.address}
                onChange={(e) => setCrypto({ ...crypto, address: e.target.value })}
                placeholder={
                  crypto.currency === 'UPI' ? 'username@okhdfcbank' : 'Enter wallet public address'
                }
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white outline-none focus:border-brand-600 dark:focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Amount (Optional)</label>
              <input
                type="text"
                value={crypto.amount || ''}
                onChange={(e) => setCrypto({ ...crypto, amount: e.target.value })}
                placeholder="0.05"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white outline-none focus:border-brand-600 dark:focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Note / Message</label>
              <input
                type="text"
                value={crypto.note || ''}
                onChange={(e) => setCrypto({ ...crypto, note: e.target.value })}
                placeholder="Invoice #1024"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white outline-none focus:border-brand-600 dark:focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              />
            </div>
          </div>
        </div>
      )}

      {/* 9. Social Media */}
      {type === 'social' && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Social Platform</label>
              <select
                value={social.platform}
                onChange={(e) =>
                  setSocial({
                    ...social,
                    platform: e.target.value as any,
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-900 dark:text-white outline-none focus:border-brand-600 dark:focus:border-brand-500 focus:ring-2 focus:ring-brand-100 capitalize"
              >
                <option value="whatsapp">WhatsApp</option>
                <option value="instagram">Instagram</option>
                <option value="linkedin">LinkedIn</option>
                <option value="twitter">X / Twitter</option>
                <option value="youtube">YouTube</option>
                <option value="github">GitHub</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {social.platform === 'whatsapp' ? 'Phone Number with Country Code' : 'Username / Handle'}
              </label>
              <input
                type="text"
                value={social.handleOrNumber}
                onChange={(e) => setSocial({ ...social, handleOrNumber: e.target.value })}
                placeholder={social.platform === 'whatsapp' ? '1234567890' : 'username'}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white outline-none focus:border-brand-600 dark:focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
