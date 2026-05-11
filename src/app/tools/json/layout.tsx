import { toolMetadata } from '@/lib/tool-seo'

export const metadata = toolMetadata('json')

export default function JsonToolLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

