import { toolMetadata } from '@/lib/tool-seo'

export const metadata = toolMetadata('prompt-generator')

export default function PromptGeneratorToolLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
