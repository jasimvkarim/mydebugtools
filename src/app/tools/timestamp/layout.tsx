import { toolMetadata } from '@/lib/tool-seo'

export const metadata = toolMetadata('timestamp')

export default function TimestampToolLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
