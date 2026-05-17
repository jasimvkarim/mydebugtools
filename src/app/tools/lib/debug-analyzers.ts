export type StackFrame = {
  raw: string;
  functionName: string;
  file: string;
  line?: number;
  column?: number;
  isDependency: boolean;
};

export type LogEntry = {
  timestamp?: string;
  severity: 'ERROR' | 'WARN' | 'INFO' | 'DEBUG' | 'TRACE' | 'UNKNOWN';
  traceId?: string;
  message: string;
  details: string[];
};

type HarLikeEntry = {
  request?: {
    method?: unknown;
    url?: unknown;
  };
  response?: {
    status?: unknown;
    bodySize?: unknown;
  };
  time?: unknown;
  timings?: {
    wait?: unknown;
  };
  _transferSize?: unknown;
};

type HarRequestSummary = {
  method: string;
  url: string;
  status: number;
  time: number;
  wait: number;
  transferSize: number;
  group: string;
};

const severityPattern = /\b(ERROR|ERR|WARN|WARNING|INFO|DEBUG|TRACE|FATAL)\b/i;
const tracePattern = /\b(?:trace[_-]?id|request[_-]?id|correlation[_-]?id|rid)[:=]\s*["']?([a-z0-9._:-]+)["']?/i;
const timestampPattern = /^(\[?\d{4}-\d{2}-\d{2}[T\s]\d{2}:\d{2}:\d{2}(?:\.\d+)?Z?\]?)/;

function normalizeSeverity(value: string | undefined): LogEntry['severity'] {
  const normalized = value?.toUpperCase();
  if (normalized === 'ERR' || normalized === 'FATAL') return 'ERROR';
  if (normalized === 'WARNING') return 'WARN';
  if (normalized === 'ERROR' || normalized === 'WARN' || normalized === 'INFO' || normalized === 'DEBUG' || normalized === 'TRACE') {
    return normalized;
  }
  return 'UNKNOWN';
}

function parseStackFrame(line: string): StackFrame | null {
  const trimmed = line.trim();
  const jsFrame = trimmed.match(/^at\s+(?:(.*?)\s+\()?(.+?):(\d+):(\d+)\)?$/);
  if (jsFrame) {
    const [, functionName = '<anonymous>', file, lineNumber, columnNumber] = jsFrame;
    return {
      raw: trimmed,
      functionName,
      file,
      line: Number(lineNumber),
      column: Number(columnNumber),
      isDependency: /node_modules|\/vendor\/|webpack|next\/dist/i.test(file),
    };
  }

  const pythonFrame = trimmed.match(/^File\s+"(.+?)",\s+line\s+(\d+),\s+in\s+(.+)$/);
  if (pythonFrame) {
    const [, file, lineNumber, functionName] = pythonFrame;
    return {
      raw: trimmed,
      functionName,
      file,
      line: Number(lineNumber),
      isDependency: /site-packages|dist-packages|\/lib\/python/i.test(file),
    };
  }

  const javaFrame = trimmed.match(/^at\s+(.+)\((.+?):(\d+)\)$/);
  if (javaFrame) {
    const [, functionName, file, lineNumber] = javaFrame;
    return {
      raw: trimmed,
      functionName,
      file,
      line: Number(lineNumber),
      isDependency: /java\.|javax\.|kotlin\.|android\.|org\.springframework/i.test(functionName),
    };
  }

  return null;
}

function splitErrorBlocks(input: string) {
  return input
    .split(/\n\s*\n+/)
    .map((block) => block.trim())
    .filter(Boolean);
}

export function analyzeStackTrace(input: string) {
  const lines = input.split(/\r?\n/).map((line) => line.trimEnd()).filter(Boolean);
  const firstLine = lines[0] || '';
  const errorMatch = firstLine.match(/^([A-Za-z_$][\w.$]*(?:Error|Exception|Failure)?):?\s*(.*)$/);
  const frames = lines.map(parseStackFrame).filter((frame): frame is StackFrame => Boolean(frame));
  const appFrames = frames.filter((frame) => !frame.isDependency);
  const dependencyFrames = frames.filter((frame) => frame.isDependency);
  const rootFrame = appFrames[0] || frames[0] || null;
  const message = errorMatch?.[2] || firstLine;
  const lowerMessage = message.toLowerCase();
  let likelyCause = 'Start with the first application frame and inspect the values passed into that call.';

  if (/undefined|null|nil|none/.test(lowerMessage)) {
    likelyCause = 'A value is undefined or null before property access or method call. Check guards, API response shape, and optional fields near the first app frame.';
  } else if (/timeout|timed out|deadline/.test(lowerMessage)) {
    likelyCause = 'A downstream operation exceeded its time budget. Check network calls, retries, and slow dependencies around the root frame.';
  } else if (/permission|unauthorized|forbidden|denied/.test(lowerMessage)) {
    likelyCause = 'The failing path likely lacks credentials, permissions, or a required auth scope.';
  } else if (/syntax|parse|json/.test(lowerMessage)) {
    likelyCause = 'Input parsing failed. Inspect the payload before this frame and confirm the expected data format.';
  }

  return {
    errorType: errorMatch?.[1] || 'UnknownError',
    message,
    frames,
    appFrames,
    dependencyFrames,
    rootFrame,
    likelyCause,
  };
}

export function analyzeLogs(input: string) {
  const entries: LogEntry[] = [];

  input.split(/\r?\n/).forEach((line) => {
    if (!line.trim()) return;

    const severity = normalizeSeverity(line.match(severityPattern)?.[1]);
    const startsEntry = Boolean(line.match(timestampPattern) || line.match(severityPattern) || line.match(tracePattern));

    if (!startsEntry && entries.length > 0) {
      entries[entries.length - 1].details.push(line);
      return;
    }

    entries.push({
      timestamp: line.match(timestampPattern)?.[1]?.replace(/^\[|\]$/g, ''),
      severity,
      traceId: line.match(tracePattern)?.[1],
      message: line.trim(),
      details: [],
    });
  });

  const severityCounts = entries.reduce<Record<string, number>>((counts, entry) => {
    counts[entry.severity] = (counts[entry.severity] || 0) + 1;
    return counts;
  }, {});

  const traces = Array.from(
    entries.reduce<Map<string, LogEntry[]>>((groups, entry) => {
      if (!entry.traceId) return groups;
      groups.set(entry.traceId, [...(groups.get(entry.traceId) || []), entry]);
      return groups;
    }, new Map()),
  ).map(([id, groupedEntries]) => ({
    id,
    entries: groupedEntries,
    hasError: groupedEntries.some((entry) => entry.severity === 'ERROR'),
  }));

  return {
    entries,
    severityCounts,
    traces,
    topTrace: traces.sort((a, b) => b.entries.length - a.entries.length)[0] || null,
  };
}

function statusGroup(status: number) {
  if (status >= 500) return '5xx';
  if (status >= 400) return '4xx';
  if (status >= 300) return '3xx';
  if (status >= 200) return '2xx';
  return 'other';
}

export function analyzeHar(input: string) {
  const parsed = JSON.parse(input);
  const rawEntries: HarLikeEntry[] = Array.isArray(parsed?.log?.entries)
    ? parsed.log.entries
    : Array.isArray(parsed?.entries)
      ? parsed.entries
      : [];
  const requests: HarRequestSummary[] = rawEntries.map((entry) => {
    const status = Number(entry?.response?.status || 0);
    return {
      method: String(entry?.request?.method || 'GET'),
      url: String(entry?.request?.url || ''),
      status,
      time: Number(entry?.time || 0),
      wait: Number(entry?.timings?.wait || 0),
      transferSize: Number(entry?._transferSize || entry?.response?.bodySize || 0),
      group: statusGroup(status),
    };
  });

  const statusGroups = requests.reduce<Record<string, number>>((groups, request) => {
    groups[request.group] = (groups[request.group] || 0) + 1;
    return groups;
  }, {});

  return {
    totalRequests: requests.length,
    totalTransferSize: requests.reduce((sum, request) => sum + request.transferSize, 0),
    redirects: requests.filter((request) => request.status >= 300 && request.status < 400).length,
    failures: requests.filter((request) => request.status >= 400).length,
    statusGroups,
    slowest: [...requests].sort((a, b) => b.time - a.time).slice(0, 5),
    requests,
  };
}

export function analyzeErrors(input: string) {
  const issues = splitErrorBlocks(input).reduce<Array<{
    fingerprint: string;
    title: string;
    count: number;
    firstSeen: string;
    sample: ReturnType<typeof analyzeStackTrace>;
  }>>((acc, block) => {
    const sample = analyzeStackTrace(block);
    const root = sample.rootFrame;
    const fingerprint = [sample.errorType, sample.message.replace(/\d+/g, '#'), root?.functionName, root?.file].filter(Boolean).join('|');
    const existing = acc.find((issue) => issue.fingerprint === fingerprint);

    if (existing) {
      existing.count += 1;
      return acc;
    }

    acc.push({
      fingerprint,
      title: `${sample.errorType}: ${sample.message || 'Unknown error'}`,
      count: 1,
      firstSeen: block,
      sample,
    });
    return acc;
  }, []);

  issues.sort((a, b) => b.count - a.count);

  return {
    issues,
    summary: {
      totalErrors: issues.reduce((sum, issue) => sum + issue.count, 0),
      uniqueIssues: issues.length,
      repeatedIssues: issues.filter((issue) => issue.count > 1).length,
    },
  };
}
