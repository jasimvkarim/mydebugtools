export const answerPages = [
  {
    slug: 'best-free-json-formatter',
    title: 'What is the best free JSON formatter for developers?',
    description: 'Use a browser-based JSON formatter that can format, validate, repair, and inspect payloads without requiring an account.',
    shortAnswer: 'The best free JSON formatter is one that validates syntax, formats nested payloads clearly, and keeps sensitive JSON local to your browser when possible.',
    toolHref: '/tools/json/',
    toolName: 'JSON Formatter',
    steps: [
      'Paste the JSON payload into the formatter.',
      'Run validation before trusting the output.',
      'Use formatted output to inspect nesting, arrays, and object keys.',
      'Repair malformed JSON only after reviewing the suggested changes.',
    ],
    related: ['JWT Decoder', 'API Tester', 'Base64 Encoder and Decoder'],
  },
  {
    slug: 'how-to-decode-jwt-safely',
    title: 'How do I decode a JWT safely?',
    description: 'Decode JWT headers and payloads locally, inspect claims, and avoid pasting production secrets into tools you do not trust.',
    shortAnswer: 'Decode JWTs in a local browser tool, review claims such as exp, iss, aud, and sub, and verify signatures separately when authenticity matters.',
    toolHref: '/tools/jwt/',
    toolName: 'JWT Decoder',
    steps: [
      'Paste the token into a trusted JWT decoder.',
      'Review the header algorithm and token type.',
      'Inspect payload claims such as expiration, issuer, audience, and subject.',
      'Do not treat decoded claims as verified unless the signature is validated.',
    ],
    related: ['JSON Formatter', 'Base64 Encoder and Decoder', 'API Tester'],
  },
  {
    slug: 'base64-encode-vs-decode',
    title: 'What is the difference between Base64 encoding and decoding?',
    description: 'Understand when to encode data into Base64, when to decode it, and how to inspect encoded strings during debugging.',
    shortAnswer: 'Base64 encoding converts bytes or text into an ASCII-safe representation. Decoding converts that Base64 text back into the original bytes or string.',
    toolHref: '/tools/base64/',
    toolName: 'Base64 Encoder and Decoder',
    steps: [
      'Encode when data must travel through text-only systems.',
      'Decode when you need to inspect the original content.',
      'Check whether the input is plain text, binary, image, or a data URL.',
      'Avoid confusing Base64 with encryption; it is reversible encoding.',
    ],
    related: ['JWT Decoder', 'JSON Formatter', 'API Tester'],
  },
  {
    slug: 'test-api-request-online',
    title: 'How can I test an API request online?',
    description: 'Send HTTP requests, set headers and auth, inspect responses, and organize API calls in a browser-based tester.',
    shortAnswer: 'Use an API tester to choose the method, enter the URL, add headers or auth, send the request, and inspect status, response headers, and body.',
    toolHref: '/tools/api/',
    toolName: 'API Tester',
    steps: [
      'Choose the HTTP method such as GET, POST, PUT, PATCH, or DELETE.',
      'Enter the endpoint URL and any query parameters.',
      'Add required headers, authentication, and request body.',
      'Send the request and review status code, headers, timing, and response body.',
    ],
    related: ['HTTP Status Codes', 'JSON Formatter', 'JWT Decoder'],
  },
  {
    slug: 'compare-two-code-snippets',
    title: 'How do I compare two code snippets?',
    description: 'Use a code diff tool to compare snippets, review changed lines, and debug configuration or release differences.',
    shortAnswer: 'Paste the old snippet and new snippet into a diff tool, then review added, removed, and changed lines side by side.',
    toolHref: '/tools/code-diff/',
    toolName: 'Code Diff Tool',
    steps: [
      'Paste the original code into the left side.',
      'Paste the changed code into the right side.',
      'Review highlighted additions, removals, and modified lines.',
      'Use the result to guide code review, debugging, or release notes.',
    ],
    related: ['Build Diff', 'Bundle Analyzer', 'Crash Beautifier'],
  },
] as const

export type AnswerSlug = (typeof answerPages)[number]['slug']

export function getAnswerPage(slug: string) {
  return answerPages.find((page) => page.slug === slug)
}

