import { toolMetadata } from '@/lib/tool-seo'

export const metadata = toolMetadata('url')

export default function UrlToolLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

