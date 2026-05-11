import { toolMetadata } from '@/lib/tool-seo'

export const metadata = toolMetadata('jwt')

export default function JwtToolLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

