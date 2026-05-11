import type { Metadata, Viewport } from "next";
import "./globals.css";
import GoogleAnalytics from "./components/GoogleAnalytics";
import AnalyticsProvider from "./components/AnalyticsProvider";
import AuthProvider from "./components/AuthProvider";
import Providers from "./providers";
import Script from "next/script";

export const viewport: Viewport = {
  themeColor: '#FF6C37',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "MyDebugTools - All-in-one Developer Debugging Toolkit",
  description: "A powerful collection of 30+ development tools including JSON Formatter, JWT Decoder, Base64 Tools, API Tester, Code Diff, and more - all free, open-source, and privacy-focused.",
  metadataBase: new URL('https://mydebugtools.com'),
  keywords: "developer tools, json formatter, jwt decoder, base64 encoder, api tester, code diff, regex tester, online tools, web developer tools, debugging, formatting",
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
    canonical: 'https://mydebugtools.com',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mydebugtools.com/',
    siteName: 'MyDebugTools',
    title: 'MyDebugTools - All-in-one Developer Debugging Toolkit',
    description: 'A powerful collection of 30+ development tools including JSON Formatter, JWT Decoder, Base64 Tools, API Tester, Code Diff, and more - all free, open-source, and privacy-focused.',
    images: [
      {
        url: 'https://mydebugtools.com/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'MyDebugTools - All-in-one Developer Toolkit',
        type: 'image/svg+xml',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@jasimvk',
    creator: '@jasimvk',
    title: 'MyDebugTools - All-in-one Developer Debugging Toolkit',
    description: 'A powerful collection of 30+ development tools including JSON Formatter, JWT Decoder, Base64 Tools, API Tester, Code Diff, and more - all free, open-source, and privacy-focused.',
    images: ['https://mydebugtools.com/og-image.svg'],
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
        '@id': 'https://mydebugtools.com/#website',
        name: 'MyDebugTools',
        url: 'https://mydebugtools.com/',
        description: metadata.description,
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://mydebugtools.com/tools/all/?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'SoftwareApplication',
        '@id': 'https://mydebugtools.com/#app',
        name: 'MyDebugTools',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Any',
        url: 'https://mydebugtools.com/',
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
