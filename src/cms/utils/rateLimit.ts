import type { PayloadRequest } from 'payload';

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

// In-memory, per app process: fine for a single container. Resets on restart.
const hits = new Map<string, number[]>();

// nginx sets X-Real-IP to the real client address. X-Forwarded-For is only a
// fallback, and we take its *last* entry: nginx appends the real address to
// whatever the client sent, so the first entries can be spoofed.
const clientIp = (req: PayloadRequest) =>
  req.headers.get('x-real-ip') ||
  req.headers.get('x-forwarded-for')?.split(',').pop()?.trim() ||
  'unknown';

/** Returns false once an IP made more than MAX_PER_WINDOW requests. */
export const checkRateLimit = (req: PayloadRequest) => {
  const now = Date.now();
  const ip = clientIp(req);
  const recent = (hits.get(ip) ?? []).filter(t => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return false;
  }
  recent.push(now);
  hits.set(ip, recent);

  // Keep the map from growing forever.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (!times.some(t => now - t < WINDOW_MS)) hits.delete(key);
    }
  }
  return true;
};
