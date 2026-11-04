/* Behaviour every dark page shares: the Lock Screen demo and the phone FAQ's "Show all questions" pill.
   Same scripts as the home page. Load with defer, after site-dark.css opted the page in. */
(() => {
  // LOCK SCREEN: the real card and the real notifications, wording from live-activity-push, playing only while on screen.
  const ls = document.querySelector('[data-ls]');
  if (ls && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const $ = (a) => ls.querySelector('[' + a + ']');
    const name = $('data-ls-name'), status = $('data-ls-status'), cap = $('data-ls-cap'), count = $('data-ls-count'), min = $('data-ls-min'), island = $('data-ls-island'), list = $('data-ls-ntfs');
    const adds = [...ls.querySelectorAll('[data-ls-add]')], icon = '/assets/hero/app-icon.png';
    const STEPS = [
      [25, 'BUILDING', "You're on Blue Caravan 3", "You've been manifested at Skydive Elsinore."],
      [20, 'ON CALL', 'Blue Caravan 3 is On Call', "The plane's inbound at Skydive Elsinore."],
      [15, 'ON CALL', 'Gear up · Blue Caravan 3', '15 min out. Time to get your rig on.'],
      [10, 'ON CALL', '10 min call · Blue Caravan 3', 'Gear check and helmet on. Head to the loading area.'],
      [5, 'ON CALL', 'Final call · Blue Caravan 3', '5 min. Be at the plane.'],
      [0, null, 'Plane has left · Blue Caravan 3', 'Blue Caravan 3 has departed at Skydive Elsinore. Blue skies!'],
    ];
    const colour = (m) => (m <= 5 ? '#FF453A' : '#30D158');
    function ntf(title, body, m) {
      const n = document.createElement('div'); n.className = 'aw-ntf'; n.dataset.m = m;
      const im = document.createElement('img'); im.src = icon; im.width = 38; im.height = 38; im.alt = '';
      const tx = document.createElement('div'); tx.className = 'aw-ntx2';
      const top = document.createElement('span'); top.className = 'aw-ntop';
      const b = document.createElement('b'); b.textContent = title;
      const t = document.createElement('time'); t.textContent = 'now';
      const p = document.createElement('p'); p.textContent = body;
      top.append(b, t); tx.append(top, p); n.append(im, tx); return n;
    }
    function play(i) {
      const [m, st, title, body] = STEPS[i], gone = st === null;
      name.textContent = gone ? 'Departed' : 'Blue Caravan 3';
      status.textContent = gone ? 'BLUE CARAVAN 3' : st;
      status.style.color = gone ? '#D1D1D6' : '';
      cap.textContent = gone ? '' : '   ·   7/12';
      count.style.visibility = gone ? 'hidden' : '';
      island.textContent = gone ? 'DEPAR' : m + 'm';
      island.style.color = gone ? '#fff' : colour(m);
      island.classList.toggle('is-tok', gone);
      if (!gone) { min.textContent = m; min.style.color = colour(m); adds.forEach((a) => { a.textContent = m + +a.dataset.lsAdd; }); }
      if (!i) list.textContent = ''; // the day starts over
      const n = ntf(title, body, m);
      list.prepend(n);
      while (list.children.length > 2) list.removeChild(list.lastElementChild);
      [...list.children].forEach((c, k) => { if (!k) return; const d = +c.dataset.m - m; c.querySelector('time').textContent = d > 0 ? d + 'm ago' : 'now'; });
      void n.offsetHeight; n.classList.add('is-in');
    }
    list.firstElementChild.dataset.m = 10; list.lastElementChild.dataset.m = 15;
    let i = 4, timer = 0;
    const tick = () => { if (document.hidden) return; i = (i + 1) % STEPS.length; play(i); };
    const go = (on) => { if (on && !timer) timer = setInterval(tick, 3400); if (!on && timer) { clearInterval(timer); timer = 0; } };
    if ('IntersectionObserver' in window) new IntersectionObserver((e) => go(e[0].isIntersecting), { threshold: .25 }).observe(ls);
    else go(true);
  }
  // Phone FAQ: six questions and a pill. All the answers stay in the HTML.
  document.querySelectorAll('.dk-qs-more').forEach((b) => b.addEventListener('click', () => {
    const qs = b.previousElementSibling;
    if (qs) qs.classList.add('show-all');
    b.remove();
  }));
})();

// Header hover pill: surrounds the hovered link, glides between links, fades on leave.
(() => {
  const nav = document.querySelector('.sh-nav');
  if (!nav || !document.body.classList.contains('dk') || !matchMedia('(hover: hover) and (min-width: 1001px)').matches) return;
  const g = document.createElement('i'); g.className = 'sh-glide'; g.setAttribute('aria-hidden', 'true'); nav.prepend(g);
  let shown = false;
  nav.querySelectorAll('.sh-trig, .sh-link').forEach((a) => a.addEventListener('mouseenter', () => {
    const r = a.getBoundingClientRect(), o = nav.getBoundingClientRect();
    g.classList.toggle('is-first', !shown);
    g.style.width = r.width + 'px'; g.style.height = r.height + 'px'; g.style.top = (r.top - o.top) + 'px'; g.style.transform = 'translateX(' + (r.left - o.left) + 'px)';
    if (!shown) void g.offsetWidth;
    g.classList.remove('is-first'); g.style.opacity = 1; shown = true;
  }));
  nav.addEventListener('mouseleave', () => { g.style.opacity = 0; shown = false; });
})();

// FAQ: one plate glides between the rows.
(() => {
  if (!document.body.classList.contains('dk') || !matchMedia('(hover: hover)').matches) return;
  document.querySelectorAll('.dk-qs').forEach((list) => {
    const g = document.createElement('i'); g.className = 'hb-qglide'; g.setAttribute('aria-hidden', 'true'); list.prepend(g);
    let cur = null, seen = false;
    const put = (sm) => { const o = list.getBoundingClientRect(), r = sm.getBoundingClientRect(); g.style.height = r.height + 'px'; g.style.transform = 'translateY(' + (r.top - o.top) + 'px)'; };
    list.querySelectorAll('summary').forEach((sm) => sm.addEventListener('mouseenter', () => { cur = sm; g.classList.toggle('is-first', !seen); put(sm); if (!seen) void g.offsetWidth; g.classList.remove('is-first'); g.style.opacity = 1; seen = true; }));
    list.addEventListener('mouseleave', () => { g.style.opacity = 0; seen = false; cur = null; });
    list.addEventListener('toggle', () => { if (cur) { g.classList.add('is-first'); put(cur); void g.offsetWidth; g.classList.remove('is-first'); } }, true);
  });
})();

/* 4 Nov 2026 audit: subpages had no footer hide, so the header pill covered the footer. Same rule as the home page and ocelli.app:
   away once the footer's top is above the middle of the screen AND you are scrolling down; back on any scroll up. */
(function () {
  if (document.getElementById('hero-art-js')) return;
  var bar = document.querySelector('.sh'), foot = document.querySelector('footer.site');
  if (!bar || !foot) return;
  var lastY = null, away = false, raf = 0, timer = 0;
  function apply() {
    var y = Math.max(0, window.scrollY || 0), d = lastY === null ? 0 : y - lastY; lastY = y;
    var past = foot.getBoundingClientRect().top < innerHeight * .5;
    var next = past && (d > 0 || (d === 0 && away));
    if (next !== away) { away = next; bar.classList.toggle('is-away', away); }
  }
  function run() { if (raf) { cancelAnimationFrame(raf); raf = 0; } if (timer) { clearTimeout(timer); timer = 0; } apply(); }
  addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(run); if (!timer) timer = setTimeout(run, 250); }, { passive: true });
  addEventListener('scrollend', run);
})();
