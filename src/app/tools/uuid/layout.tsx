import { toolMetadata } from '@/lib/tool-seo'

export const metadata = toolMetadata('uuid')

export default function UuidToolLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
