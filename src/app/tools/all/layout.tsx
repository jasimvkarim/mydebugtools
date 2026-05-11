import { toolItemListJsonLd, toolMetadata } from '@/lib/tool-seo'

export const metadata = toolMetadata('all')

export default function AllToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolItemListJsonLd()) }}
      />
      {children}
    </>
  )
}
