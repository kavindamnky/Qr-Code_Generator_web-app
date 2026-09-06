export type QRType =
  | 'url'
  | 'text'
  | 'wifi'
  | 'vcard'
  | 'email'
  | 'phone'
  | 'sms'
  | 'crypto'
  | 'social';

export type DotType =
  | 'dots'
  | 'rounded'
  | 'classy'
  | 'classy-rounded'
  | 'square'
  | 'extra-rounded';

export type CornerSquareType = 'dot' | 'square' | 'extra-rounded';

export type CornerDotType = 'dot' | 'square';

export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export type FrameType =
  | 'none'
  | 'bottom-badge'
  | 'bottom-pill'
  | 'top-badge'
  | 'polaroid'
  | 'bordered';

export interface QRStyleOptions {
  fgColor: string;
  bgColor: string;
  isTransparentBg: boolean;
  useGradient: boolean;
  gradientType: 'linear' | 'radial';
  gradientColor2: string;
  gradientRotation: number;
  dotType: DotType;
  cornerSquareType: CornerSquareType;
  cornerDotType: CornerDotType;
  cornerSquareColor: string;
  cornerDotColor: string;
  customEyeColors: boolean;
  logoUrl?: string;
  logoSize: number; // 0.1 to 0.5
  logoMargin: number; // 0 to 20
  frameType: FrameType;
  frameText: string;
  frameColor: string;
  frameTextColor: string;
  size: number; // pixels
  margin: number; // quiet zone
  errorCorrectionLevel: ErrorCorrectionLevel;
}

export interface WifiData {
  ssid: string;
  password?: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
  hidden: boolean;
}

export interface VCardData {
  firstName: string;
  lastName: string;
  organization: string;
  title: string;
  phone: string;
  email: string;
  website: string;
  address: string;
}

export interface EmailData {
  email: string;
  subject: string;
  body: string;
}

export interface SmsData {
  phone: string;
  message: string;
}

export interface CryptoData {
  currency: 'BTC' | 'ETH' | 'SOL' | 'UPI';
  address: string;
  amount?: string;
  note?: string;
}

export interface SocialData {
  platform: 'whatsapp' | 'instagram' | 'linkedin' | 'twitter' | 'youtube' | 'github';
  handleOrNumber: string;
}

export interface QRHistoryItem {
  id: string;
  type: QRType;
  title: string;
  rawPayload: string;
  timestamp: number;
  previewDataUrl?: string;
  style: QRStyleOptions;
}
