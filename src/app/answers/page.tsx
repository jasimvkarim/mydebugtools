import type { Metadata } from 'next'
import Link from 'next/link'
import { answerPages } from '@/lib/answer-pages'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Developer Tool Answers | debugtools',
  description: 'Concise answers for common developer debugging tasks, with direct links to open-source debugtools utilities.',
  path: '/answers/',
  keywords: ['developer tool answers', 'json formatter answer', 'jwt decoder guide', 'api tester guide'],
})

export default function AnswersPage() {
  return (
    <main className="min-h-screen bg-[#f6f8fa] px-4 py-10 text-[#24292f] sm:px-6">
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-xs text-[#57606a]">debugtools / answers</p>
        <h1 className="mt-2 text-4xl font-semibold">Developer tool answers</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-[#57606a]">
          Short, source-friendly answers for common debugging, formatting, and inspection workflows.
        </p>

        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {answerPages.map((page) => (
            <Link
              key={page.slug}
              href={`/answers/${page.slug}/`}
              className="rounded-md border border-[#d0d7de] bg-white p-5 hover:border-[#0969da] hover:bg-[#f6f8fa]"
            >
              <h2 className="text-lg font-semibold text-[#0969da]">{page.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[#57606a]">{page.shortAnswer}</p>
              <div className="mt-4 text-sm font-semibold text-[#0969da]">Read answer</div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
