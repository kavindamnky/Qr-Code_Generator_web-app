import {
  WifiData,
  VCardData,
  EmailData,
  SmsData,
  CryptoData,
  SocialData,
  QRType,
} from '@/types/qr';

export function formatUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

export function formatWifi(data: WifiData): string {
  const { ssid, password = '', encryption = 'WPA', hidden = false } = data;
  if (!ssid.trim()) return '';

  // Escape special characters in SSID & Password: \ , ; : "
  const escapeWifi = (str: string) => str.replace(/([\\;,:"'])/g, '\\$1');

  const encType = encryption === 'nopass' ? 'nopass' : encryption;
  const escapedSsid = escapeWifi(ssid.trim());
  const escapedPass = encryption === 'nopass' ? '' : escapeWifi(password);

  return `WIFI:T:${encType};S:${escapedSsid};P:${escapedPass};H:${hidden ? 'true' : 'false'};;`;
}

export function formatVCard(data: VCardData): string {
  const { firstName, lastName, organization, title, phone, email, website, address } = data;
  const fullName = `${firstName} ${lastName}`.trim();

  let vcard = 'BEGIN:VCARD\r\nVERSION:3.0\r\n';
  if (fullName) {
    vcard += `N:${lastName.trim()};${firstName.trim()};;;\r\n`;
    vcard += `FN:${fullName}\r\n`;
  }
  if (organization.trim()) {
    vcard += `ORG:${organization.trim()}\r\n`;
  }
  if (title.trim()) {
    vcard += `TITLE:${title.trim()}\r\n`;
  }
  if (phone.trim()) {
    vcard += `TEL;TYPE=CELL:${phone.trim()}\r\n`;
  }
  if (email.trim()) {
    vcard += `EMAIL:${email.trim()}\r\n`;
  }
  if (website.trim()) {
    vcard += `URL:${formatUrl(website)}\r\n`;
  }
  if (address.trim()) {
    vcard += `ADR;TYPE=WORK:;;${address.trim()};;;;\r\n`;
  }
  vcard += 'END:VCARD';
  return vcard;
}

export function formatEmail(data: EmailData): string {
  const { email, subject, body } = data;
  if (!email.trim()) return '';
  const params: string[] = [];
  if (subject.trim()) params.push(`subject=${encodeURIComponent(subject.trim())}`);
  if (body.trim()) params.push(`body=${encodeURIComponent(body.trim())}`);
  const query = params.length > 0 ? `?${params.join('&')}` : '';
  return `mailto:${email.trim()}${query}`;
}

export function formatPhone(phone: string): string {
  const cleaned = phone.trim().replace(/[^\d+]/g, '');
  return cleaned ? `tel:${cleaned}` : '';
}

export function formatSms(data: SmsData): string {
  const { phone, message } = data;
  const cleaned = phone.trim().replace(/[^\d+]/g, '');
  if (!cleaned) return '';
  if (message.trim()) {
    return `smsto:${cleaned}:${message.trim()}`;
  }
  return `smsto:${cleaned}`;
}

export function formatCrypto(data: CryptoData): string {
  const { currency, address, amount, note } = data;
  const cleanAddr = address.trim();
  if (!cleanAddr) return '';

  switch (currency) {
    case 'BTC': {
      const params: string[] = [];
      if (amount) params.push(`amount=${amount.trim()}`);
      if (note) params.push(`message=${encodeURIComponent(note.trim())}`);
      return `bitcoin:${cleanAddr}${params.length ? '?' + params.join('&') : ''}`;
    }
    case 'ETH': {
      const params: string[] = [];
      if (amount) params.push(`value=${amount.trim()}`);
      return `ethereum:${cleanAddr}${params.length ? '?' + params.join('&') : ''}`;
    }
    case 'SOL': {
      const params: string[] = [];
      if (amount) params.push(`amount=${amount.trim()}`);
      if (note) params.push(`memo=${encodeURIComponent(note.trim())}`);
      return `solana:${cleanAddr}${params.length ? '?' + params.join('&') : ''}`;
    }
    case 'UPI': {
      const params: string[] = [];
      params.push(`pa=${encodeURIComponent(cleanAddr)}`);
      params.push(`pn=Merchant`);
      if (amount) params.push(`am=${amount.trim()}`);
      if (note) params.push(`tn=${encodeURIComponent(note.trim())}`);
      return `upi://pay?${params.join('&')}`;
    }
    default:
      return cleanAddr;
  }
}

export function formatSocial(data: SocialData): string {
  const { platform, handleOrNumber } = data;
  const clean = handleOrNumber.trim().replace(/^@/, '');
  if (!clean) return '';

  switch (platform) {
    case 'whatsapp':
      return `https://wa.me/${clean.replace(/[^\d]/g, '')}`;
    case 'instagram':
      return `https://instagram.com/${clean}`;
    case 'twitter':
      return `https://x.com/${clean}`;
    case 'linkedin':
      return clean.startsWith('http') ? clean : `https://linkedin.com/in/${clean}`;
    case 'youtube':
      return clean.startsWith('http') ? clean : `https://youtube.com/@${clean}`;
    case 'github':
      return `https://github.com/${clean}`;
    default:
      return clean;
  }
}

export function generatePayload(
  type: QRType,
  values: {
    url: string;
    text: string;
    wifi: WifiData;
    vcard: VCardData;
    email: EmailData;
    phone: string;
    sms: SmsData;
    crypto: CryptoData;
    social: SocialData;
  }
): string {
  switch (type) {
    case 'url':
      return formatUrl(values.url);
    case 'text':
      return values.text;
    case 'wifi':
      return formatWifi(values.wifi);
    case 'vcard':
      return formatVCard(values.vcard);
    case 'email':
      return formatEmail(values.email);
    case 'phone':
      return formatPhone(values.phone);
    case 'sms':
      return formatSms(values.sms);
    case 'crypto':
      return formatCrypto(values.crypto);
    case 'social':
      return formatSocial(values.social);
    default:
      return '';
  }
}
