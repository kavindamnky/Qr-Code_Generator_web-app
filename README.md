# M-QR Pro v2.0 - Advanced QR Code Suite

<p align="center">
  <img src="public/images/logo_gif.gif" alt="M-QR Logo" width="220"/>
</p>

<p align="center">
  <strong>Next-Generation QR Code Generator & Scanner built with Next.js, React & Tailwind CSS</strong><br>
  Designed in signature brand blue (<code>#00519d</code>) and crisp white with 100% client-side privacy.
</p>

---

## 🌟 What's New in v2.0

- 🚀 **Built with Next.js & React**: Modern component-based architecture with instant client-side rendering.
- 🎨 **Brand Identity (`#00519d` & White)**: Clean sapphire blue theme with subtle gradients and modern card styling.
- 📦 **9 Content Types**:
  - 🔗 **URL**: Web links with protocol helpers and domain shortcuts.
  - 📝 **Plain Text**: Multiline messages, coupon codes, and notes.
  - 📶 **Wi-Fi**: Auto-connecting network QR codes (WPA/WPA2/WPA3, WEP, Open, Hidden SSID).
  - 👤 **vCard 3.0**: Digital business cards (Name, Phone, Email, Company, Title, Address, Website).
  - ✉️ **Email**: Direct mailto with recipient, subject, and body.
  - 📞 **Phone Call**: One-tap phone dialer.
  - 💬 **SMS**: Number with pre-filled message text.
  - 💳 **Crypto & UPI**: Bitcoin, Ethereum, Solana, and UPI payments.
  - 🌐 **Social Profiles**: Direct links for WhatsApp, Instagram, LinkedIn, X/Twitter, YouTube, and GitHub.
- 🖌️ **Advanced Design Customization**:
  - Custom foreground and background colors (with transparent background option).
  - Linear and radial color gradients.
  - 6 Body pattern dot styles (`square`, `rounded`, `dots`, `classy`, `classy-rounded`, `extra-rounded`).
  - Customizable corner outer eye frames and inner eye dots.
  - Custom logo upload (PNG, JPG, SVG) or preset badges (M-QR, Wi-Fi, WhatsApp, Link).
  - "SCAN ME" Call-to-action frames (Bottom badge, Pill frame, Top banner, Polaroid card).
- 📥 **Multi-Format High-Res Exports**:
  - PNG (up to 2048px ultra HD).
  - SVG (infinite vector scalability for print & merchandise).
  - PDF (ready-to-print branded A4 template).
  - One-click copy image directly to clipboard.
  - Native Web Share API integration.
- 🕒 **Saved History**: Auto-saves generated codes to browser `localStorage` for instant re-editing.
- 📷 **Integrated QR Scanner**: Upload an image or use your device camera to decode any QR code.
- 🛡️ **100% Client-Side Privacy**: No external APIs or tracking. Your data never leaves your device.

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ or 20+
- npm 9+

### Installation

```bash
# Install dependencies
npm install

# Run the local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to start generating QR codes!

### Production Build

```bash
npm run build
npm run start
```

---

## 🏛️ Project Architecture

```
├── app/
│   ├── globals.css         # Tailwind base and custom directives
│   ├── layout.tsx          # Root layout and metadata
│   └── page.tsx            # Main application dashboard
├── components/
│   ├── Navbar.tsx          # Brand header with history and scanner triggers
│   ├── TypeSelector.tsx    # 9-type tab selector
│   ├── forms/
│   │   └── TypeForms.tsx   # Dynamic input forms for each QR type
│   ├── CustomizationAccordion.tsx # Design, colors, shapes, logos, and frames
│   ├── QRPreview.tsx       # Live vector canvas preview and export actions
│   ├── HistoryDrawer.tsx   # Slide-out drawer for saved QR codes
│   ├── QRScannerModal.tsx  # QR code image upload & webcam scanner
│   └── Footer.tsx          # Credits and privacy guarantees
├── legacy/                 # Original v1 files (index.html & style.css)
├── public/                 # Static assets (logos, icons)
├── types/
│   └── qr.ts               # Complete TypeScript data contracts
└── utils/
    ├── qrGenerators.ts     # Wi-Fi, vCard, mailto, and crypto payload formatters
    └── exportUtils.ts      # Canvas framing, PNG, SVG, PDF, and clipboard utilities
```

---

## ©️ Attribution

- **Project:** M-QR v2.0 Pro
- **Original Concept & Logo:** M"Builds Studios by **V.Kavinda [MNKY]**
- **Re-engineered with:** Next.js, React, Tailwind CSS, Lucide Icons, QR-Code-Styling & jsPDF
