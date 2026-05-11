import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { answerPages, getAnswerPage } from '@/lib/answer-pages'
import { buildMetadata } from '@/lib/seo'

export function generateStaticParams() {
  return answerPages.map((page) => ({ slug: page.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = getAnswerPage(params.slug)

  if (!page) {
    return {}
  }

  return buildMetadata({
    title: `${page.title} | MyDebugTools`,
    description: page.description,
    path: `/answers/${page.slug}/`,
    keywords: [page.toolName, page.title, 'developer tools', 'debugging tools'],
  })
}

export default function AnswerPage({ params }: { params: { slug: string } }) {
  const page = getAnswerPage(params.slug)

  if (!page) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `https://mydebugtools.com/answers/${page.slug}/#webpage`,
        name: page.title,
        description: page.description,
        url: `https://mydebugtools.com/answers/${page.slug}/`,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Answers', item: 'https://mydebugtools.com/answers/' },
          { '@type': 'ListItem', position: 2, name: page.title, item: `https://mydebugtools.com/answers/${page.slug}/` },
        ],
      },
    ],
  }

  return (
    <main className="min-h-screen bg-[#f6f8fa] px-4 py-10 text-[#24292f] sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="mx-auto max-w-3xl rounded-md border border-[#d0d7de] bg-white p-6">
        <Link href="/answers/" className="font-mono text-xs font-semibold text-[#0969da]">
          mydebugtools / answers
        </Link>
        <h1 className="mt-3 text-3xl font-semibold leading-tight">{page.title}</h1>
        <p className="mt-5 rounded-md border border-[#d0d7de] bg-[#f6f8fa] p-4 text-sm leading-6 text-[#24292f]">
          <strong>Short answer:</strong> {page.shortAnswer}
        </p>

        <h2 className="mt-8 text-xl font-semibold">Steps</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-[#57606a]">
          {page.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>

        <div className="mt-8 rounded-md border border-[#d0d7de] bg-[#f6f8fa] p-4">
          <h2 className="text-base font-semibold">Use MyDebugTools</h2>
          <p className="mt-2 text-sm leading-6 text-[#57606a]">
            Open the <Link href={page.toolHref} className="font-semibold text-[#0969da]">{page.toolName}</Link> to run this workflow in the browser.
          </p>
        </div>

        <h2 className="mt-8 text-xl font-semibold">Related tools</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {page.related.map((tool) => (
            <span key={tool} className="rounded-full border border-[#d0d7de] bg-white px-3 py-1 text-xs font-semibold text-[#57606a]">
              {tool}
            </span>
          ))}
        </div>
      </article>
    </main>
  )
}

