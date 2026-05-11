import { toolMetadata } from '@/lib/tool-seo'

export const metadata = toolMetadata('bundle-analyzer')

export default function BundleAnalyzerToolLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

