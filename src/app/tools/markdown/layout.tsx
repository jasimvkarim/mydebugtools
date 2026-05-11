import { toolMetadata } from '@/lib/tool-seo'

export const metadata = toolMetadata('markdown')

export default function MarkdownToolLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

