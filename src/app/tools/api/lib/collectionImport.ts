type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';
type ContentType = 'application/json' | 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain' | 'application/xml' | 'text/xml';
type AuthType = 'none' | 'basic' | 'bearer' | 'apiKey';

interface Header {
  key: string;
  value: string;
  enabled: boolean;
}

interface AuthConfig {
  type: AuthType;
  username?: string;
  password?: string;
  token?: string;
  apiKey?: string;
  apiKeyLocation?: 'header' | 'query';
  apiKeyName?: string;
}

export interface ImportedRequest {
  name: string;
  method: HttpMethod;
  url: string;
  headers: Header[];
  body: string;
  contentType: ContentType;
  authConfig: AuthConfig;
  description: string;
}

export interface ImportedCollection {
  name: string;
  description: string;
  color?: string;
  requests: ImportedRequest[];
}

const METHODS: HttpMethod[] = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];
const CONTENT_TYPES: ContentType[] = [
  'application/json',
  'application/x-www-form-urlencoded',
  'multipart/form-data',
  'text/plain',
  'application/xml',
  'text/xml',
];

function isObject(value: unknown): value is Record<string, any> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function fallbackNameFromFile(fileName?: string) {
  const cleanName = fileName?.replace(/\.[^.]+$/, '').trim();
  return cleanName || 'Imported Collection';
}

function normalizeMethod(method: unknown): HttpMethod {
  const upper = String(method || 'GET').toUpperCase();
  return METHODS.includes(upper as HttpMethod) ? upper as HttpMethod : 'GET';
}

function normalizeContentType(value: unknown): ContentType {
  const contentType = String(value || '').split(';')[0].trim().toLowerCase();
  return CONTENT_TYPES.includes(contentType as ContentType) ? contentType as ContentType : 'application/json';
}

function normalizeHeaders(headers: unknown): Header[] {
  if (!Array.isArray(headers)) return [];

  return headers
    .filter((header) => isObject(header) && typeof header.key === 'string' && header.key.trim())
    .map((header) => ({
      key: header.key.trim(),
      value: String(header.value ?? ''),
      enabled: header.enabled !== false && header.disabled !== true,
    }));
}

function contentTypeFromHeaders(headers: Header[], fallback?: unknown): ContentType {
  const header = headers.find((item) => item.enabled && item.key.toLowerCase() === 'content-type');
  return normalizeContentType(header?.value || fallback);
}

function normalizeAuthConfig(value: unknown): AuthConfig {
  if (!isObject(value)) return { type: 'none' };

  const type = value.type as AuthType;
  if (type === 'basic') {
    return {
      type,
      username: String(value.username ?? ''),
      password: String(value.password ?? ''),
    };
  }

  if (type === 'bearer') {
    return {
      type,
      token: String(value.token ?? ''),
    };
  }

  if (type === 'apiKey') {
    return {
      type,
      apiKey: String(value.apiKey ?? ''),
      apiKeyLocation: value.apiKeyLocation === 'query' ? 'query' : 'header',
      apiKeyName: String(value.apiKeyName ?? ''),
    };
  }

  return { type: 'none' };
}

function normalizeNativeRequest(request: unknown, index: number): ImportedRequest | null {
  if (!isObject(request)) return null;

  const headers = normalizeHeaders(request.headers);
  const url = String(request.url ?? '').trim();

  if (!url) return null;

  return {
    name: String(request.name || `Request ${index + 1}`),
    method: normalizeMethod(request.method),
    url,
    headers,
    body: String(request.body ?? ''),
    contentType: contentTypeFromHeaders(headers, request.contentType),
    authConfig: normalizeAuthConfig(request.authConfig),
    description: String(request.description ?? ''),
  };
}

function postmanDescription(value: unknown): string {
  if (typeof value === 'string') return value;
  if (isObject(value) && typeof value.content === 'string') return value.content;
  return '';
}

function postmanUrl(value: unknown): string {
  if (typeof value === 'string') return value;
  if (!isObject(value)) return '';
  if (typeof value.raw === 'string' && value.raw.trim()) return value.raw;

  const protocol = typeof value.protocol === 'string' ? `${value.protocol}://` : '';
  const host = Array.isArray(value.host) ? value.host.join('.') : String(value.host ?? '');
  const path = Array.isArray(value.path) ? `/${value.path.join('/')}` : value.path ? `/${value.path}` : '';
  const query = Array.isArray(value.query)
    ? value.query
        .filter((item) => isObject(item) && item.disabled !== true && typeof item.key === 'string')
        .map((item) => `${encodeURIComponent(item.key)}=${encodeURIComponent(String(item.value ?? ''))}`)
        .join('&')
    : '';

  const builtUrl = `${protocol}${host}${path}`;
  return query ? `${builtUrl}?${query}` : builtUrl;
}

function postmanBody(value: unknown): { body: string; contentType: ContentType } {
  if (!isObject(value)) return { body: '', contentType: 'application/json' };

  if (value.mode === 'raw') {
    return {
      body: String(value.raw ?? ''),
      contentType: normalizeContentType(value.options?.raw?.language === 'json' ? 'application/json' : value.options?.raw?.language),
    };
  }

  if (value.mode === 'urlencoded' && Array.isArray(value.urlencoded)) {
    return {
      body: value.urlencoded
        .filter((item) => isObject(item) && item.disabled !== true && typeof item.key === 'string')
        .map((item) => `${encodeURIComponent(item.key)}=${encodeURIComponent(String(item.value ?? ''))}`)
        .join('&'),
      contentType: 'application/x-www-form-urlencoded',
    };
  }

  if (value.mode === 'formdata' && Array.isArray(value.formdata)) {
    return {
      body: value.formdata
        .filter((item) => isObject(item) && item.disabled !== true && typeof item.key === 'string')
        .map((item) => `${item.key}=${String(item.value ?? '')}`)
        .join('\n'),
      contentType: 'multipart/form-data',
    };
  }

  return { body: '', contentType: 'application/json' };
}

function postmanAuth(value: unknown): AuthConfig {
  if (!isObject(value)) return { type: 'none' };

  if (value.type === 'bearer' && Array.isArray(value.bearer)) {
    const token = value.bearer.find((item: unknown) => isObject(item) && item.key === 'token');
    return { type: 'bearer', token: String(token?.value ?? '') };
  }

  if (value.type === 'basic' && Array.isArray(value.basic)) {
    const username = value.basic.find((item: unknown) => isObject(item) && item.key === 'username');
    const password = value.basic.find((item: unknown) => isObject(item) && item.key === 'password');
    return {
      type: 'basic',
      username: String(username?.value ?? ''),
      password: String(password?.value ?? ''),
    };
  }

  if (value.type === 'apikey' && Array.isArray(value.apikey)) {
    const key = value.apikey.find((item: unknown) => isObject(item) && item.key === 'key');
    const apiValue = value.apikey.find((item: unknown) => isObject(item) && item.key === 'value');
    const inValue = value.apikey.find((item: unknown) => isObject(item) && item.key === 'in');
    return {
      type: 'apiKey',
      apiKeyName: String(key?.value ?? ''),
      apiKey: String(apiValue?.value ?? ''),
      apiKeyLocation: inValue?.value === 'query' ? 'query' : 'header',
    };
  }

  return { type: 'none' };
}

function normalizePostmanRequest(item: Record<string, any>, index: number): ImportedRequest | null {
  if (!isObject(item.request)) return null;

  const headers = normalizeHeaders(item.request.header);
  const body = postmanBody(item.request.body);
  const url = postmanUrl(item.request.url).trim();

  if (!url) return null;

  return {
    name: String(item.name || `Request ${index + 1}`),
    method: normalizeMethod(item.request.method),
    url,
    headers,
    body: body.body,
    contentType: contentTypeFromHeaders(headers, body.contentType),
    authConfig: postmanAuth(item.request.auth),
    description: postmanDescription(item.request.description ?? item.description),
  };
}

function collectPostmanRequests(items: unknown, output: ImportedRequest[]) {
  if (!Array.isArray(items)) return;

  for (const item of items) {
    if (!isObject(item)) continue;

    if (Array.isArray(item.item)) {
      collectPostmanRequests(item.item, output);
      continue;
    }

    const request = normalizePostmanRequest(item, output.length);
    if (request) output.push(request);
  }
}

export function parseImportedCollection(raw: unknown, fileName?: string): ImportedCollection {
  if (!isObject(raw)) {
    throw new Error('Collection import must be a JSON object.');
  }

  const fallbackName = fallbackNameFromFile(fileName);

  if (isObject(raw.info) || Array.isArray(raw.item)) {
    const requests: ImportedRequest[] = [];
    collectPostmanRequests(raw.item, requests);

    return {
      name: String(raw.info?.name || raw.name || fallbackName),
      description: postmanDescription(raw.info?.description || raw.description),
      color: typeof raw.color === 'string' ? raw.color : undefined,
      requests,
    };
  }

  if (typeof raw.name === 'string' || Array.isArray(raw.requests)) {
    const requests = Array.isArray(raw.requests)
      ? raw.requests
          .map((request, index) => normalizeNativeRequest(request, index))
          .filter((request): request is ImportedRequest => request !== null)
      : [];

    return {
      name: raw.name?.trim() || fallbackName,
      description: String(raw.description ?? ''),
      color: typeof raw.color === 'string' ? raw.color : undefined,
      requests,
    };
  }

  throw new Error('Unsupported collection format. Import a MyDebugTools or Postman collection JSON file.');
}
