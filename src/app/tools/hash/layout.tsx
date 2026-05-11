import { toolMetadata } from '@/lib/tool-seo'

export const metadata = toolMetadata('hash')

export default function HashToolLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
