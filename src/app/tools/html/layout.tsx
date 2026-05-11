import { toolMetadata } from '@/lib/tool-seo'

export const metadata = toolMetadata('html')

export default function HtmlToolLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

