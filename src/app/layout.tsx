import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";

export const viewport: Viewport = {
  themeColor: '#3B0C75',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://tidephysics.com'),
  title: {
    default: "Tide Physics Academy | CSIR-NET & GATE Coaching",
    template: "%s | Tide Physics",
  },
  description: "Tide Physics Academy is India's premier institute for CSIR-NET Physical Sciences, GATE Physics & M.Sc entrances with live classes & mock tests.",
  keywords: [
    "Tide Physics Academy",
    "CSIR NET Physical Sciences",
    "GATE Physics coaching",
    "M.Sc Physics entrance",
    "IIT JAM Physics",
  ],
  authors: [{ name: "Tide Physics Academy" }],
  creator: "Tide Physics Academy",
  publisher: "Tide Physics Academy",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/logo.png',
  },
  alternates: {
    canonical: 'https://tidephysics.com',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Tide Physics Academy | CSIR-NET & GATE Coaching",
    description: "Tide Physics Academy is India's premier institute for CSIR-NET Physical Sciences, GATE Physics & M.Sc entrances with live classes & mock tests.",
    url: 'https://tidephysics.com',
    siteName: 'Tide Physics Academy',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://tidephysics.com/logo.png',
        width: 1200,
        height: 630,
        alt: 'Tide Physics Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Tide Physics Academy | CSIR-NET & GATE Coaching",
    description: "Premier online coaching for CSIR-NET Physical Sciences and GATE Physics.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLdOrg = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Tide Physics Academy',
    alternateName: ['Tide Physics', 'PhysicsCoach Pro'],
    url: 'https://tidephysics.com',
    logo: 'https://tidephysics.com/logo.png',
    description: "India's premier coaching institute for CSIR-NET Physical Sciences, GATE Physics, and M.Sc Physics entrance examinations.",
    telephone: '+919876543210',
    email: 'admissions@tidephysics.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
      addressLocality: 'New Delhi',
    },
    sameAs: [
      'https://www.youtube.com',
      'https://t.me/tidephysics',
    ],
  };

  const jsonLdWebSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Tide Physics Academy',
    url: 'https://tidephysics.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://tidephysics.com/courses?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="canonical" href="https://tidephysics.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Poppins:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
