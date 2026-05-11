export function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export function generateUuidBatch(count: number): string[] {
  const safeCount = Math.max(1, Math.min(count, 500));
  return Array.from({ length: safeCount }, generateUuid);
}

function generateUuid(): string {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  const bytes = new Uint8Array(16);
  if (globalThis.crypto?.getRandomValues) {
    globalThis.crypto.getRandomValues(bytes);
  } else {
    for (let index = 0; index < bytes.length; index += 1) {
      bytes[index] = Math.floor(Math.random() * 256);
    }
  }

  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = bytesToHex(bytes);
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export function formatTimestamp(value: string) {
  const trimmed = value.trim();
  const date = /^\d+$/.test(trimmed)
    ? new Date(trimmed.length <= 10 ? Number(trimmed) * 1000 : Number(trimmed))
    : new Date(trimmed);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return {
    unixSeconds: Math.floor(date.getTime() / 1000),
    unixMilliseconds: date.getTime(),
    iso: date.toISOString(),
    utc: date.toUTCString(),
    local: date.toLocaleString(),
  };
}
