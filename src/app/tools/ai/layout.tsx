import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'AI Debug Assistant | debugtools',
  description: 'Use AI-assisted debugging for errors, API responses, stack traces, JSON issues, and logs while keeping sensitive details out of prompts.',
  path: '/tools/ai/',
  keywords: ['ai debug assistant', 'debug errors with ai', 'stack trace analysis', 'api response debugging', 'json debugging'],
})

export default function AiToolLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
