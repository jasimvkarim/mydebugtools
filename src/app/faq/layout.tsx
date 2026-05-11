import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'FAQ - MyDebugTools',
  description: 'Answers about MyDebugTools privacy, open-source licensing, browser support, available developer tools, contributions, and usage limits.',
  path: '/faq/',
  keywords: ['mydebugtools faq', 'developer tools faq', 'open source developer tools', 'privacy focused tools'],
})

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

