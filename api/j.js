// The public page for one shared jump: jumpmanifest.com/j/<code>
//
// SERVER-RENDERED, and that is the whole point. WhatsApp, iMessage, Slack and
// every other unfurler fetches the URL once with a crawler that does not run
// JavaScript. A page that fetches its own data in the browser — the way /p/
// does — unfurls as a blank card. So the meta tags are written into the HTML
// here, before it leaves the server.
//
// WHAT IS PUBLIC IS THE CARD. `jump_share_public` returns a picture and five
// numbers; the track itself never leaves the database. See sql/jump-share-links.

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

const num = (n) => (n == null ? null : Number(n).toLocaleString('en-US'));

function page(j, code) {
  const first = (j.jumper_name || '').trim().split(/\s+/)[0] || 'a jumper';
  const title = j.dz_name ? `${first}'s jump at ${j.dz_name}` : `${first}'s skydive`;
  const bits = [];
  if (j.exit_ft != null) bits.push(`${num(j.exit_ft)} ft exit`);
  if (j.freefall_s != null) bits.push(`${j.freefall_s} s freefall`);
  if (j.top_speed_mph != null) bits.push(`${num(j.top_speed_mph)} mph`);
  const desc = bits.join(' · ') || 'Recorded in 3D with Manifest.';
  const date = j.jump_date
    ? new Date(j.jump_date + 'T12:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : '';
  const img = j.preview_url || 'https://jumpmanifest.com/assets/og.jpg';
  const url = `https://www.jumpmanifest.com/j/${code}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(title)} | Manifest</title>
<meta name="description" content="${esc(desc)}" />
<meta property="og:type" content="article" />
<meta property="og:site_name" content="Manifest" />
<meta property="og:title" content="${esc(title)} | Manifest" />
<meta property="og:description" content="${esc(desc)}" />
<meta property="og:image" content="${esc(img)}" />
<meta property="og:url" content="${esc(url)}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${esc(title)} | Manifest" />
<meta name="twitter:description" content="${esc(desc)}" />
<meta name="twitter:image" content="${esc(img)}" />
<link rel="icon" href="/favicon.ico" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet" />
<style>
  /* THE SITE'S OWN PALETTE, not a second one. This page is reached from a
     WhatsApp message by someone who has never heard of Manifest, so it has to
     look like the rest of jumpmanifest.com rather than a stray dark page. */
  :root { --ink:#0f0b1c; --violet:#7C3AED; --muted:#6f6982; --line:rgba(15,11,28,.08); }
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{overflow-x:clip;max-width:100vw}
  body{font-family:"Plus Jakarta Sans",-apple-system,BlinkMacSystemFont,sans-serif;
       color:var(--ink);background:#fff;-webkit-font-smoothing:antialiased;line-height:1.5}
  a{color:inherit;text-decoration:none}
  .bar{display:flex;align-items:center;gap:11px;max-width:1180px;margin:0 auto;padding:18px 22px}
  .bar img{width:32px;height:32px;border-radius:9px}
  .bar b{font-size:17px;font-weight:800;letter-spacing:-.03em}
  .grid{max-width:1180px;margin:0 auto;padding:8px 22px 60px;
        display:grid;grid-template-columns:1.15fr .85fr;gap:34px;align-items:start}
  @media (max-width:900px){.grid{grid-template-columns:1fr;gap:22px}}
  /* The jump, as a photo. It keeps its own dark colours because it IS a
     picture of a map — the page around it is the site's white. */
  .shot{position:relative;border-radius:22px;overflow:hidden;background:#17151f;aspect-ratio:4/5;
        box-shadow:0 18px 50px rgba(15,11,28,.14);border:1px solid var(--line)}
  .shot img{width:100%;height:100%;object-fit:cover;display:block}
  .shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0) 46%,rgba(0,0,0,.84) 100%)}
  .meta{position:absolute;left:0;right:0;bottom:0;padding:26px;color:#fff}
  .dz{font-weight:800;font-size:26px;letter-spacing:-.02em}
  .dt{margin-top:2px;font-size:14px;font-weight:600;color:rgba(255,255,255,.66)}
  .stats{display:flex;gap:26px;margin-top:16px}
  .stats div span{display:block;font-size:10.5px;font-weight:800;letter-spacing:.09em;
                  text-transform:uppercase;color:rgba(255,255,255,.6)}
  .stats div b{font-size:23px;font-weight:800;letter-spacing:-.02em}
  .stats div b i{font-style:normal;font-size:13px;font-weight:700;color:rgba(255,255,255,.62);margin-left:3px}
  /* The sheet. Strava's shape, our palette. */
  .sheet{border:1px solid var(--line);border-radius:22px;padding:38px 34px;text-align:center;
         box-shadow:0 12px 34px rgba(15,11,28,.07);background:#fff}
  .sheet h1{font-size:26px;line-height:1.22;font-weight:800;letter-spacing:-.03em}
  .sheet .lede{margin-top:12px;font-size:15px;font-weight:600;color:var(--muted)}
  .go{display:block;margin-top:22px;padding:15px 22px;border-radius:14px;background:var(--violet);
      color:#fff;font-weight:800;font-size:15.5px;letter-spacing:-.01em}
  .legal{margin-top:14px;font-size:12.5px;font-weight:600;color:#948da6}
  .legal a{text-decoration:underline}
  .or{display:flex;align-items:center;gap:12px;margin:24px 0 4px;color:#948da6;
      font-size:12.5px;font-weight:700;text-transform:lowercase}
  .or:before,.or:after{content:"";flex:1;height:1px;background:var(--line)}
  .dl{font-size:15.5px;font-weight:800;letter-spacing:-.02em}
  .appbtn{margin-top:14px;display:inline-block}
  .appbtn img{height:52px;width:auto;display:block}
  .free{margin-top:14px;font-size:12.5px;font-weight:700;color:#948da6}
  footer{max-width:1180px;margin:0 auto;padding:0 22px 44px;font-size:12.5px;font-weight:600;color:#948da6}
  footer a{margin-left:14px;text-decoration:underline}
</style>
</head>
<body>
  <div class="bar"><img src="/assets/app-icon.png" alt="" /><b>Manifest</b></div>
  <div class="grid">
    <div class="shot">
      <img src="${esc(img)}" alt="${esc(title)}" />
      <div class="shade"></div>
      <div class="meta">
        <div class="dz">${esc(j.dz_name || 'Skydive')}</div>
        ${date ? `<div class="dt">${esc(date)}</div>` : ''}
        <div class="stats">
          ${j.exit_ft != null ? `<div><span>Exit</span><b>${num(j.exit_ft)}<i>ft</i></b></div>` : ''}
          ${j.freefall_s != null ? `<div><span>Freefall</span><b>${j.freefall_s}<i>sec</i></b></div>` : ''}
          ${j.top_speed_mph != null ? `<div><span>Top speed</span><b>${num(j.top_speed_mph)}<i>mph</i></b></div>` : ''}
        </div>
      </div>
    </div>

    <div class="sheet">
      <h1>Join ${esc(first)} and get inspired for your next jump</h1>
      <p class="lede">Manifest records your skydive in 3D and keeps your logbook, your gear and your currency in one place.</p>
      <a class="go" href="${APP_STORE}">Get started free</a>
      <p class="legal">By continuing you agree to the <a href="/terms">Terms of Use</a> and the <a href="/privacy">Privacy Policy</a>.</p>
      <div class="or">or</div>
      <div class="dl">Download the app</div>
      <a class="appbtn" href="${APP_STORE}"><img src="/assets/appstore-badge.svg?v=1" alt="Download on the App Store" /></a>
      <p class="free">Free on the App Store. Recording and 3D replay are free.</p>
    </div>
  </div>
  <footer>jumpmanifest.com<a href="/privacy">Privacy</a><a href="/terms">Terms</a></footer>
</body>
</html>`;
}

function notFound() {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Jump not found | Manifest</title>
<meta name="robots" content="noindex" />
<style>body{font-family:-apple-system,sans-serif;background:#0b0a10;color:#fff;display:grid;
place-items:center;min-height:100vh;text-align:center;padding:24px}
a{color:#a78bfa}</style></head><body><div>
<h1 style="font-size:22px">This jump link isn't available</h1>
<p style="margin-top:10px;opacity:.6">It may have been turned off by the jumper.</p>
<p style="margin-top:18px"><a href="https://jumpmanifest.com">jumpmanifest.com</a></p>
</div></body></html>`;
}

module.exports = async (req, res) => {
  const raw = (req.query && (req.query.code || req.query.c)) || '';
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
    const r = await fetch(`${SUPABASE_URL}/rest/v1/rpc/jump_share_public`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: 'Bearer ' + SUPABASE_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ p_code: code }),
    });
    const rows = r.ok ? await r.json() : null;
    const j = Array.isArray(rows) ? rows[0] : null;
    if (!j) return res.status(404).send(notFound());
    // Short cache: the card can change if the jumper re-sends it, and a
    // revoked link has to stop working quickly.
    res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=300');
    return res.status(200).send(page(j, code));
  } catch {
    return res.status(500).send(notFound());
  }
};
