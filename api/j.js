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
  const url = `https://jumpmanifest.com/j/${code}`;

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
  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:"Plus Jakarta Sans",-apple-system,BlinkMacSystemFont,sans-serif;
       background:#0b0a10;color:#fff;-webkit-font-smoothing:antialiased;min-height:100vh}
  .wrap{max-width:1120px;margin:0 auto;padding:0 20px}
  header{display:flex;align-items:center;gap:12px;padding:20px 0}
  header img{width:34px;height:34px;border-radius:9px}
  header b{font-size:17px;letter-spacing:-.03em}
  .grid{display:grid;grid-template-columns:1.25fr .85fr;gap:40px;align-items:center;padding:24px 0 64px}
  @media (max-width:880px){.grid{grid-template-columns:1fr;gap:28px;padding-bottom:40px}}
  .shot{position:relative;border-radius:22px;overflow:hidden;background:#17151f;
        box-shadow:0 30px 80px rgba(0,0,0,.55);aspect-ratio:4/5}
  .shot img{width:100%;height:100%;object-fit:cover;display:block}
  .shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0) 45%,rgba(0,0,0,.82) 100%)}
  .meta{position:absolute;left:0;right:0;bottom:0;padding:26px}
  .dz{font-weight:800;font-size:26px;letter-spacing:-.02em}
  .dt{margin-top:2px;font-size:14px;font-weight:600;color:rgba(255,255,255,.62)}
  .stats{display:flex;gap:26px;margin-top:16px}
  .stats div span{display:block;font-size:10.5px;font-weight:800;letter-spacing:.09em;
                  text-transform:uppercase;color:rgba(255,255,255,.55)}
  .stats div b{font-size:23px;font-weight:800;letter-spacing:-.02em}
  .stats div b i{font-style:normal;font-size:13px;font-weight:700;color:rgba(255,255,255,.6);margin-left:3px}
  h1{font-size:40px;line-height:1.08;font-weight:800;letter-spacing:-.035em}
  @media (max-width:880px){h1{font-size:31px}}
  .lede{margin-top:14px;font-size:16.5px;line-height:1.55;font-weight:600;color:rgba(255,255,255,.66)}
  .cta{display:inline-flex;align-items:center;gap:10px;margin-top:26px;padding:15px 24px;
       border-radius:15px;background:#7c3aed;font-weight:800;font-size:15.5px;letter-spacing:-.01em;color:#fff}
  .free{margin-top:12px;font-size:13px;font-weight:700;color:rgba(255,255,255,.42)}
  footer{padding:26px 0 40px;font-size:12.5px;font-weight:600;color:rgba(255,255,255,.32)}
  footer a{color:rgba(255,255,255,.55)}
</style>
</head>
<body>
<div class="wrap">
  <header><img src="/assets/app-icon.png" alt="" /><b>Manifest</b></header>
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
    <div>
      <h1>Join ${esc(first)} and get inspired for your next jump</h1>
      <p class="lede">Manifest records your skydive in 3D and keeps your logbook, your gear and your currency in one place. Watch this jump back, and yours.</p>
      <a class="cta" href="${APP_STORE}">Get Manifest</a>
      <div class="free">Free on the App Store. Recording and 3D replay are free.</div>
    </div>
  </div>
  <footer>jumpmanifest.com · <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a></footer>
</div>
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
