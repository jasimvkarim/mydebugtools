'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';

interface StructuredDataProps {
  id?: string;
  title?: string;
  description?: string;
  type?: 'WebApplication' | 'WebSite' | 'WebPage' | 'SoftwareApplication' | 'FAQPage' | 'ItemList' | 'Organization';
  toolType?: string;
  schema?: Record<string, unknown> | Record<string, unknown>[];
}

export default function StructuredData({
  id = 'structured-data',
  title = 'debugtools - All-in-one Developer Debugging Toolkit',
  description = 'A powerful collection of development tools including JSON Formatter, JWT Decoder, Base64 Tools, API Tester, and Icon Finder - all in one place.',
  type = 'WebApplication',
  toolType,
  schema: explicitSchema,
}: StructuredDataProps) {
  const pathname = usePathname();
  const url = `https://debugtools.org${pathname}`;
  
  // Basic schema that applies to the whole application
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': type,
    name: title,
    description: description,
    url: url,
    applicationCategory: 'DeveloperApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    author: {
      '@type': 'Person',
      name: 'Jasim VK',
      url: 'https://twitter.com/jasimvk'
    },
    keywords: [
      'developer tools',
      'web development',
      'JSON formatter',
      'color picker',
      'icon finder',
      'JWT decoder',
      'Base64 encoder',
      'API tester',
      'regex tester',
    ],
  };
  
  // Tool-specific schema
  let schema: Record<string, unknown> = baseSchema;
  
  if (toolType) {
    const toolSchemaAdditions = {
      potentialAction: {
        '@type': 'UseAction',
        target: url
      },
      additionalType: `https://schema.org/SoftwareApplication${toolType ? `, https://schema.org/${toolType}` : ''}`,
    };
    
    schema = { ...baseSchema, ...toolSchemaAdditions };
  }
  
  const outputSchema = explicitSchema
    ? Array.isArray(explicitSchema)
      ? { '@context': 'https://schema.org', '@graph': explicitSchema }
      : explicitSchema
    : schema;

  return (
    <Script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(outputSchema) }}
      strategy="afterInteractive"
    />
  );
}
