// The public page for one jumper: jumpmanifest.com/u/<code>
//
// SERVER-RENDERED like /j/: WhatsApp, iMessage and Instagram's DM fetch the
// URL once with a crawler that runs no JavaScript, so the card's title,
// picture and description are written into the HTML here. What is public is
// what the profile already shows everyone: name, photo, home DZ, jumps.
// A private profile returns nothing. See manifest-app/sql/profile-share-links.sql.

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://wkefdtglgbfprvfajrrw.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || 'sb_publishable_bSZ85fokRcmDjIzYr7Q9mQ_w4dQ0b3b';
const APP_STORE = 'https://apps.apple.com/app/id6778510429';

const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < 60_000);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > 60;
}

const esc = (s) =>
  String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const num = (n) => Number(n || 0).toLocaleString('en-US');

// THE APP'S OWN BADGE, not a glyph: the same 12-point seal and check that
// components/verified-badge.tsx draws, same maths, same two colours.
//   gold  -> verified licence + Pro
//   blue  -> verified licence
function sealPoints(outer = 22, inner = 18) {
  const cx = 24, cy = 24, pts = 12, n = pts * 2, out = [];
  for (let i = 0; i < n; i++) {
    const r = i % 2 ? inner : outer;
    const a = (Math.PI / pts) * i - Math.PI / 2;
    out.push(`${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`);
  }
  return out.join(' ');
}
function badge(pro, size) {
  const color = pro ? '#F5B301' : '#1D9BF0';
  const label = pro ? 'Verified licence, Pro member' : 'Verified licence';
  return `<svg width="${size}" height="${size}" viewBox="0 0 48 48" role="img" aria-label="${label}" style="vertical-align:-3px;margin-left:6px"><polygon points="${sealPoints()}" fill="${color}"/><path d="M16 24.5l5 5 11-12" fill="none" stroke="#FFFFFF" stroke-width="3.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}

function page(p, code) {
  const name = (p.full_name || '').trim() || 'A jumper';
  const first = name.split(/\s+/)[0];
  const title = `${name} on Manifest`;
  const bits = [`${num(p.jumps)} jumps`];
  if (p.home_dz) bits.push(p.home_dz);
  if (p.license_type && p.license_type !== 'none') bits.push(`${p.license_type} licence`);
  const desc = bits.join(' · ');
  const img = p.avatar_url || 'https://jumpmanifest.com/assets/og.jpg';
  const url = `https://www.jumpmanifest.com/u/${code}`;
  const ig = p.instagram ? `https://instagram.com/${encodeURIComponent(p.instagram)}` : null;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}" />
<meta property="og:type" content="profile" />
<meta property="og:site_name" content="Manifest" />
<meta property="og:title" content="${esc(title)}" />
<meta property="og:description" content="${esc(desc)}" />
<meta property="og:image" content="${esc(img)}" />
<meta property="og:url" content="${esc(url)}" />
<meta name="twitter:card" content="summary" />
<meta name="twitter:title" content="${esc(title)}" />
<meta name="twitter:description" content="${esc(desc)}" />
<meta name="twitter:image" content="${esc(img)}" />
<link rel="icon" href="/favicon.ico" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet" />
<style>
  :root { --ink:#0f0b1c; --violet:#7C3AED; --muted:#6f6982; --line:rgba(15,11,28,.08); }
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{overflow-x:clip;max-width:100vw}
  body{font-family:"Plus Jakarta Sans",-apple-system,BlinkMacSystemFont,sans-serif;
       color:var(--ink);background:#fff;-webkit-font-smoothing:antialiased;line-height:1.5}
  a{color:inherit;text-decoration:none}
  .bar{display:flex;align-items:center;gap:11px;max-width:1180px;margin:0 auto;padding:18px 22px}
  .bar img{width:32px;height:32px;border-radius:9px}
  .bar b{font-size:17px;font-weight:800;letter-spacing:-.03em}
  .wrap{max-width:520px;margin:0 auto;padding:18px 22px 60px}
  .card{border:1px solid var(--line);border-radius:22px;padding:36px 30px;text-align:center;
        box-shadow:0 12px 34px rgba(15,11,28,.07);background:#fff}
  .face{width:112px;height:112px;border-radius:50%;object-fit:cover;display:block;margin:0 auto 16px;
        background:#eee;border:4px solid #fff;box-shadow:0 8px 24px rgba(15,11,28,.14)}
  h1{font-size:26px;line-height:1.2;font-weight:800;letter-spacing:-.03em}
  .sub{margin-top:6px;font-size:15px;font-weight:600;color:var(--muted)}
  .stats{display:flex;justify-content:center;gap:28px;margin-top:20px}
  .stats div span{display:block;font-size:10.5px;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#948da6}
  .stats div b{font-size:24px;font-weight:800;letter-spacing:-.02em}
  .ig{display:inline-block;margin-top:14px;font-size:14px;font-weight:700;color:var(--violet)}
  .go{display:block;margin-top:26px;padding:15px 22px;border-radius:14px;background:var(--violet);
      color:#fff;font-weight:800;font-size:15.5px;letter-spacing:-.01em}
  .free{margin-top:12px;font-size:12.5px;font-weight:700;color:#948da6}
  .appbtn{margin-top:18px;display:inline-block}
  .appbtn img{height:52px;width:auto;display:block}
  footer{max-width:1180px;margin:0 auto;padding:0 22px 44px;font-size:12.5px;font-weight:600;color:#948da6}
  footer a{margin-left:14px;text-decoration:underline}
</style>
</head>
<body>
  <div class="bar"><img src="/assets/app-icon.png" alt="" /><b>Manifest</b></div>
  <div class="wrap">
    <div class="card">
      <img class="face" src="${esc(img)}" alt="${esc(name)}" />
      <h1>${esc(name)}${p.verified ? badge(!!p.pro, 24) : ''}</h1>
      ${p.home_dz ? `<div class="sub">${esc(p.home_dz)}</div>` : ''}
      <div class="stats">
        <div><span>Jumps</span><b>${num(p.jumps)}</b></div>
        ${p.license_type && p.license_type !== 'none' ? `<div><span>Licence</span><b>${esc(p.license_type)}</b></div>` : ''}
      </div>
      ${ig ? `<a class="ig" href="${esc(ig)}">@${esc(p.instagram)} on Instagram</a>` : ''}
      <a class="go" href="${APP_STORE}">Follow ${esc(first)} on Manifest</a>
      <p class="free">Free on the App Store. Logbook, live loads and 3D jump replays.</p>
      <a class="appbtn" href="${APP_STORE}"><img src="/assets/appstore-badge.svg?v=1" alt="Download on the App Store" /></a>
    </div>
  </div>
  <footer>jumpmanifest.com<a href="/privacy">Privacy</a><a href="/terms">Terms</a></footer>
</body>
</html>`;
}

function notFound() {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Profile not found | Manifest</title>
<meta name="robots" content="noindex" />
<style>body{font-family:-apple-system,sans-serif;background:#0b0a10;color:#fff;display:grid;
place-items:center;min-height:100vh;text-align:center;padding:24px}
a{color:#a78bfa}</style></head><body><div>
<h1 style="font-size:22px">This profile isn't available</h1>
<p style="margin-top:10px;opacity:.6">The jumper may have made it private.</p>
<p style="margin-top:18px"><a href="https://jumpmanifest.com">jumpmanifest.com</a></p>
</div></body></html>`;
}

module.exports = async (req, res) => {
  const raw = (req.query && req.query.code) || '';
  const code = String(raw).trim().toLowerCase();
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  if (!/^[2-9a-z]{6,16}$/.test(code)) {
    return res.status(404).send(notFound());
  }
  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (rateLimited(ip)) {
    res.setHeader('Retry-After', '60');
    return res.status(429).send(notFound());
  }

  try {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/rpc/profile_share_public`, {
      method: 'POST',
      headers: { apikey: SUPABASE_KEY, Authorization: 'Bearer ' + SUPABASE_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ p_code: code }),
    });
    const rows = r.ok ? await r.json() : null;
    const p = Array.isArray(rows) ? rows[0] : null;
    if (!p) return res.status(404).send(notFound());
    res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=300');
    return res.status(200).send(page(p, code));
  } catch {
    return res.status(500).send(notFound());
  }
};
