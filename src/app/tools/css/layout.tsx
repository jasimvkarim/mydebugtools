import { toolMetadata } from '@/lib/tool-seo'

export const metadata = toolMetadata('css')

export default function CssToolLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

