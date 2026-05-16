type DebugMode =
  | 'explain-error'
  | 'suggest-fix'
  | 'generate-curl'
  | 'review-api-response'
  | 'debug-json';

const MODE_LABELS: Record<DebugMode, string> = {
  'explain-error': 'Explain error',
  'suggest-fix': 'Suggest fix',
  'generate-curl': 'Generate cURL',
  'review-api-response': 'Review API response',
  'debug-json': 'Debug JSON',
};

const DEFAULT_MODEL = 'gpt-4.1-mini';
const MAX_INPUT_LENGTH = 16000;

function jsonResponse(body: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
  });
}

function isDebugMode(value: unknown): value is DebugMode {
  return typeof value === 'string' && value in MODE_LABELS;
}

function extractOutputText(payload: any): string {
  if (typeof payload.output_text === 'string') return payload.output_text;

  const chunks: string[] = [];
  for (const item of payload.output ?? []) {
    for (const content of item.content ?? []) {
      if (typeof content.text === 'string') chunks.push(content.text);
    }
  }
  return chunks.join('\n').trim();
}

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return jsonResponse(
      {
        error: 'AI Debug Assistant is not configured',
        message: 'Set OPENAI_API_KEY on the server to enable AI analysis.',
        disabled: true,
      },
      { status: 501 },
    );
  }

  let body: { mode?: unknown; input?: unknown };
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON request body' }, { status: 400 });
  }

  if (!isDebugMode(body.mode)) {
    return jsonResponse({ error: 'Choose a valid debug mode.' }, { status: 400 });
  }

  const input = typeof body.input === 'string' ? body.input.trim() : '';
  if (!input) {
    return jsonResponse({ error: 'Paste an error, response, cURL, headers, JSON, or note to analyze.' }, { status: 400 });
  }
  if (input.length > MAX_INPUT_LENGTH) {
    return jsonResponse({ error: `Input is too large. Keep it under ${MAX_INPUT_LENGTH.toLocaleString()} characters.` }, { status: 413 });
  }

  const model = process.env.OPENAI_MODEL || DEFAULT_MODEL;

  try {
    const providerResponse = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        input: [
          {
            role: 'system',
            content: 'You are a practical debugging assistant inside debugtools. Return concise JSON with summary, likelyCause, steps, snippet, and cautions. Do not claim you ran commands or accessed external systems.',
          },
          {
            role: 'user',
            content: `Mode: ${MODE_LABELS[body.mode]}\n\nInput:\n${input}`,
          },
        ],
        max_output_tokens: 1200,
        text: {
          format: {
            type: 'json_schema',
            name: 'debug_analysis',
            strict: true,
            schema: {
              type: 'object',
              additionalProperties: false,
              properties: {
                summary: { type: 'string' },
                likelyCause: { type: 'string' },
                steps: { type: 'array', items: { type: 'string' } },
                snippet: { type: 'string' },
                cautions: { type: 'array', items: { type: 'string' } },
              },
              required: ['summary', 'likelyCause', 'steps', 'snippet', 'cautions'],
            },
          },
        },
      }),
    });

    const payload = await providerResponse.json().catch(() => ({}));
    if (!providerResponse.ok) {
      return jsonResponse(
        {
          error: 'AI provider request failed',
          message: payload?.error?.message || 'The configured AI provider returned an error.',
          providerStatus: providerResponse.status,
        },
        { status: 502 },
      );
    }

    const outputText = extractOutputText(payload);
    let analysis;
    try {
      analysis = JSON.parse(outputText);
    } catch {
      analysis = {
        summary: outputText || 'The AI provider returned an empty analysis.',
        likelyCause: 'No structured likely cause was returned.',
        steps: ['Review the raw analysis and retry with a smaller, focused input.'],
        snippet: '',
        cautions: ['The response could not be parsed as structured JSON.'],
      };
    }

    return jsonResponse({ analysis, model });
  } catch {
    return jsonResponse(
      {
        error: 'AI analysis failed',
        message: 'The server could not reach the configured AI provider.',
      },
      { status: 502 },
    );
  }
}
