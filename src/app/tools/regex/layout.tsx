import { toolMetadata } from '@/lib/tool-seo'

export const metadata = toolMetadata('regex')

export default function RegexToolLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

