import { toolMetadata } from '@/lib/tool-seo'

export const metadata = toolMetadata('api')

export default function ApiToolLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

