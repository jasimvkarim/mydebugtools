import type { Metadata, Viewport } from "next";
import "./globals.css";
import GoogleAnalytics from "./components/GoogleAnalytics";
import AnalyticsProvider from "./components/AnalyticsProvider";
import AuthProvider from "./components/AuthProvider";
import Providers from "./providers";
import Script from "next/script";

const SITE_URL = 'https://debugtools.org';
const SITE_NAME = 'DEBUGTOOLS';
const SITE_DESCRIPTION = 'Open-source AI debugging toolkit for logs, stack traces, crashes, API failures, HAR files, build errors, and production issues.';
const CORE_TOOLS = [
  {
    name: 'API Tester',
    url: '/tools/api/',
    description: 'Send HTTP requests from the browser, set headers and auth, and inspect status, headers, timing, and response bodies.',
  },
  {
    name: 'JSON Formatter',
    url: '/tools/json/',
    description: 'Format, validate, repair, and inspect JSON payloads locally in the browser.',
  },
  {
    name: 'JWT Decoder',
    url: '/tools/jwt/',
    description: 'Decode JWT headers and payload claims locally without sending tokens to a debugtools server.',
  },
  {
    name: 'Base64 Encoder and Decoder',
    url: '/tools/base64/',
    description: 'Encode and decode Base64 text and files for debugging text-safe payloads.',
  },
  {
    name: 'Hash Generator',
    url: '/tools/hash/',
    description: 'Generate SHA hashes in the browser for text, payloads, and checksum comparison.',
  },
  {
    name: 'Code Diff Tool',
    url: '/tools/code-diff/',
    description: 'Compare two snippets side by side and review additions, removals, and changed lines.',
  },
  {
    name: 'URL Encoder and Decoder',
    url: '/tools/url/',
    description: 'Encode, decode, and inspect URLs, URI components, and query strings.',
  },
  {
    name: 'HTTP Status Codes',
    url: '/tools/http-status/',
    description: 'Look up HTTP status codes with concise categories and API debugging context.',
  },
  {
    name: 'AI Debug Assistant',
    url: '/tools/ai/',
    description: 'Use optional OpenAI BYOK debugging for errors, API responses, stack traces, and JSON issues.',
  },
] as const;

export const viewport: Viewport = {
  themeColor: '#24292f',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: 'DEBUGTOOLS - Open-source AI debugging toolkit for developers',
    template: '%s',
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  keywords: "DEBUGTOOLS, debugtools, open-source AI debugging toolkit, stack trace explainer, log analyzer, API tester, HAR analyzer, crash report analyzer, build error debugger, JSON formatter, JWT decoder, local-first developer tools",
  applicationName: SITE_NAME,
  authors: [{ name: 'Jasim VK', url: 'https://x.com/jasimvk' }],
  creator: 'Jasim VK',
  publisher: SITE_NAME,
  category: 'DeveloperApplication',
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
    title: 'DEBUGTOOLS - Open-source AI debugging toolkit for developers',
    description: SITE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/og-image.svg`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - Open-source AI debugging toolkit for developers`,
        type: 'image/svg+xml',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@jasimvk',
    creator: '@jasimvk',
    title: 'DEBUGTOOLS - Open-source AI debugging toolkit for developers',
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
        softwareHelp: `${SITE_URL}/answers/`,
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
      {
        '@type': 'ItemList',
        '@id': `${SITE_URL}/#core-tools`,
        name: 'Core DEBUGTOOLS developer tools',
        description: 'A concise index of local-first utilities for API, data, encoding, hashing, diff, URL, HTTP, and optional OpenAI BYOK debugging work.',
        itemListElement: CORE_TOOLS.map((tool, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: tool.name,
          url: `${SITE_URL}${tool.url}`,
          description: tool.description,
        })),
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
