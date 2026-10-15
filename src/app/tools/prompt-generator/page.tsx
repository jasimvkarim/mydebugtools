'use client';

import { useEffect, useMemo, useState } from 'react';
import { ClipboardIcon, SparklesIcon } from '@heroicons/react/24/outline';

type Mode = 'general' | 'coding' | 'image' | 'video';
type OutputFormat = 'text' | 'xml' | 'json';

const MODES: { id: Mode; label: string }[] = [
  { id: 'general', label: 'General' },
  { id: 'coding', label: 'Coding' },
  { id: 'image', label: 'Image' },
  { id: 'video', label: 'Video' },
];

type TaskType = {
  id: string;
  label: string;
  instructions: string[];
  outputFormat: string[];
};

const TASK_TYPES: TaskType[] = [
  {
    id: 'feature',
    label: 'New feature',
    instructions: [
      'Follow the existing code style, naming, and patterns already present in the project.',
      'Keep the change scoped to the feature described; do not refactor unrelated code.',
      'Handle edge cases and invalid input explicitly.',
      'Add or update tests for the new behavior where the project has a test setup.',
    ],
    outputFormat: [
      'List the files you will create or modify before writing code.',
      'Provide complete, runnable code for each change (no placeholders).',
      'End with a short note on how to verify the feature works.',
    ],
  },
  {
    id: 'bugfix',
    label: 'Bug fix',
    instructions: [
      'First identify the most likely root cause from the symptoms and code provided.',
      'Propose the smallest fix that resolves the root cause, not just the symptom.',
      'Call out any other places in the codebase likely affected by the same bug.',
      'Suggest a regression test that would have caught this bug.',
    ],
    outputFormat: [
      'Root cause: one short paragraph.',
      'Fix: complete corrected code with a one-line explanation per change.',
      'Verification: steps to confirm the bug is gone.',
    ],
  },
  {
    id: 'refactor',
    label: 'Refactor',
    instructions: [
      'Preserve exact external behavior and public APIs unless a change is requested.',
      'Prefer small, mechanical transformations over clever rewrites.',
      'Explain the reason for each structural change in one line.',
      'Flag anything that looks like a latent bug, but do not fix it in this pass.',
    ],
    outputFormat: [
      'Summary of what changes and why (bullet list).',
      'The refactored code in full.',
      'A checklist of behaviors that must remain identical.',
    ],
  },
  {
    id: 'tests',
    label: 'Write tests',
    instructions: [
      'Match the testing framework and conventions already used in the project.',
      'Cover the happy path, edge cases, and failure modes - not just line coverage.',
      'Use descriptive test names that read as behavior specifications.',
      'Avoid mocking more than necessary; note where a real integration test would be better.',
    ],
    outputFormat: [
      'Complete test file(s), ready to run.',
      'A short list of cases intentionally left out and why.',
    ],
  },
  {
    id: 'review',
    label: 'Code review',
    instructions: [
      'Review for correctness first, then security, performance, readability, and style - in that order.',
      'Distinguish blockers (must fix) from suggestions (nice to have).',
      'Quote the specific lines each comment refers to.',
      'Assume good intent; be direct but constructive.',
    ],
    outputFormat: [
      'Verdict: approve / approve with comments / request changes, with one sentence why.',
      'Blockers: numbered list.',
      'Suggestions: numbered list.',
    ],
  },
  {
    id: 'explain',
    label: 'Explain code',
    instructions: [
      'Start with a two-sentence summary of what the code does and why it exists.',
      'Walk through the logic in execution order, not line order.',
      'Explain non-obvious idioms, library calls, or patterns when they first appear.',
      'Point out anything surprising, risky, or likely to confuse a new reader.',
    ],
    outputFormat: [
      'Summary (2 sentences).',
      'Walkthrough with short headers.',
      'Gotchas / things to watch: bullet list.',
    ],
  },
];

const STACK_HINTS: [RegExp, string][] = [
  [/\btypescript\b/i, 'TypeScript'],
  [/\bjavascript\b/i, 'JavaScript'],
  [/\bnext\.?\s?js\b/i, 'Next.js'],
  [/\breact\b/i, 'React'],
  [/\bnode\.?\s?js\b/i, 'Node.js'],
  [/\bvue\b/i, 'Vue'],
  [/\bsvelte\b/i, 'Svelte'],
  [/\bpython\b/i, 'Python'],
  [/\bdjango\b/i, 'Django'],
  [/\bflask\b/i, 'Flask'],
  [/\brust\b/i, 'Rust'],
  [/\bgolang\b|\bgo\b/i, 'Go'],
  [/\bswift\b/i, 'Swift'],
  [/\bkotlin\b/i, 'Kotlin'],
  [/\bjava\b/i, 'Java'],
  [/\bc\+\+\b|\bcpp\b/i, 'C++'],
  [/\bc#\b|\bcsharp\b|\.net\b/i, 'C#/.NET'],
  [/\bphp\b/i, 'PHP'],
  [/\blaravel\b/i, 'Laravel'],
  [/\bruby\b|\brails\b/i, 'Ruby on Rails'],
  [/\btailwind\b/i, 'Tailwind'],
  [/\bpostgres(ql)?\b/i, 'PostgreSQL'],
  [/\bmysql\b/i, 'MySQL'],
  [/\bsqlite\b/i, 'SQLite'],
  [/\bmongo(db)?\b/i, 'MongoDB'],
  [/\bdocker\b/i, 'Docker'],
];

const ASSISTANT_HINTS: [RegExp, string][] = [
  [/\bcodex\b|\bopenai\b/i, 'Codex (OpenAI)'],
  [/\bcursor\b/i, 'Cursor'],
  [/\bcopilot\b/i, 'GitHub Copilot'],
  [/\bclaude\b/i, 'Claude Code'],
];

const GENERAL_TONE_HINTS: [RegExp, string][] = [
  [/\bformal\b|\bprofessional\b|\bbusiness\b|\bcorporate\b/i, 'Professional'],
  [/\bcasual\b|\bfriendly\b|\bfun\b|\bplayful\b/i, 'Friendly'],
  [/\bpersuasive\b|\bconvince\b|\bsell\b|\bsales\b|\bpitch\b/i, 'Persuasive'],
  [/\btechnical\b|\bdocs?\b|\bdocumentation\b|\bengineering\b/i, 'Technical'],
];

const AUDIENCE_HINT =
  /\bfor (developers?|engineers?|customers?|clients?|students?|kids|children|beginners?|investors?|recruiters?|marketers?|designers?|founders?|my team|my boss|teachers?)\b/i;

const IMAGE_STYLE_HINTS: [RegExp, string][] = [
  [/\bpixel\s?art\b|\b8-?bit\b|\b16-?bit\b|\bretro game\b/i, 'Pixel art'],
  [/\bwater\s?colou?r\b/i, 'Watercolor'],
  [/\b3d\b|\brender\b|\bblender\b|\bcgi\b/i, '3D render'],
  [/\banime\b|\bmanga\b|\billustration\b|\bdrawing\b|\bsketch\b|\bcartoon\b/i, 'Illustration'],
  [/\bflat\b|\bminimal\b|\blogo\b|\bicon\b|\bvector\b/i, 'Flat / minimal'],
  [/\bcinematic\b|\bfilm\b|\bmovie\b/i, 'Cinematic'],
];

const VIDEO_STYLE_HINTS: [RegExp, string][] = [
  [/\banime\b|\bmanga\b/i, 'Anime'],
  [/\b3d\b|\bcgi\b|\bpixar\b/i, '3D animation'],
  [/\bdocumentary\b|\bdocu\b|\bnews\b/i, 'Documentary'],
  [/\brealistic\b|\braw\b|\bfootage\b|\bvlog\b/i, 'Realistic'],
];

const CAMERA_HINTS: [RegExp, string][] = [
  [/\bstatic\b|\bstill\b|\blocked\b|\btripod\b/i, 'Static'],
  [/\bhandheld\b|\bshaky\b|\bpov\b/i, 'Handheld'],
  [/\bdrone\b|\baerial\b|\bbird'?s?[- ]?eye\b|\boverhead\b/i, 'Aerial drone'],
  [/\borbit\b|\bcircling\b|\baround\b/i, 'Orbit'],
  [/\btracking\b|\bfollow\b|\bchase\b/i, 'Tracking shot'],
  [/\bpush[- ]?in\b|\bzoom in\b|\bdolly\b|\bclose[- ]?up\b/i, 'Slow push-in'],
];

function pick(text: string, hints: [RegExp, string][]): string | null {
  for (const [re, value] of hints) {
    if (re.test(text)) return value;
  }
  return null;
}

function inferCodingTask(text: string): TaskType {
  if (/\bbug\b|\berrors?\b|\bfix\b|\bfixing\b|\bbroken\b|\bfails?\b|\bfailing\b|\bflaky\b|\bcrash(es|ing)?\b|\bexception\b|\bnot working\b|\bregression\b|\bundefined is not\b|\btypeerror\b/i.test(text)) return TASK_TYPES[1];
  if (/\brefactor\b|\bclean ?up\b|\bsimplify\b|\brestructure\b|\breorganize\b|\bduplicat/i.test(text)) return TASK_TYPES[2];
  if (/\btests?\b|\bcoverage\b|\bunit tests?\b|\bintegration tests?\b|\be2e\b|\bspec\b/i.test(text)) return TASK_TYPES[3];
  if (/\breview\b|\bcritique\b|\bcheck my code\b|\bpr feedback\b/i.test(text)) return TASK_TYPES[4];
  if (/\bexplain\b|\bwhat does\b|\bhow does\b|\bwalk me through\b|\bunderstand\b/i.test(text)) return TASK_TYPES[5];
  return TASK_TYPES[0];
}

function inferStack(text: string): string[] {
  const found: string[] = [];
  for (const [re, value] of STACK_HINTS) {
    if (re.test(text) && !found.includes(value)) found.push(value);
    if (found.length >= 3) break;
  }
  return found;
}

function inferRatio(text: string, fallback: string): string {
  if (/\b9:16\b|\bvertical\b|\bportrait\b|\bstor(y|ies)\b|\breels?\b|\btiktok\b|\bshorts?\b/i.test(text)) return '9:16';
  if (/\b16:9\b|\bwide(screen)?\b|\blandscape\b|\bbanner\b|\bwallpaper\b|\bthumbnail\b|\byoutube\b/i.test(text)) return '16:9';
  if (/\b1:1\b|\bsquare\b/i.test(text)) return '1:1';
  return fallback;
}

const IMAGE_NEGATIVE = 'blurry, low quality, distorted anatomy, extra limbs, watermark, text';
const VIDEO_NEGATIVE = 'flicker, warped motion, morphing artifacts, watermark, text';

const GENERAL_INSTRUCTIONS = [
  'If anything important is ambiguous, state your assumption and continue.',
  'Match the tone and audience above.',
  'Use clear structure: short headings, bullets where they help, no filler.',
  'End with anything you deliberately left out, or a suggested next step.',
];

type Technique = { id: string; label: string; line: string };
const TECHNIQUES: Technique[] = [
  { id: 'steps', label: 'Think step by step', line: 'Work through the problem step by step before giving the final answer.' },
  { id: 'ask', label: 'Ask questions first', line: 'Before answering, ask up to three clarifying questions if the request is underspecified. If it is clear, skip this.' },
  { id: 'check', label: 'Self-check', line: 'Before finishing, re-read your answer against the requirements and fix any gaps.' },
  { id: 'honest', label: 'Flag uncertainty', line: 'Say so when you are unsure or guessing. Do not invent facts, names, or sources.' },
  { id: 'concise', label: 'Keep it short', line: 'Be concise. Leave out preamble and repeated restatements.' },
];

type Template = { label: string; text: string; role?: string };
const TEMPLATES: Record<Mode, Template[]> = {
  general: [
    { label: 'Summarize', role: 'a careful editor', text: 'Summarize the following {{content_type}} for {{audience}} in {{length}}. Keep the key decisions and numbers.\n\n{{text}}' },
    { label: 'Reply to email', role: 'a clear, courteous communicator', text: 'Write a friendly, professional reply to the email below. My goal: {{goal}}.\n\n{{email}}' },
    { label: 'Blog outline', role: 'an experienced content strategist', text: 'Outline a blog post about {{topic}} for {{audience}}. Include a hook, 5 to 7 sections, and a closing takeaway.' },
    { label: 'Brainstorm', text: 'Give me 10 distinct ideas for {{topic}}. Make them specific, not generic, and rank the top three with a one-line reason each.' },
    { label: 'Study plan', role: 'a patient tutor', text: 'Build a friendly study plan for {{subject}} over {{days}} days. I can study {{hours}} hours a day and my weak spots are {{weak_spots}}.' },
  ],
  coding: [
    { label: 'Fix a bug', text: 'Fix this bug in our {{stack}} app: {{symptom}}. It happens when {{steps}}. Error message: {{error}}' },
    { label: 'Add a feature', text: 'Add {{feature}} to our {{stack}} project. It should {{behavior}}.' },
    { label: 'Write tests', text: 'Write tests for {{target}} in {{stack}}. Cover edge cases around {{edge_cases}}.' },
    { label: 'Review a PR', text: 'Review this change for correctness and security. Context: {{context}}.\n\n{{diff}}' },
    { label: 'Refactor', text: 'Refactor {{target}} in {{stack}} to reduce duplication without changing behavior.' },
  ],
  image: [
    { label: 'Product shot', text: 'A {{product}} on a clean surface, soft window light, shallow depth of field, minimal background' },
    { label: 'Logo', text: 'A flat minimal logo for {{brand}}, a {{industry}} brand, simple shapes, two colors' },
    { label: 'Portrait', text: 'A portrait of {{subject}}, cinematic, golden hour, 85mm lens' },
    { label: 'Scene', text: 'A cinematic {{place}} at {{time_of_day}}, vertical for a story' },
  ],
  video: [
    { label: 'Product teaser', text: 'A slow push-in on {{product}} on a dark surface, soft rim light, cinematic' },
    { label: 'City at night', text: 'A drone shot over a rainy neon city at night, for tiktok' },
    { label: 'Nature', text: 'A realistic timelapse of {{place}} from sunrise to full daylight' },
  ],
};

const IMAGE_STYLES = ['Photorealistic', 'Cinematic', 'Illustration', '3D render', 'Watercolor', 'Pixel art', 'Flat / minimal'];
const LIGHTING = ['Soft natural light', 'Golden hour', 'Studio softbox', 'Neon / night', 'Overcast', 'Dramatic low-key'];
const FRAMING = ['Close-up', 'Medium shot', 'Wide shot', 'Overhead', 'Low angle'];
const VIDEO_STYLES = ['Cinematic', 'Realistic', 'Documentary', 'Anime', '3D animation'];
const CAMERAS = ['Static', 'Handheld', 'Aerial drone', 'Orbit', 'Tracking shot', 'Slow push-in'];
const RATIOS = ['1:1', '16:9', '9:16', '4:3', '3:4'];
const LENGTHS = ['One paragraph', 'Under 150 words', 'Around 500 words', 'Detailed and long'];
const TONES = ['Professional', 'Friendly', 'Persuasive', 'Technical', 'Plain and direct'];
const IMAGE_TARGETS = ['Plain sentence', 'Midjourney'];
const FORMATS: { id: OutputFormat; label: string }[] = [
  { id: 'text', label: 'Markdown' },
  { id: 'xml', label: 'XML tags' },
  { id: 'json', label: 'JSON' },
];

type Section = { key: string; title: string; body: string | string[] };

const VAR_RE = /\{\{\s*([a-zA-Z_][a-zA-Z0-9_ ]*?)\s*\}\}/g;

function findVars(...texts: string[]): string[] {
  const out: string[] = [];
  for (const t of texts) {
    for (const m of t.matchAll(VAR_RE)) {
      const name = m[1].trim();
      if (!out.includes(name)) out.push(name);
    }
  }
  return out;
}

function fillVars(text: string, values: Record<string, string>): string {
  return text.replace(VAR_RE, (whole, raw: string) => {
    const v = values[raw.trim()];
    return v && v.trim() ? v.trim() : whole;
  });
}

function renderSections(sections: Section[], format: OutputFormat, meta: Record<string, unknown>): string {
  const live = sections.filter((s) => (Array.isArray(s.body) ? s.body.length : s.body.trim()));
  if (format === 'json') {
    const obj: Record<string, unknown> = { ...meta };
    for (const s of live) obj[s.key] = s.body;
    return JSON.stringify(obj, null, 2) + '\n';
  }
  if (format === 'xml') {
    return (
      live
        .map((s) => {
          const inner = Array.isArray(s.body) ? s.body.map((b) => `- ${b}`).join('\n') : s.body.trim();
          return `<${s.key}>\n${inner}\n</${s.key}>`;
        })
        .join('\n\n') + '\n'
    );
  }
  return (
    live
      .map((s) => {
        const inner = Array.isArray(s.body) ? s.body.map((b) => `- ${b}`).join('\n') : s.body.trim();
        return `## ${s.title}\n${inner}`;
      })
      .join('\n\n') + '\n'
  );
}

type Refine = {
  role: string;
  context: string;
  constraints: string;
  outputNote: string;
  audience: string;
  tone: string;
  length: string;
  techniques: string[];
  // coding
  task: string;
  stack: string;
  // image / video
  style: string;
  lighting: string;
  framing: string;
  camera: string;
  ratio: string;
  duration: string;
  negative: string;
  target: string;
};

const EMPTY_REFINE: Refine = {
  role: '', context: '', constraints: '', outputNote: '', audience: '', tone: '', length: '', techniques: [],
  task: '', stack: '', style: '', lighting: '', framing: '', camera: '', ratio: '', duration: '', negative: '', target: '',
};

const STORE_KEY = 'debugtools-prompt-generator-v2';

export default function PromptGeneratorPage() {
  const [mode, setMode] = useState<Mode>('general');
  const [format, setFormat] = useState<OutputFormat>('text');
  const [copied, setCopied] = useState('');
  const [texts, setTexts] = useState<Record<Mode, string>>({ general: '', coding: '', image: '', video: '' });
  const [refine, setRefine] = useState<Record<Mode, Refine>>({
    general: EMPTY_REFINE, coding: EMPTY_REFINE, image: EMPTY_REFINE, video: EMPTY_REFINE,
  });
  const [vars, setVars] = useState<Record<string, string>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORE_KEY);
      if (raw) {
        const s = JSON.parse(raw);
        if (s.mode) setMode(s.mode);
        if (s.format) setFormat(s.format);
        if (s.texts) setTexts((p) => ({ ...p, ...s.texts }));
        if (s.refine) setRefine((p) => ({ ...p, ...s.refine }));
        if (s.vars) setVars(s.vars);
      }
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(STORE_KEY, JSON.stringify({ mode, format, texts, refine, vars }));
    } catch {
      /* ignore */
    }
  }, [loaded, mode, format, texts, refine, vars]);

  const text = texts[mode];
  const r = refine[mode];
  const setText = (v: string) => setTexts((p) => ({ ...p, [mode]: v }));
  const setR = (patch: Partial<Refine>) => setRefine((p) => ({ ...p, [mode]: { ...p[mode], ...patch } }));

  // Inference (what Auto picks)
  const auto = useMemo(() => {
    const task = inferCodingTask(texts.coding);
    return {
      tone: pick(texts.general, GENERAL_TONE_HINTS),
      audience: (() => {
        const m = texts.general.match(AUDIENCE_HINT);
        return m ? m[1] : null;
      })(),
      task,
      stack: inferStack(texts.coding),
      assistant: pick(texts.coding, ASSISTANT_HINTS),
      imgStyle: pick(texts.image, IMAGE_STYLE_HINTS) ?? 'Photorealistic',
      imgRatio: inferRatio(texts.image, '1:1'),
      vidStyle: pick(texts.video, VIDEO_STYLE_HINTS) ?? 'Cinematic',
      vidCamera: pick(texts.video, CAMERA_HINTS) ?? 'Slow push-in',
      vidRatio: inferRatio(texts.video, '16:9'),
    };
  }, [texts]);

  const variableNames = useMemo(
    () => findVars(text, r.role, r.context, r.constraints, r.outputNote),
    [text, r.role, r.context, r.constraints, r.outputNote],
  );

  const built = useMemo(() => {
    const f = (s: string) => fillVars(s, vars);
    const goal = f(text).trim();
    const techLines = TECHNIQUES.filter((t) => r.techniques.includes(t.id)).map((t) => t.line);
    const sections: Section[] = [];
    const meta: Record<string, unknown> = { mode };
    let plainOverride: string | null = null;

    if (mode === 'general') {
      const tone = r.tone || auto.tone || '';
      const audience = r.audience || auto.audience || '';
      sections.push({ key: 'role', title: 'Role', body: r.role ? `You are ${f(r.role).trim().replace(/^you are\s+/i, '')}.` : '' });
      sections.push({ key: 'task', title: 'Task', body: goal || '[describe what you need]' });
      sections.push({ key: 'context', title: 'Context', body: f(r.context) });
      const aud = [audience && `Audience: ${audience}`, tone && `Tone: ${tone.toLowerCase()}`, r.length && `Length: ${r.length.toLowerCase()}`].filter(Boolean) as string[];
      sections.push({ key: 'audience_and_tone', title: 'Audience and tone', body: aud });
      sections.push({ key: 'instructions', title: 'Instructions', body: [...GENERAL_INSTRUCTIONS.filter((i) => tone || audience || !i.startsWith('Match')), ...techLines] });
      sections.push({ key: 'constraints', title: 'Constraints', body: f(r.constraints).split('\n').map((l) => l.trim()).filter(Boolean) });
      sections.push({ key: 'output_format', title: 'Output format', body: f(r.outputNote) });
    } else if (mode === 'coding') {
      const task = TASK_TYPES.find((t) => t.id === r.task) ?? auto.task;
      const stack = r.stack.trim() ? r.stack.trim() : auto.stack.join(' / ');
      meta.task_type = task.id;
      sections.push({ key: 'role', title: 'Role', body: r.role ? `You are ${f(r.role).trim().replace(/^you are\s+/i, '')}.` : 'You are a senior software engineer.' });
      sections.push({ key: 'task', title: `Task: ${task.label}`, body: goal || '[describe what you want to build, fix, or understand]' });
      const env = [auto.assistant && `Assistant: ${auto.assistant}`, stack && `Stack: ${stack}`].filter(Boolean) as string[];
      sections.push({ key: 'environment', title: 'Environment', body: env });
      sections.push({ key: 'context', title: 'Context', body: f(r.context) });
      sections.push({ key: 'instructions', title: 'Instructions', body: [...task.instructions, ...techLines] });
      sections.push({ key: 'constraints', title: 'Constraints', body: f(r.constraints).split('\n').map((l) => l.trim()).filter(Boolean) });
      sections.push({ key: 'output_format', title: 'Output format', body: [...task.outputFormat, ...(r.outputNote ? [f(r.outputNote)] : [])] });
    } else if (mode === 'image') {
      const style = r.style || auto.imgStyle;
      const ratio = r.ratio || auto.imgRatio;
      const neg = r.negative.trim() || IMAGE_NEGATIVE;
      const subject = goal || '[describe your image]';
      const bits = [r.lighting, r.framing && `${r.framing.toLowerCase()}`].filter(Boolean) as string[];
      meta.style = style;
      meta.aspect_ratio = ratio;
      meta.negative_prompt = neg;
      if (r.target === 'Midjourney') {
        plainOverride = `${subject}, ${[style.toLowerCase(), ...bits.map((b) => b.toLowerCase())].join(', ')} --ar ${ratio} --no ${neg.replace(/\.$/, '')}\n`;
      }
      sections.push({ key: 'subject', title: 'Subject', body: subject });
      sections.push({ key: 'style', title: 'Style', body: style });
      sections.push({ key: 'lighting', title: 'Lighting', body: r.lighting });
      sections.push({ key: 'framing', title: 'Framing', body: r.framing });
      sections.push({ key: 'aspect_ratio', title: 'Aspect ratio', body: ratio });
      sections.push({ key: 'avoid', title: 'Avoid', body: neg });
    } else {
      const style = r.style || auto.vidStyle;
      const camera = r.camera || auto.vidCamera;
      const ratio = r.ratio || auto.vidRatio;
      const neg = r.negative.trim() || VIDEO_NEGATIVE;
      meta.style = style;
      meta.camera_motion = camera;
      meta.aspect_ratio = ratio;
      sections.push({ key: 'scene', title: 'Scene', body: goal || '[describe your scene]' });
      sections.push({ key: 'style', title: 'Style', body: style });
      sections.push({ key: 'camera', title: 'Camera', body: camera });
      sections.push({ key: 'lighting', title: 'Lighting', body: r.lighting });
      sections.push({ key: 'duration', title: 'Duration', body: r.duration });
      sections.push({ key: 'aspect_ratio', title: 'Aspect ratio', body: ratio });
      sections.push({ key: 'avoid', title: 'Avoid', body: neg });
    }

    let out: string;
    if (mode === 'image' && format === 'text') {
      out = plainOverride ?? (() => {
        const style = r.style || auto.imgStyle;
        const ratio = r.ratio || auto.imgRatio;
        const neg = r.negative.trim() || IMAGE_NEGATIVE;
        const extra = [r.lighting, r.framing].filter(Boolean).join(', ');
        return `${style} image of ${goal || '[describe your image]'}${extra ? `, ${extra.toLowerCase()}` : ''}.\nAspect ratio: ${ratio}.\nAvoid: ${neg}.\n`;
      })();
    } else if (mode === 'video' && format === 'text') {
      const style = r.style || auto.vidStyle;
      const camera = r.camera || auto.vidCamera;
      const ratio = r.ratio || auto.vidRatio;
      const neg = r.negative.trim() || VIDEO_NEGATIVE;
      out = `${style} video of ${goal || '[describe your scene]'}${r.lighting ? `, ${r.lighting.toLowerCase()}` : ''}.\nCamera: ${camera.toLowerCase()}. Aspect ratio: ${ratio}.${r.duration ? ` Duration: ${r.duration}.` : ''}\nAvoid: ${neg}.\n`;
    } else {
      out = renderSections(sections, format, meta);
    }
    return out;
  }, [mode, format, text, vars, r, auto]);

  // Quality hints
  const quality = useMemo(() => {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const items: { ok: boolean; label: string }[] = [];
    if (mode === 'general' || mode === 'coding') {
      items.push({ ok: words >= 8, label: 'a specific goal' });
      items.push({ ok: !!r.context.trim() || words >= 30, label: 'context' });
      items.push({ ok: !!r.constraints.trim(), label: 'constraints' });
      items.push({ ok: !!r.outputNote.trim() || !!r.length, label: 'output format' });
    } else {
      items.push({ ok: words >= 6, label: 'a concrete subject' });
      items.push({ ok: !!r.style || !!pick(text, mode === 'image' ? IMAGE_STYLE_HINTS : VIDEO_STYLE_HINTS), label: 'a style' });
      items.push({ ok: !!r.lighting, label: 'lighting' });
      items.push({ ok: mode === 'image' ? !!r.framing : !!r.camera || !!pick(text, CAMERA_HINTS), label: mode === 'image' ? 'framing' : 'camera' });
    }
    return { have: items.filter((i) => i.ok).length, total: items.length, missing: items.filter((i) => !i.ok).map((i) => i.label) };
  }, [mode, text, r]);

  const tokens = Math.ceil(built.length / 4);

  const copyOutput = async () => {
    await navigator.clipboard.writeText(built);
    setCopied('out');
    window.setTimeout(() => setCopied(''), 1500);
  };
  const download = () => {
    const ext = format === 'json' ? 'json' : format === 'xml' ? 'xml' : 'md';
    const blob = new Blob([built], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `prompt-${mode}.${ext}`;
    a.click();
    URL.revokeObjectURL(a.href);
  };
  const reset = () => {
    setTexts((p) => ({ ...p, [mode]: '' }));
    setRefine((p) => ({ ...p, [mode]: EMPTY_REFINE }));
    setVars({});
  };
  const useTemplate = (t: Template) => {
    setText(t.text);
    setR({ role: t.role ?? r.role });
    setVars({});
  };
  const toggleTech = (id: string) =>
    setR({ techniques: r.techniques.includes(id) ? r.techniques.filter((x) => x !== id) : [...r.techniques, id] });

  const inputClass =
    'w-full rounded-md border border-[#d0d7de] bg-white px-3 py-2 text-sm text-[#24292f] focus:border-[#0969da] focus:outline-none focus:ring-2 focus:ring-[#0969da]/20';
  const labelClass = 'mb-1 block text-sm font-medium text-[#57606a]';
  const hintClass = 'mt-1.5 text-xs text-[#8c959f]';
  const placeholders: Record<Mode, { label: string; text: string }> = {
    general: { label: 'What do you need?', text: 'A persuasive launch announcement for our new API aimed at developers, a friendly study plan for my physics final, technical docs for the billing module - say it in your own words. Use {{variables}} for parts you want to fill in later.' },
    coding: { label: 'What do you want?', text: 'Fix the flaky login test in our Next.js app, refactor the Python billing module, review this React hook for codex - describe it and the task type and stack get picked up.' },
    image: { label: 'Describe the image', text: 'A cinematic lighthouse on a cliff at golden hour, vertical for a story. A watercolor fox in a winter forest. A flat minimal logo for a coffee brand.' },
    video: { label: 'Describe the video', text: 'A drone shot over a rainy neon city at night, anime style, for tiktok. A slow push-in on a candle in a dark library, cinematic.' },
  };

  const Select = ({ label, value, onChange, options, autoLabel }: { label: string; value: string; onChange: (v: string) => void; options: string[]; autoLabel?: string }) => (
    <div>
      <label className={labelClass}>{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={inputClass}>
        <option value="">{autoLabel ?? 'Auto'}</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );

  const inferredLine =
    mode === 'general'
      ? [auto.tone, auto.audience].filter(Boolean).join(' · ')
      : mode === 'coding'
      ? [auto.task.label, ...auto.stack, auto.assistant].filter(Boolean).join(' · ')
      : mode === 'image'
      ? [auto.imgStyle, auto.imgRatio].join(' · ')
      : [auto.vidStyle, auto.vidCamera, auto.vidRatio].join(' · ');

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="space-y-1">
        <div className="flex items-center gap-3">
          <SparklesIcon className="h-6 w-6 text-[#0969da]" />
          <h1 className="text-2xl font-semibold text-[#24292f]">Prompt Generator</h1>
        </div>
        <p className="text-sm text-[#57606a]">
          Write what you need in plain words. Add details if you want more control. Everything stays in your browser.
        </p>
      </section>

      <div className="flex gap-5 border-b border-[#eaeef2]">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setMode(m.id)}
            className={`-mb-px border-b-2 pb-2 text-sm transition-colors ${
              m.id === mode ? 'border-[#0969da] font-medium text-[#24292f]' : 'border-transparent text-[#57606a] hover:text-[#24292f]'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="space-y-5">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#57606a]">
              <span>Start from</span>
              {TEMPLATES[mode].map((t) => (
                <button key={t.label} type="button" onClick={() => useTemplate(t)} className="text-[#0969da] hover:underline">
                  {t.label}
                </button>
              ))}
            </div>
            <label htmlFor="pg-text" className={labelClass}>{placeholders[mode].label}</label>
            <textarea
              id="pg-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={7}
              placeholder={placeholders[mode].text}
              className={`${inputClass} ${mode === 'coding' ? 'font-mono text-[13px] leading-relaxed' : ''}`}
            />
            {text.trim() && inferredLine && <p className={hintClass}>Picked up: {inferredLine}</p>}
          </div>

          {variableNames.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-[#57606a]">Fill in your variables</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {variableNames.map((name) => (
                  <input
                    key={name}
                    value={vars[name] ?? ''}
                    onChange={(e) => setVars((p) => ({ ...p, [name]: e.target.value }))}
                    placeholder={name.replace(/_/g, ' ')}
                    aria-label={name}
                    className={inputClass}
                  />
                ))}
              </div>
              <p className={hintClass}>Empty ones stay as {'{{name}}'} in the output.</p>
            </div>
          )}

          <details className="group">
            <summary className="cursor-pointer text-sm font-medium text-[#0969da] hover:underline">Refine the prompt</summary>
            <div className="mt-4 space-y-4">
              {(mode === 'general' || mode === 'coding') && (
                <div>
                  <label className={labelClass}>Role</label>
                  <input
                    value={r.role}
                    onChange={(e) => setR({ role: e.target.value })}
                    placeholder={mode === 'coding' ? 'a senior software engineer (default)' : 'an experienced copy editor'}
                    className={inputClass}
                  />
                </div>
              )}

              {mode === 'general' && (
                <div className="grid gap-3 sm:grid-cols-3">
                  <div>
                    <label className={labelClass}>Audience</label>
                    <input value={r.audience} onChange={(e) => setR({ audience: e.target.value })} placeholder={auto.audience ?? 'Auto'} className={inputClass} />
                  </div>
                  <Select label="Tone" value={r.tone} onChange={(v) => setR({ tone: v })} options={TONES} autoLabel={auto.tone ?? 'Auto'} />
                  <Select label="Length" value={r.length} onChange={(v) => setR({ length: v })} options={LENGTHS} autoLabel="Any" />
                </div>
              )}

              {mode === 'coding' && (
                <div className="grid gap-3 sm:grid-cols-2">
                  <Select label="Task type" value={r.task} onChange={(v) => setR({ task: v })} options={TASK_TYPES.map((t) => t.id)} autoLabel={`Auto (${auto.task.label})`} />
                  <div>
                    <label className={labelClass}>Stack</label>
                    <input value={r.stack} onChange={(e) => setR({ stack: e.target.value })} placeholder={auto.stack.join(' / ') || 'Auto'} className={inputClass} />
                  </div>
                </div>
              )}

              {mode === 'image' && (
                <div className="grid gap-3 sm:grid-cols-2">
                  <Select label="Style" value={r.style} onChange={(v) => setR({ style: v })} options={IMAGE_STYLES} autoLabel={`Auto (${auto.imgStyle})`} />
                  <Select label="Aspect ratio" value={r.ratio} onChange={(v) => setR({ ratio: v })} options={RATIOS} autoLabel={`Auto (${auto.imgRatio})`} />
                  <Select label="Lighting" value={r.lighting} onChange={(v) => setR({ lighting: v })} options={LIGHTING} autoLabel="None" />
                  <Select label="Framing" value={r.framing} onChange={(v) => setR({ framing: v })} options={FRAMING} autoLabel="None" />
                  <Select label="Write it for" value={r.target} onChange={(v) => setR({ target: v })} options={IMAGE_TARGETS} autoLabel="Any tool" />
                </div>
              )}

              {mode === 'video' && (
                <div className="grid gap-3 sm:grid-cols-2">
                  <Select label="Style" value={r.style} onChange={(v) => setR({ style: v })} options={VIDEO_STYLES} autoLabel={`Auto (${auto.vidStyle})`} />
                  <Select label="Camera" value={r.camera} onChange={(v) => setR({ camera: v })} options={CAMERAS} autoLabel={`Auto (${auto.vidCamera})`} />
                  <Select label="Aspect ratio" value={r.ratio} onChange={(v) => setR({ ratio: v })} options={RATIOS} autoLabel={`Auto (${auto.vidRatio})`} />
                  <Select label="Lighting" value={r.lighting} onChange={(v) => setR({ lighting: v })} options={LIGHTING} autoLabel="None" />
                  <div>
                    <label className={labelClass}>Duration</label>
                    <input value={r.duration} onChange={(e) => setR({ duration: e.target.value })} placeholder="8 seconds" className={inputClass} />
                  </div>
                </div>
              )}

              {(mode === 'image' || mode === 'video') && (
                <div>
                  <label className={labelClass}>Avoid</label>
                  <input value={r.negative} onChange={(e) => setR({ negative: e.target.value })} placeholder={mode === 'image' ? IMAGE_NEGATIVE : VIDEO_NEGATIVE} className={inputClass} />
                </div>
              )}

              {(mode === 'general' || mode === 'coding') && (
                <>
                  <div>
                    <label className={labelClass}>Context</label>
                    <textarea value={r.context} onChange={(e) => setR({ context: e.target.value })} rows={3} placeholder="Background the model should know: who it is for, what exists already, what you tried." className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Constraints</label>
                    <textarea value={r.constraints} onChange={(e) => setR({ constraints: e.target.value })} rows={3} placeholder={'One per line, e.g.\nNo new dependencies\nMax 200 words'} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Output format</label>
                    <input value={r.outputNote} onChange={(e) => setR({ outputNote: e.target.value })} placeholder="A table, then a one-line recommendation" className={inputClass} />
                  </div>
                  <div>
                    <p className={labelClass}>Behavior</p>
                    <div className="flex flex-wrap gap-2">
                      {TECHNIQUES.map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => toggleTech(t.id)}
                          aria-pressed={r.techniques.includes(t.id)}
                          className={`rounded-full px-3 py-1 text-xs transition-colors ${
                            r.techniques.includes(t.id) ? 'bg-[#24292f] text-white' : 'bg-[#f6f8fa] text-[#57606a] hover:text-[#24292f]'
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </details>

          <div className="flex items-center justify-between text-xs text-[#8c959f]">
            <span>
              {quality.have === quality.total
                ? 'Covers goal, detail and format.'
                : `Could add: ${quality.missing.join(', ')}.`}
            </span>
            <button type="button" onClick={reset} className="hover:text-[#24292f]">Clear</button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex rounded-md bg-[#f6f8fa] p-0.5">
              {FORMATS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFormat(f.id)}
                  className={`rounded px-3 py-1 text-sm ${
                    format === f.id ? 'bg-[#24292f] font-medium text-white' : 'text-[#57606a] hover:text-[#24292f]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={download} className="rounded-md px-2 py-1 text-xs font-semibold text-[#57606a] hover:bg-[#f6f8fa]">
                Download
              </button>
              <button
                type="button"
                onClick={copyOutput}
                className="inline-flex items-center gap-1 rounded-md bg-[#f6f8fa] px-2.5 py-1 text-xs font-semibold text-[#24292f] hover:bg-[#eaeef2]"
              >
                <ClipboardIcon className="h-4 w-4" />
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
          <pre className="min-h-[380px] whitespace-pre-wrap break-words rounded-md bg-[#f6f8fa] p-4 font-mono text-[13px] leading-relaxed text-[#24292f]">
            {built}
          </pre>
          <p className="text-xs text-[#8c959f]">About {tokens} tokens · {built.length} characters</p>
        </div>
      </div>
    </div>
  );
}
