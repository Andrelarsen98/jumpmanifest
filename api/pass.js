// Public DZ Check-in Pass lookup — server-side proxy. Keeps the Supabase key
// off the page, rate-limits per IP, and caches briefly so the public pass page
// can't be scraped or hammered. Browser -> /api/pass?code= -> Supabase RPC.
//
// Optional Vercel env vars (fall back to the publishable values if unset):
//   SUPABASE_URL, SUPABASE_ANON_KEY

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://wkefdtglgbfprvfajrrw.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || 'sb_publishable_bSZ85fokRcmDjIzYr7Q9mQ_w4dQ0b3b';

// Best-effort in-memory rate limit (per warm instance). For hard cross-instance
// limits, back this with Upstash / Vercel KV later.
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const windowMs = 60_000;
  const max = 40; // 40 lookups / minute / IP
  const arr = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > max;
}

module.exports = async (req, res) => {
  const code = String((req.query && req.query.code) || '').trim().toLowerCase();
  // Only ever accept a well-formed code — blocks junk + probing.
  if (!/^[2-9a-z]{8,16}$/.test(code)) {
    return res.status(400).json({ error: 'Invalid code' });
  }

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (rateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests' });
  }

  try {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/rpc/pass_public`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: 'Bearer ' + SUPABASE_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });
    if (!r.ok) return res.status(502).json({ error: 'Lookup failed' });
    const data = await r.json();
    res.setHeader('Cache-Control', 'public, max-age=30, s-maxage=60');
    return res.status(200).json(data);
  } catch (e) {
    return res.status(502).json({ error: 'Lookup failed' });
  }
};
