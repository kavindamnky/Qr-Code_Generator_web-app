import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'M-QR Pro | Custom QR Code Generator & Scanner',
  description:
    'Free, high-speed, secure QR code generator. Create custom QR codes for URLs, Wi-Fi, vCards, Emails, Crypto, and more with #00519d brand styling and instant downloads.',
  icons: {
    icon: '/favicon.png',
  },
};

const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
        {adsenseClientId && adsenseClientId !== 'ca-pub-XXXXXXXXXXXXXXXX' && (
          <Script
            id="google-adsense"
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-brand-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
