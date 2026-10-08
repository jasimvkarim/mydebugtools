import type { Metadata } from 'next';
import Navigation from '../components/Navigation';
import './ProductDemo.css';

export const metadata: Metadata = {
  title: 'DocsAnalyzer - bank statements, analyzed in private | debugtools',
  description: 'A one-minute tour of DocsAnalyzer using its built-in sample statement.',
};

export default function DocsAnalyzerPage() {
  return (
    <main className="min-h-screen bg-[#f6f8fa] text-[#24292f]">
      <Navigation />
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="rounded-md border border-[#d0d7de] bg-white p-5">
          <h1 className="text-3xl font-semibold">DocsAnalyzer</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#57606a]">
            Bank statements, analyzed in private. DocsAnalyzer turns a statement document into a searchable table of transactions.
          </p>
          <section className="product-demo" aria-labelledby="product-demo-heading">
            <h2 id="product-demo-heading">See DocsAnalyzer in action</h2>
            <p>A one-minute tour using the built-in sample statement.</p>
            <video
              controls
              playsInline
              preload="none"
              width={1280}
              height={720}
              poster="/media/DocsAnalyzer-demo-poster.jpg"
              aria-label="DocsAnalyzer product demo with narration and English captions"
            >
              <source src="/media/DocsAnalyzer-demo.mp4" type="video/mp4" />
              Your browser does not support video. <a href="/media/DocsAnalyzer-demo.mp4">Download the demo</a>.
            </video>
            <p className="product-demo-note">Real product views. Made-up sample data. Captions included.</p>
          </section>
          <p className="mt-4 text-sm">
            <a className="text-[#0969da] underline" href="https://docsanalyzer.com/">Open DocsAnalyzer</a>
          </p>
        </div>
      </section>
    </main>
  );
}
