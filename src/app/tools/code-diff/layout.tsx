import { toolMetadata } from '@/lib/tool-seo'

export const metadata = toolMetadata('code-diff')

export default function CodeDiffToolLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

