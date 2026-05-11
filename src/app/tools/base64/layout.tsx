import { toolMetadata } from '@/lib/tool-seo'

export const metadata = toolMetadata('base64')

export default function Base64ToolLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

