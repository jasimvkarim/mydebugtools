import type { Metadata } from 'next'

export function buildMetadata({
  title,
  description,
  path,
  keywords,
}: {
  title: string
  description: string
  path: string
  keywords?: readonly string[]
}): Metadata {
  const url = `https://debugtools.org${path}`
  const image = 'https://debugtools.org/og-image.svg'
  return {
    title,
    description,
    metadataBase: new URL('https://debugtools.org'),
    alternates: { canonical: url },
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
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      siteName: 'debugtools',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
          type: 'image/svg+xml',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    keywords: keywords?.join(', '),
  }
}
