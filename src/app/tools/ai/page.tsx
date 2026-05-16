'use client';

import { useMemo, useState } from 'react';
import {
  BoltIcon,
  ClipboardDocumentIcon,
  CommandLineIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

type DebugMode = 'explain-error' | 'suggest-fix' | 'generate-curl' | 'review-api-response' | 'debug-json';

type DebugAnalysis = {
  summary: string;
  likelyCause: string;
  steps: string[];
  snippet?: string;
  cautions: string[];
};

const modes: Array<{ id: DebugMode; label: string; description: string }> = [
  { id: 'explain-error', label: 'Explain error', description: 'Turn noisy errors into likely causes.' },
  { id: 'suggest-fix', label: 'Suggest fix', description: 'Get focused next steps and checks.' },
  { id: 'generate-curl', label: 'Generate cURL', description: 'Convert notes into a safe command.' },
  { id: 'review-api-response', label: 'Review API response', description: 'Inspect status, headers, and payload.' },
  { id: 'debug-json', label: 'Debug JSON', description: 'Find parsing and schema issues.' },
];

const examples: Record<DebugMode, string> = {
  'explain-error': 'TypeError: fetch failed\\nCause: CORS request did not succeed',
  'suggest-fix': 'Next.js route handler returns 500 only in production. Logs show DATABASE_URL is undefined.',
  'generate-curl': 'POST https://api.example.com/v1/orders\\nBearer token auth\\nJSON body: { \"sku\": \"debugtools\", \"qty\": 1 }',
  'review-api-response': 'HTTP/1.1 401 Unauthorized\\nwww-authenticate: Bearer error=\"invalid_token\"\\n{ \"message\": \"jwt expired\" }',
  'debug-json': '{ \"name\": \"debugtools\", \"features\": [\"api\", \"json\",], }',
};

const emptyAnalysis: DebugAnalysis = {
  summary: '',
  likelyCause: '',
  steps: [],
  snippet: '',
  cautions: [],
};

export default function AIDebugPage() {
  const [mode, setMode] = useState<DebugMode>('explain-error');
  const [input, setInput] = useState('');
  const [analysis, setAnalysis] = useState<DebugAnalysis>(emptyAnalysis);
  const [model, setModel] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const activeMode = useMemo(() => modes.find((item) => item.id === mode) || modes[0], [mode]);
  const hasResult = Boolean(analysis.summary || analysis.steps.length || error);

  async function analyze() {
    setIsLoading(true);
    setError('');
    setIsDisabled(false);
    setAnalysis(emptyAnalysis);
    setModel('');

    try {
      const response = await fetch('/api/ai-debug', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode, input, apiKey }),
      });
      const body = await response.json();

      if (!response.ok) {
        setIsDisabled(Boolean(body.disabled));
        setError(body.message || body.error || 'AI analysis failed.');
        return;
      }

      setAnalysis(body.analysis || emptyAnalysis);
      setModel(body.model || '');
    } catch {
      setError('Could not reach the AI Debug Assistant API route.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-[1600px]">
      <section className="rounded-md border border-[#d0d7de] bg-white">
        <div className="border-b border-[#d0d7de] px-5 py-4">
          <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
            <div>
              <p className="font-mono text-xs text-[#57606a]">debugtools / ai</p>
              <h1 className="mt-2 text-2xl font-semibold text-[#24292f]">AI Debug Assistant</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-[#57606a]">
                Paste an error, API response, cURL note, stack trace, or JSON snippet. Nothing is sent until you click Analyze.
              </p>
            </div>
            <div className="rounded-md border border-[#d0d7de] bg-[#f6f8fa] px-3 py-2 text-xs font-semibold text-[#57606a]">
              Optional provider: OpenAI · Bring your own API key
            </div>
          </div>
        </div>

        <div className="grid min-h-[680px] lg:grid-cols-[360px_minmax(0,1fr)]">
          <aside className="border-b border-[#d0d7de] bg-[#f6f8fa] p-4 lg:border-b-0 lg:border-r">
            <p className="font-mono text-xs text-[#57606a]">mode</p>
            <div className="mt-3 grid gap-2">
              {modes.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setMode(item.id)}
                  className={`rounded-md border px-3 py-3 text-left transition-colors ${
                    mode === item.id
                      ? 'border-[#0969da] bg-white text-[#24292f] shadow-sm'
                      : 'border-[#d0d7de] bg-white text-[#57606a] hover:border-[#8c959f]'
                  }`}
                >
                  <span className="block text-sm font-semibold">{item.label}</span>
                  <span className="mt-1 block text-xs leading-5">{item.description}</span>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setInput(examples[mode])}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md border border-[#d0d7de] bg-white px-3 py-2 text-sm font-semibold text-[#24292f] hover:bg-[#f6f8fa]"
            >
              <ClipboardDocumentIcon className="h-4 w-4" />
              Load example
            </button>

            <div className="mt-4 rounded-md border border-[#d0d7de] bg-white p-3">
              <label htmlFor="openai-api-key" className="text-xs font-semibold text-[#24292f]">
                OpenAI API key
              </label>
              <input
                id="openai-api-key"
                type="password"
                value={apiKey}
                onChange={(event) => setApiKey(event.target.value)}
                autoComplete="off"
                spellCheck={false}
                placeholder="sk-..."
                className="mt-2 w-full rounded-md border border-[#d0d7de] bg-white px-3 py-2 font-mono text-xs text-[#24292f] outline-none focus:border-[#0969da] focus:ring-2 focus:ring-[#0969da]/15"
              />
              <p className="mt-2 text-xs leading-5 text-[#57606a]">
                Optional. Used only for this request unless the server already has an OpenAI key configured.
              </p>
            </div>

            <div className="mt-4 rounded-md border border-[#d0d7de] bg-white p-3">
              <div className="flex items-start gap-2">
                <ExclamationTriangleIcon className="mt-0.5 h-4 w-4 text-[#57606a]" />
                <p className="text-xs leading-5 text-[#57606a]">
                  Remove secrets before analyzing. Prompts and API keys are not saved by debugtools, but prompt text is sent to OpenAI when you run analysis.
                </p>
              </div>
            </div>
          </aside>

          <div className="grid gap-0 lg:grid-rows-[minmax(0,1fr)_auto]">
            <div className="grid min-h-[420px] lg:grid-cols-2">
              <div className="border-b border-[#d0d7de] p-4 lg:border-b-0 lg:border-r">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-[#24292f]">{activeMode.label}</p>
                    <p className="mt-1 text-xs text-[#57606a]">Paste only the context needed to debug.</p>
                  </div>
                  <span className="font-mono text-xs text-[#57606a]">{input.length}/16000</span>
                </div>
                <textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  spellCheck={false}
                  placeholder="Paste an error, response, cURL command, headers, JSON, or debugging note..."
                  className="min-h-[500px] w-full resize-y rounded-md border border-[#d0d7de] bg-white p-3 font-mono text-sm leading-6 text-[#24292f] outline-none focus:border-[#0969da] focus:ring-2 focus:ring-[#0969da]/15"
                />
              </div>

              <div className="bg-white p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-[#24292f]">Analysis</p>
                    <p className="mt-1 text-xs text-[#57606a]">{model ? `Model: ${model}` : 'Structured debugging output'}</p>
                  </div>
                  <SparklesIcon className="h-5 w-5 text-[#57606a]" />
                </div>

                {!hasResult && (
                  <div className="grid min-h-[500px] place-items-center rounded-md border border-dashed border-[#d0d7de] bg-[#f6f8fa] p-6 text-center">
                    <div>
                      <BoltIcon className="mx-auto h-8 w-8 text-[#57606a]" />
                      <p className="mt-3 text-sm font-semibold text-[#24292f]">Ready to analyze</p>
                      <p className="mt-2 max-w-sm text-sm leading-6 text-[#57606a]">
                        Choose a mode, paste the failing context, and click Analyze.
                      </p>
                    </div>
                  </div>
                )}

                {error && (
                  <div className={`rounded-md border p-4 ${isDisabled ? 'border-[#d0d7de] bg-[#f6f8fa]' : 'border-red-200 bg-red-50'}`}>
                    <p className="text-sm font-semibold text-[#24292f]">{isDisabled ? 'AI is disabled' : 'Request failed'}</p>
                    <p className="mt-2 text-sm leading-6 text-[#57606a]">{error}</p>
                  </div>
                )}

                {analysis.summary && (
                  <div className="space-y-4">
                    <ResultBlock icon={DocumentTextIcon} title="Summary" body={analysis.summary} />
                    <ResultBlock icon={ExclamationTriangleIcon} title="Likely cause" body={analysis.likelyCause} />
                    {analysis.steps.length > 0 && (
                      <section className="rounded-md border border-[#d0d7de] bg-white p-4">
                        <h2 className="text-sm font-semibold text-[#24292f]">Next steps</h2>
                        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-[#57606a]">
                          {analysis.steps.map((step, index) => (
                            <li key={`${step}-${index}`}>{step}</li>
                          ))}
                        </ol>
                      </section>
                    )}
                    {analysis.snippet && (
                      <section className="rounded-md border border-[#d0d7de] bg-[#f6f8fa] p-4">
                        <h2 className="text-sm font-semibold text-[#24292f]">Snippet</h2>
                        <pre className="mt-3 max-h-56 overflow-auto rounded-md bg-[#24292f] p-3 text-xs leading-5 text-white">
                          {analysis.snippet}
                        </pre>
                      </section>
                    )}
                    {analysis.cautions.length > 0 && (
                      <section className="rounded-md border border-[#d0d7de] bg-[#fff8c5] p-4">
                        <h2 className="text-sm font-semibold text-[#24292f]">Cautions</h2>
                        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-[#57606a]">
                          {analysis.cautions.map((caution, index) => (
                            <li key={`${caution}-${index}`}>{caution}</li>
                          ))}
                        </ul>
                      </section>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col justify-between gap-3 border-t border-[#d0d7de] bg-[#f6f8fa] p-4 sm:flex-row sm:items-center">
              <p className="text-xs leading-5 text-[#57606a]">
                Uses your OpenAI key for this request, or server-side `OPENAI_API_KEY` when configured. No prompts or keys are saved by this tool.
              </p>
              <button
                type="button"
                onClick={analyze}
                disabled={isLoading || !input.trim()}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#0969da] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0757b8] disabled:cursor-not-allowed disabled:bg-[#8c959f]"
              >
                <CommandLineIcon className="h-4 w-4" />
                {isLoading ? 'Analyzing...' : 'Analyze'}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ResultBlock({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof DocumentTextIcon;
  title: string;
  body: string;
}) {
  return (
    <section className="rounded-md border border-[#d0d7de] bg-white p-4">
      <div className="flex items-start gap-3">
        <Icon className="mt-0.5 h-4 w-4 text-[#57606a]" />
        <div>
          <h2 className="text-sm font-semibold text-[#24292f]">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-[#57606a]">{body}</p>
        </div>
      </div>
    </section>
  );
}
