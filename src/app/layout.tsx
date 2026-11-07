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
    default: "Tide Physics Academy | Best TRB Coaching Centre in Physics | Online & Offline Classes",
    template: "%s | Tide Physics Academy",
  },
  description: "Tide Physics Academy is the Best TRB coaching centre in physics in Tamil Nadu. Expert coaching for PG TRB, UG TRB, POLYTECHNIC TRB, AP TRB, TN SET, ENGINEERING TRB, SCERT TRB, CSIR-NET, JEE & NEET with interactive Online & Offline Classes in Tiruvannamalai.",
  keywords: [
    "Best TRB coaching centre in physics",
    "PG TRB, UG TRB, POLYTECHNIC TRB, AP TRB, SET, ENGINEERING TRB, SCERT TRB",
    "TRB Physics Online & Offline Classes",
    "TRB ACADEMY for PHYSICS — Teachers Recruitment Board (TRB) Training centre",
    "TRB Coaching classes",
    "PG TRB Physics",
    "UG TRB Physics",
    "POLYTECHNIC TRB Physics",
    "POLY TRB Physics",
    "AP TRB Assistant Professor Physics",
    "TN SET Physical Sciences",
    "ENGINEERING TRB Physics",
    "Engg. TRB Physics",
    "SCERT TRB Physics",
    "TN SCERT TRB",
    "Education & Psychology TRB",
    "CSIR - NET Physical Science",
    "JEE Physics coaching",
    "NEET Physics coaching",
    "Tide Physics Academy Tiruvannamalai",
    "Physics coaching centre Tamil Nadu",
  ],
  authors: [{ name: "Tide Physics Academy" }],
  creator: "Tide Physics Academy",
  publisher: "Tide Physics Academy",
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  alternates: {
    canonical: 'https://tidephysics.com',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Best TRB Coaching Centre in Physics | Teachers Recruitment Board (TRB) Training centre | Tide Physics Academy",
    description: "Tamil Nadu's premier institute for PG TRB, UG TRB, POLYTECHNIC TRB, AP TRB, TN SET, ENGINEERING TRB, SCERT TRB, CSIR-NET, JEE & NEET Physics. Join Online & Offline Classes at Tiruvannamalai.",
    url: 'https://tidephysics.com',
    siteName: 'Tide Physics Academy — Teachers Recruitment Board (TRB) Training centre',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://tidephysics.com/logo.png',
        width: 1024,
        height: 221,
        alt: 'Tide Physics Academy — Best TRB Coaching Centre in Physics',
      },
      {
        url: 'https://tidephysics.com/icon.png',
        width: 512,
        height: 512,
        alt: 'Tide Physics Academy Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Tide Physics Academy | Best TRB Coaching Centre in Physics",
    description: "Teachers Recruitment Board (TRB) Training centre: PG TRB, UG TRB, POLY. TRB, AP TRB, TN SET, SCERT, Engg. TRB Exams Coaching. Online & Offline Classes in Tiruvannamalai.",
    images: ['https://tidephysics.com/logo.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLdOrg = {
    '@context': 'https://schema.org',
    '@type': ['EducationalOrganization', 'LocalBusiness'],
    name: 'Tide Physics Academy',
    alternateName: [
      'Teachers Recruitment Board (TRB) Training centre',
      'Best TRB coaching centre in physics',
      'Tide Physics',
      'Tide Academy Physics',
    ],
    url: 'https://tidephysics.com',
    logo: 'https://tidephysics.com/logo.png',
    image: 'https://tidephysics.com/logo.png',
    description: "Tamil Nadu's premier coaching centre for TRB Physics: PG TRB, UG TRB, POLYTECHNIC TRB, AP TRB, TN SET, ENGINEERING TRB, SCERT TRB, CSIR-NET, JEE & NEET with live online & classroom offline courses.",
    telephone: '+919994854604',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+91-9994854604',
        contactType: 'Helpline & Admissions',
        areaServed: 'IN',
        availableLanguage: ['English', 'Tamil'],
      },
      {
        '@type': 'ContactPoint',
        telephone: '+91-9994850604',
        contactType: 'Student Helpdesk & Academic Doubts',
        areaServed: 'IN',
        availableLanguage: ['English', 'Tamil'],
      },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Mathalangula Street, Periyar Statue Backside (Opp. Sankar DTP)',
      addressLocality: 'Tiruvannamalai',
      addressRegion: 'Tamil Nadu',
      postalCode: '606601',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 12.2355155,
      longitude: 79.0747604,
    },
    hasMap: 'https://maps.app.goo.gl/R5j7rKeV4ozKHRCSA?g_st=ac',
    sameAs: [
      'https://maps.app.goo.gl/R5j7rKeV4ozKHRCSA?g_st=ac',
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
    <html lang="en" data-scroll-behavior="smooth">
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
