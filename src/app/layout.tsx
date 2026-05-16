import type { Metadata, Viewport } from "next";
import "./globals.css";
import GoogleAnalytics from "./components/GoogleAnalytics";
import AnalyticsProvider from "./components/AnalyticsProvider";
import AuthProvider from "./components/AuthProvider";
import Providers from "./providers";
import Script from "next/script";

const SITE_URL = 'https://debugtools.org';
const SITE_NAME = 'debugtools';
const SITE_DESCRIPTION = 'A local-first open-source workbench for API testing, data inspection, build debugging, and everyday developer operations.';

export const viewport: Viewport = {
  themeColor: '#FF6C37',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "debugtools - Local-first open-source developer workbench",
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  keywords: "debugtools, developer tools, api tester, json formatter, jwt decoder, code diff, local-first tools, open source developer tools, debugging, formatting",
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'debugtools - Local-first open-source developer workbench',
    description: SITE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/og-image.svg`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - Local-first open-source developer workbench`,
        type: 'image/svg+xml',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@jasimvk',
    creator: '@jasimvk',
    title: 'debugtools - Local-first open-source developer workbench',
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/og-image.svg`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const siteJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SITE_URL}/tools/all/?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${SITE_URL}/#app`,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Any',
        url: SITE_URL,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        author: {
          '@type': 'Person',
          name: 'Jasim VK',
          url: 'https://x.com/jasimvk',
        },
      },
    ],
  };

  return (
    <html lang="en">
      <body className="antialiased bg-white text-gray-900 min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT && (
          <Script
            id="adsbygoogle-init"
            strategy="afterInteractive"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
          />
        )}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
        <AuthProvider>
          <AnalyticsProvider>
            <Providers>
              {children}
            </Providers>
          </AnalyticsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
